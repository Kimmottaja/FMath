export function font2imageRenderer(height: number, width: number, fontSize: number, fontColor: string) {

    const canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    const ctx = canvas.getContext("2d")!;

    return function (fontName: string) : string {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        ctx.fillStyle = fontColor;
        ctx.font = `${fontSize}px '${fontName}'`;
        ctx.fillText( fontName, 10, canvas.height - 8, canvas.width - 10 );

        canvas.toBlob(
            (blob) => {console.log(blob)}
        );

        return
    }

}