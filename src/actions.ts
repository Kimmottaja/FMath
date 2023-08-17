import { PREFERENCES } from "./local-storage";
import { save, open, ask } from '@tauri-apps/api/dialog';
import {closeAllOverlays} from './overlay-manager';
import {saveCurrentFile, openAndLoadFile} from './file';
import { correctEditFieldHeight } from "./editor-area";
import { stateFileOpened, stateFileSaved, STATE } from "./state";
import { getFilename } from "./utils";

export function actionSave() {
    closeAllOverlays();
    if(STATE.currentPath) {
        const path = STATE.currentPath;
        saveCurrentFile(path);
        stateFileSaved(path, getFilename(path));
    } else {
        actionSaveAs();
    }
}

export function actionSaveAs() {
    closeAllOverlays();
    save({
        defaultPath: PREFERENCES.userfolder,
        title: "Tallenna nimellä",
        filters: [{
            name: "F'Math tiedostot",
            extensions: ['fmt']
        }],
    }).then(
        (path: string|null) => {
            if(path) {
                saveCurrentFile(path);
                stateFileSaved(path, getFilename(path))
            }
        }
    );
}

export function actionOpen() {
    closeAllOverlays();
    open({
        title: "Avaa",
        defaultPath: PREFERENCES.userfolder,
        filters: [{
            name: "F'Math tiedostot",
            extensions: ['fmt']
        }]
    }).then(
        (path:string|string[]|null) => {
            if (path) {
                if (typeof path === "string") {
                    openAndLoadFile(path).then(
                        function() {
                            stateFileOpened(path, getFilename(path));
                            correctEditFieldHeight();
                        }
                    );
                    
                }
            }
        }
    )
}

(window as any).actions = {
    save : actionSave,
    save_as : actionSaveAs,
    open : actionOpen,

    load_file : function() {},

    new : function() {
        closeAllOverlays();
        ask('Nykyisen asiakirjan tallentamattomat muutokset menetetään', {title: "Luodaanko uusi asiakirja?", okLabel: 'Kyllä', cancelLabel:'Peruuta'})
    }

}