import {invoke} from '@tauri-apps/api/tauri';

interface preferences {
    theme: 'light' | 'dark',
    userfolder: string,
    language: 'fin',
}

export var PREFERENCES : preferences

const DEFAULT : preferences = {
    theme: 'dark',
    userfolder: 'C:',
    language: 'fin',
}

export function UpdateUserFolder(path: string) {
    PREFERENCES.userfolder = path;
    StorePreferences();
}

export async function loadPref() {
    if( localStorage.getItem('preferences') ) {
        PREFERENCES = JSON.parse(localStorage.getItem('preferences')!) as preferences;
    } else {
        PREFERENCES = DEFAULT;
        PREFERENCES.userfolder = await invoke('get_documents_dir');
        StorePreferences();
    }
}

function StorePreferences() {
    localStorage.setItem('preferences', JSON.stringify(PREFERENCES));
}

var lastOpenedFiles : {name: string, path: string}[] = []

export function loadLastOpened() {
    if(localStorage.getItem('lastOpened')) {
        lastOpenedFiles = JSON.parse( localStorage.getItem('lastOpened') as string );
    } else {
        lastOpenedFiles = [];
    }
}

import { openedFilesList } from './menu-bar';

export function displayLastOpenedFiles() {
    openedFilesList.innerHTML = "";
    for(const file of lastOpenedFiles) {
        const el = createLastOpenedFileElement(file.path, file.name);
        openedFilesList.appendChild(el);
    }
}

const LAST_OPENED_MAX_LENGTH = 10;

export function UpdateLastOpenedFiles(path:string, name:string) {

    if(lastOpenedFiles.filter( value => value.path == path ).length != 0) {
        lastOpenedFiles = lastOpenedFiles.filter( value => value.path != path );
    }
    
    lastOpenedFiles.unshift( {
        name: name,
        path: path
    } );

    if(lastOpenedFiles.length > LAST_OPENED_MAX_LENGTH) {
        lastOpenedFiles.pop();
    }

    localStorage.setItem('lastOpened', JSON.stringify(lastOpenedFiles));

    displayLastOpenedFiles();

}

import { actionOpenFile } from './actions';

function createLastOpenedFileElement(path: string, name: string) : HTMLElement {

    const el = document.createElement('div');
    const a = document.createElement('a');
    const span = document.createElement('span');
    const nameNode = document.createTextNode(name);

    span.innerText = path;
    span.setAttribute('title', path);
    span.classList.add('filepath');
    el.classList.add('drop-down-option');

    a.appendChild(nameNode);
    a.appendChild(span);

    el.appendChild(a);

    el.onclick = function() { actionOpenFile(path) };
    
    return el;

}

// <div class="drop-down-option"><a>Asiakirja 1 <span class="filepath" title="C:\Users\moiva\Documents\Asiakirja 1.fma">"C:\Users\moiva\Documents\Asiakirja 1.fma"</span></a></div>