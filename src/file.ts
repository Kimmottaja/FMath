import {invoke} from '@tauri-apps/api/tauri';

interface file {
    data: string,
    images: {[key: string]: string},
}

function generateCurrentFile() : file {
    return {
        data: document.getElementById('edit-field')!.innerHTML!,
        images: {}
    }
}

export async function openAndLoadFile(path: string) {
    const FILE = await openFile(path);
    document.getElementById('edit-field')!.innerHTML = FILE.data;
}

async function openFile(path: string) : Promise<file> {
    let res = await invoke("decompress_and_load", {path: path}) as string;
    return JSON.parse(res) as file;
}

export function saveCurrentFile(path: string) {
    const FILE = generateCurrentFile();
    invoke("compress_and_save", {
        data: JSON.stringify(FILE),
        path: path
    })
}