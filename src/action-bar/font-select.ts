import { invoke } from '@tauri-apps/api/tauri';
import { font2imageRenderer } from '../font-to-image';

const fontList = JSON.parse(await invoke('font_list')) as string[];
const fontImageList : { name: string, data: string }[] = await getFontImageList();

async function canvasToBlob(canvas: HTMLCanvasElement) : Promise<Blob|null> {
    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

async function readToDataURL(reader: FileReader, blob: Blob) : Promise<string|null> {
    return new Promise( (resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    })
}

async function getFontImageList() {
    
    const list: { name: string, data: string }[] = JSON.parse(localStorage.getItem('fontImageList') ||"[]"); 

    const loaded = list.map( el => el.name );

    const canvas = document.createElement('canvas');
    canvas.height = 30;
    canvas.width = 170;
    const ctx = canvas.getContext("2d")!;
    const reader = new FileReader();

    let changed = false;

    for (const fontName of fontList) {

        if( !loaded.includes(fontName) ) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = `14px '${fontName}'`;

            let text = fontName;
            let chars = fontName.length;

            while(ctx.measureText(text).width > canvas.width - 10) {
                chars -= 1;
                text = fontName.slice(0, chars) + "...";
            }

            const metrics = ctx.measureText(text);
            let textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

            ctx.fillText(text, 10, canvas.height/2 + textHeight/2);
            const data = await canvasToBlob(canvas).then( val => val?readToDataURL(reader, val):"" ) || "";
            list.push({name: fontName, data: data});
            changed = true;
        }
    }

    if(changed) {
        localStorage.setItem('fontImageList', JSON.stringify(list) );
    }
    return list;

}

for(const fs of document.getElementsByClassName('font-selector') ) {

    const selectOptions = fs.getElementsByClassName('select-options')[0];
    for(const font of fontImageList) {

        const li = document.createElement('li');
        const img = document.createElement('img');

        img.src = font.data;
        li.setAttribute('value', font.name);

        li.appendChild(img);
        selectOptions.appendChild(li);

    }
}