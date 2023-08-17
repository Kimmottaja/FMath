import './style.css'

for(const el of document.querySelectorAll('.editor-area')) {
    const overflowArea = el.querySelector('.overflow-area') as HTMLElement;
    const textEdit = el.querySelector('.text-edit') as HTMLElement;

    overflowArea.onclick = () => {
        textEdit.focus()
        document.execCommand('selectAll', false, undefined);
        document.getSelection()!.collapseToEnd();
    };

}

const edit_field = document.getElementById('edit-field') as HTMLElement;
const document_info = document.getElementById('document-info') as HTMLElement;

function countWords(s: string){
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    return s.split(' ').filter(function(str : string){return str!="";}).length;
    //return s.split(' ').filter(String).length; - this can also be used
}

edit_field.addEventListener('input', () => {

    const word_count = countWords(edit_field.innerText);
    const char_count = edit_field.innerText.length;
    const char_count_es = edit_field.innerText.replace(/\s/g,'').length;

    document_info.innerText = `${word_count} sanaa, ${char_count} merkkiä, ${char_count_es} merkkiä ilman välilyöntejä`;
})

function insertTextAtCaret(text: string) {
    var sel, range;
    sel = window.getSelection() as Selection;
    if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode( document.createTextNode(text) );
    }
}

edit_field.addEventListener('keydown', evt => {
    if(evt.key == "Tab") {
        console.log('hello')
        evt.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
    }
})