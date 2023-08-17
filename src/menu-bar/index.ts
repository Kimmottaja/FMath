import './style.css'
import { newOverlay, closeOverlay } from '../overlay-manager';

for( let el of document.querySelectorAll('.drop-down-menu') ) {
    const toggle = el.querySelector('.drop-down-toggle') as HTMLElement;
    toggle.onclick = () => {
        
        if((toggle as any).active) {
            closeOverlay( (toggle as any).active as number );
        } else {
            el.setAttribute('active', 'true');
            (toggle as any).active = newOverlay([el as HTMLElement], () => {
                el.setAttribute('active', 'false');
                (toggle as any).active = false;
            })
        }

    }
}