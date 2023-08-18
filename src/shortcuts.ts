import { edit_field } from "./editor-area";
import { createMathField } from "./math-input";
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

                    const math_field = createMathField();

                    range?.insertNode(math_field);
                    math_field.focus();
                    correctEditFieldHeight();
                }
            break;
            case "z":
                e.preventDefault();
            break;
            case "y":
                e.preventDefault();
            break;
            case "Z":
                e.preventDefault();
            break;
            default:
        }
    }
});