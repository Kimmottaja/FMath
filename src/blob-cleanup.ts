import { edit_field } from "./editor-area";

var CURRENT_BLOBS : string[] = [];

export function addBlob(url: string) {
    CURRENT_BLOBS.push(url);
}

export function inCurrentBlobs(url: string) {
    return CURRENT_BLOBS.includes(url);
}

function checkBlobsInUse() {

    const BLOBS_IN_USE : string[] = [];
    for( const img of edit_field.getElementsByClassName('math-field-img') ) {
        BLOBS_IN_USE.push( (img as HTMLImageElement).src );
    }

    CURRENT_BLOBS = CURRENT_BLOBS.filter( (url) => {
        const in_use = BLOBS_IN_USE.includes(url);
        if(!in_use) {URL.revokeObjectURL(url)}
        return in_use;
    })

}

window.setInterval(checkBlobsInUse, 10000);