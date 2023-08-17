import './style.css'
import { newOverlay } from '../overlay-manager';

for( let el of document.querySelectorAll('.drop-down-menu') ) {
    const toggle = el.querySelector('.drop-down-toggle') as HTMLElement;
    toggle.onclick = () => {
        console.log(el, toggle);
        el.setAttribute('active', 'true');
        newOverlay([el as HTMLElement], () => {
            el.setAttribute('active', 'false')
        })
    }
}