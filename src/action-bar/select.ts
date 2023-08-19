import { toSearchString } from "../utils";

for( const el of document.getElementsByClassName('select') ) {

    const selectField = el.querySelector('.select-field') as HTMLElement;
    const selectInput = selectField.querySelector('.select-input') as HTMLInputElement;
    const selectOptions = el.querySelector('.select-options') as HTMLElement;
    const arrow = el.querySelector('.arrow') as HTMLElement;

    
    function hide() {
        selectOptions.style.display = "none";
    }

    function show() {
        selectOptions.style.display = "block";
    }

    function filter() {
        const search = toSearchString(selectInput.value);
        for( const option of selectOptions.children ) {
            const search_value = toSearchString( option.getAttribute('value') || "" );
            if ( search.includes(search_value) || search_value.includes(search) ) {
                (option as HTMLElement).style.display = "block";
            } else {
                (option as HTMLElement).style.display = "none";
            }
        }
    }

    function clickOption(evt: MouseEvent) {
        let t = (evt.target as HTMLElement);
        if(t.tagName == "IMG") {
            t = t.parentElement!;
        }
        const val = t.getAttribute('value');
        selectInput.value = val || "";
    }

    if(selectField && selectOptions) {
        selectField.addEventListener('focusin', show);
        selectField.addEventListener('focusout', hide);
        selectOptions.addEventListener('mousedown', clickOption);
        if(el.getAttribute("search") == "true") {
            selectField.addEventListener('input', filter);
        }
        arrow.addEventListener('click', () => {selectInput.focus()})
    }

}

const fontSelectorInput = document.getElementById('font-selector-input') as HTMLInputElement;

fontSelectorInput.addEventListener('focusout', () => {
    document.execCommand('fontName', false, fontSelectorInput.value); console.log(fontSelectorInput.value)
})