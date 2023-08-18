import { MathfieldElement } from 'mathlive';
import { tex2svg } from './text2svg';
import { correctEditFieldHeight } from './editor-area';
import './math-input.css'

customElements.whenDefined('math-field').then(() => {
    MathfieldElement.fontsDirectory = "/fonts/";
    MathfieldElement.soundsDirectory = "/sounds/";  
});

export function createMathField() {

    const element = new MathfieldElement;
    element.addEventListener('blur', blur);
    element.addEventListener('change', change);
    element.addEventListener('focusin', focusin);
    element.addEventListener('input', input);
    return element;

}

function blur(this: MathfieldElement, evt: Event) {
    evt.preventDefault();
    if(focus) {

        focus = false;

        if(!edited) {exitMethod++}

        console.log(exitMethod);

        if(this.value != "") {
            const img = tex2svg( this.value );
            img.classList.add('math-field-img');
            img.setAttribute('latex', this.value);

            img.onload = () => {
                this.replaceWith(img);
                if( exitMethod == 2 ) {
                    const sel = window.getSelection()!;
                    sel.removeAllRanges();
    
                    const r = document.createRange();
                    r.selectNode(img);
                    r.collapse(false);
                    
                    sel.addRange(r);
                }
            }

        } else {
            this.remove();
        }

    }
}

function focusin(this: MathfieldElement, evt: Event) {
    exitMethod = 0;
    evt.preventDefault();
    focus = true;
    edited = false;
}

function change(this: MathfieldElement, evt: Event) {
    exitMethod++;
    evt.preventDefault();
    this.blur();
}

function input(this: MathfieldElement, evt: Event) {
    edited = true;
}

var focus : boolean = false;
var exitMethod : number = 0;
var edited : boolean = false;



























/*export class MathEditElement {

    element : MathfieldElement;

    constructor() {
        this.element = new MathfieldElement;

        this.element.addEventListener('focusout', evt => { evt.preventDefault(); console.log('focusout')} );
        this.element.addEventListener('blur', evt => { evt.preventDefault(); console.log('blur')} )
        this.element.addEventListener('change', evt => { evt.preventDefault(); console.log('change')} )
        this.element.addEventListener('input', this.input);

    };

    blur(this: MathfieldElement) {

        console.log('blur');

        /*this.readOnly = true;

        if(this.value != "") {
            const img = tex2svg( this.value );
            img.classList.add('math-field-img');
            img.setAttribute('latex', this.value);

            img.onload = () => {
                this.replaceWith(img);
            }

        } else {
            this.remove();
        }

        window.setTimeout(correctEditFieldHeight, 10);
    }

    input(this: MathfieldElement) {
        window.setTimeout(correctEditFieldHeight, 10);
    }

    change(this: MathfieldElement) {

        console.log('change');
        this.blur()

        /*this.readOnly = true;

        if(this.value != "") {
            const img = tex2svg( this.value );
            img.classList.add('math-field-img');
            img.setAttribute('latex', this.value);

            img.onload = () => {

                this.replaceWith(img);

                console.log(img);
                
                const sel = window.getSelection()!;
                sel.removeAllRanges();

                const r = document.createRange();
                r.selectNode(img);
                r.collapse(false);

                sel.addRange(r);


            }

        } else {
            this.remove();
        }

        window.setTimeout(correctEditFieldHeight, 10);

    }

}*/