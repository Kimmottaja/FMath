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

export async function loadPref() {
    if( localStorage.getItem('preferences') ) {
        PREFERENCES = JSON.parse(localStorage.getItem('preferences')!) as preferences;
    } else {
        PREFERENCES = DEFAULT;
        PREFERENCES.userfolder = await invoke('get_documents_dir');
        localStorage.setItem('preferences', JSON.stringify(PREFERENCES));
    }
}