import { edit_field } from "./editor-area";
import { MathEditElement } from "./math-input";
import { correctEditFieldHeight } from "./editor-area";

document.addEventListener('keydown', e => {
    if (e.ctrlKey) {
        switch(e.key) {
            case "s":
                (window as any).actions.save();
                e.preventDefault();
            break;
            case "e":
                if(edit_field.contains(document.activeElement)) {
                    const sel = window.getSelection();
                    const range = sel?.getRangeAt(0);
                    range?.deleteContents();

                    const math_field = new MathEditElement;

                    range?.insertNode(math_field.element);
                    math_field.element.focus();
                    correctEditFieldHeight();
                }
            break;
            default:
        }
    }
});