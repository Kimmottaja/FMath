
import { saveIndicator, saveStatusDisp, titleText } from "./title-bar"

interface state {
    lastSaved: Date | undefined,
    modified: boolean,
    currentPath: string | undefined,
    currentFile: string | undefined,
}

const DEFAULT : state = {
    lastSaved: undefined,
    modified: false,
    currentFile: undefined,
    currentPath: undefined,
}

export var STATE = DEFAULT;

export function stateModified() {
    if(!STATE.modified) {
        if(saveStatusDisp.innerText == "Ei tallentamattomia muutoksia") {
            saveStatusDisp.innerText = "Muutoksia ei ole tallennettu"
        }
    }
    STATE.modified = true;
    saveIndicator.style.display = "inline";
}

export function stateFileSaved(path: string, name: string) {
    STATE.modified = false;
    STATE.currentPath = path;
    STATE.currentFile = name;
    titleText.innerHTML = `F'Math - ${name}`;
    const d = new Date;
    STATE.lastSaved = d;
    saveIndicator.style.display = "none";
    saveStatusDisp.innerText = `Viimeksi tallennettu klo. ${d.getHours()+"."+d.getMinutes().toString().padStart(2,'0')}`
}

export function stateFileOpened(path: string, name: string) {
    STATE.modified = false;
    STATE.lastSaved = undefined;
    STATE.currentPath = path;
    STATE.currentFile = name;
    titleText.innerHTML = `F'Math - ${name}`;
    saveIndicator.style.display = "none";
    saveStatusDisp.innerText = "Ei tallentamattomia muutoksia"
}