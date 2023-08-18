import './style.css'
import { stateModified } from '../state';
import { MathEditElement } from '../math-input';
import { inCurrentBlobs } from '../blob-cleanup';
import { tex2url } from '../text2svg';

for(const el of document.querySelectorAll('.editor-area')) {
    const overflowArea = el.querySelector('.overflow-area') as HTMLElement;
    const textEdit = el.querySelector('.text-edit') as HTMLElement;

    overflowArea.onclick = () => {
        textEdit.focus()
        document.execCommand('selectAll', false, undefined);
        document.getSelection()!.collapseToEnd();
    };

}

export const edit_field = document.getElementById('edit-field') as HTMLElement;
const document_info = document.getElementById('document-info') as HTMLElement;
const scale_flow_offset = document.getElementById('scale-flow-offset') as HTMLElement;
const zoom_input = document.getElementById('zoom-input') as HTMLInputElement;
const zoom_input_value = document.getElementById('zoom-input-value') as HTMLElement;

zoom_input.oninput = () => {

    const zoom = Number(zoom_input.value);

    edit_field.style.setProperty('--editor-zoom', zoom + '%');
    zoom_input_value.innerText = zoom + '%';
    edit_field.style.width = scale_flow_offset.getBoundingClientRect().width/(zoom/100) - 32 + "px";

    correctEditFieldHeight();
}

export function correctEditFieldHeight() {
    scale_flow_offset.style.height = edit_field.getBoundingClientRect().height + "px";
}

function countWords(s: string){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').filter(function(str : string){return str!="";}).length;
    //return s.split(' ').filter(String).length; - this can also be used
}

edit_field.addEventListener('input', () => {

    correctEditFieldHeight();
    
    stateModified();

    const word_count = countWords(edit_field.innerText);
    const char_count = edit_field.innerText.length;
    const char_count_es = edit_field.innerText.replace(/\s/g,'').length;

    document_info.innerText = `${word_count} sanaa, ${char_count} merkkiä, ${char_count_es} merkkiä ilman välilyöntejä`;
})

edit_field.addEventListener('keydown', evt => {
    if(evt.key == "Tab") {
        console.log('hello')
        evt.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
    }
})

edit_field.addEventListener('click', evt => {
    if((evt.target as HTMLElement).className == "math-field-img") {
        const img = evt.target as HTMLImageElement;
        const math_field = new MathEditElement;
        math_field.element.value = img.getAttribute('latex') || '';
        img.replaceWith(math_field.element);
        math_field.element.focus();
    }
})

edit_field.addEventListener('paste', evt => {

    evt.preventDefault();
    var input = evt.clipboardData?.getData("text/html");

    if(input) {
        input = input.substring(input.indexOf("<!--StartFragment-->") + 20, input.indexOf("<!--EndFragment-->")); // Extract the fragment
        input = input.replace( /style="[^\"]*"/g, ""); // Remove all style tags
    }

    const frag = document.createRange().createContextualFragment(input||"");

    for( const img of frag.querySelectorAll('.math-field-img') ) {

        if(!inCurrentBlobs( (img as HTMLImageElement).src )) {
            (img as HTMLImageElement).src = tex2url( img.getAttribute('latex') as string );
        }
    }

    const sel = window.getSelection();
    const range = sel?.getRangeAt(0);
    range?.deleteContents();

    range?.insertNode(frag);
    range?.collapse(false);

    window.setTimeout( correctEditFieldHeight, 100 );

});