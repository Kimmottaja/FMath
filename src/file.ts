import {invoke} from '@tauri-apps/api/tauri';
import { edit_field } from './editor-area';
import { exists } from '@tauri-apps/api/fs';

interface file {
    data: string,
    images: {
        type: string,
        data: string,
    }[],
}

async function generateCurrentFile() : Promise<file> {
    var FILE : file = {
        data: "",
        images: [],
    };

    const temp_field = edit_field.cloneNode(true) as HTMLElement;

    const images = temp_field.getElementsByTagName('img');
    for(let i = 0; i < images.length; i++) {
        const blob = await fetch(images[i].src).then( el => el.blob() );
        FILE.images.push({
                type: blob.type,
                data: await blob.text(),
        });

        images[i].setAttribute('id', i.toString());
        images[i].src = "";
    }

    FILE.data = temp_field.innerHTML;
    return FILE
}

(window as any).e = exists;

export async function openAndLoadFile(path: string) {
    
    const FILE = await openFile(path);
    edit_field.innerHTML = FILE.data;
    const images = edit_field.getElementsByTagName('img');
    for(let i = 0; i < images.length; i++) {
        const id = Number(images[i].getAttribute('id'));
        images[i].removeAttribute('id');
        const image_data = FILE.images[id];
        images[i].src = URL.createObjectURL( new Blob([image_data.data], {type: image_data.type}) );
    }

}

async function openFile(path: string) : Promise<file> {
    let res = await invoke("decompress_and_load", {path: path}) as string;
    if(res == "error") {
        throw `File "${path}" does not exist`;
    } else {
        return JSON.parse(res) as file;
    }
}

export async function saveCurrentFile(path: string) {
    const FILE = await generateCurrentFile();
    invoke("compress_and_save", {
        data: JSON.stringify(FILE),
        path: path
    })
}