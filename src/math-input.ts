import { MathfieldElement } from 'mathlive';
import { tex2svg } from './text2svg';
import { correctEditFieldHeight } from './editor-area';
import './math-input.css'

customElements.whenDefined('math-field').then(() => {
    MathfieldElement.fontsDirectory = "/fonts/";
    MathfieldElement.soundsDirectory = "/sounds/";  
});

export class MathEditElement {
    element : MathfieldElement;
    constructor() {
        this.element = new MathfieldElement;
        this.element.addEventListener('blur', this.blur);
        this.element.addEventListener('input', this.input);
    };

    blur(this: MathfieldElement) {
        if(this.value != "") {
            const img = tex2svg( compatibilityLatex( this.value ) );
            img.classList.add('math-field-img');
            img.setAttribute('latex', this.value)
            this.replaceWith(img);
        } else {
            this.remove();
        }
        window.setTimeout(correctEditFieldHeight, 10);
    }

    input(this: MathEditElement) {
        window.setTimeout(correctEditFieldHeight, 10);
    }

}

function compatibilityLatex( latex : string ) : string {
    latex = latex.replaceAll('\\differentialD', '\\text{d}');
    latex = latex.replaceAll('\\degree', '\u00B0');
    latex = latex.replaceAll('\\N', '\\mathbb{N}');
    latex = latex.replaceAll('\\natnums', '\\mathbb{N}');
    latex = latex.replaceAll('\\placeholder', '');
    return latex;
}