import { PREFERENCES } from "./local-storage";
import { save, open, ask, message } from '@tauri-apps/api/dialog';
import { closeAllOverlays } from './overlay-manager';
import { saveCurrentFile, openAndLoadFile } from './file';
import { correctEditFieldHeight } from "./editor-area";
import { stateFileOpened, stateFileSaved, STATE } from "./state";
import { getFilename, getDirName } from "./utils";
import { UpdateLastOpenedFiles, UpdateUserFolder } from "./local-storage";

export function actionSave() {
    closeAllOverlays();
    if (STATE.currentPath) {
        const path = STATE.currentPath;
        saveCurrentFile(path);
        stateFileSaved(path, getFilename(path));
        UpdateUserFolder(getDirName(path));
        UpdateLastOpenedFiles(path, getFilename(path));
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
        (path: string | null) => {
            if (path) {
                saveCurrentFile(path);
                stateFileSaved(path, getFilename(path));
                UpdateUserFolder(getDirName(path));
                UpdateLastOpenedFiles(path, getFilename(path));
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
        (path: string | string[] | null) => {
            if (path) {
                if (typeof path === "string") {
                    openAndLoadFile(path).then(
                        () => {
                            stateFileOpened(path, getFilename(path));
                            UpdateLastOpenedFiles(path, getFilename(path));
                            UpdateUserFolder(getDirName(path));
                            window.setTimeout(correctEditFieldHeight, 100);
                        },
                        error => { message(error as string, { title: 'Error opening file', type: "error" }) }
                    );

                }
            }
        }
    )
}

export function actionOpenFile(path: string) {
    closeAllOverlays();
    if (typeof path === "string") {

        openAndLoadFile(path).then(
            () => {
                stateFileOpened(path, getFilename(path));
                UpdateLastOpenedFiles(path, getFilename(path));
                UpdateUserFolder(getDirName(path));
                window.setTimeout(correctEditFieldHeight, 100);
            },
            error => { message(error as string, { title: 'Error opening file', type: "error" }) }
        );

    }
}

export function actionNew() {
    closeAllOverlays();
    ask('Nykyisen asiakirjan tallentamattomat muutokset menetetään', { title: "Luodaanko uusi asiakirja?", okLabel: 'Kyllä', cancelLabel: 'Peruuta' })
}

(window as any).actions = {
    save: actionSave,
    save_as: actionSaveAs,
    open: actionOpen,
    open_file: actionOpenFile,
    new: actionNew,
}