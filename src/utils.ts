export var getFilename = function (path: string) {
    return path.substring(path.lastIndexOf('\\')+1).replace(/\.[^/.]+$/, "");
}