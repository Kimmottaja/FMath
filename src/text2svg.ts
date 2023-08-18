const MathJax = (window as any).MathJax;

export function tex2svg(latex: string) : HTMLImageElement {
    const img = document.createElement('img');

    const svg_element = MathJax.tex2svg( latex ).getElementsByTagName('svg')[0] as HTMLElement;
    svg_element.style.color = "white";
    const svg = svg_element.outerHTML;
    const blob = new Blob([svg], {type: 'image/svg+xml'});

    img.src = URL.createObjectURL(blob);

    return img;
}