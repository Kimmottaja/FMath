import { addBlob } from "./blob-cleanup";

const MathJax = (window as any).MathJax;

export function tex2svg(latex: string) : HTMLImageElement {
    const img = document.createElement('img');
    img.src = tex2url(latex);
    return img;
}

export function tex2url(latex: string) : string {
    const svg_element = MathJax.tex2svg( compatibilityLatex(latex) ).getElementsByTagName('svg')[0] as HTMLElement;
    svg_element.style.color = "white";
    const svg = svg_element.outerHTML;
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    const data_url = URL.createObjectURL(blob);
    addBlob(data_url);
    return data_url;
}

function compatibilityLatex( latex : string ) : string {
    latex = latex.replaceAll('\\differentialD', '\\text{d}');
    latex = latex.replaceAll('\\degree', '\u00B0');
    latex = latex.replaceAll('\\N', '\\mathbb{N}');
    latex = latex.replaceAll('\\natnums', '\\mathbb{N}');
    latex = latex.replaceAll('\\placeholder', '');
    return latex;
}