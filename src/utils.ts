export function getFilename(path: string) {
    return path.substring(path.lastIndexOf('\\')+1).replace(/\.[^/.]+$/, "");
}

export function getDirName(path: string) {
    return path.substring(0,path.lastIndexOf("\\")+1);
}

export function IdGen(state: number = 0) {
    var counter = state;
    return function() : number {
        counter++;
        return counter;
    }
}