import './style.css'

import close from './images/win_close_dark.png';
import minimize from './images/win_minimize_dark.png';
import maximize from './images/win_maximize_dark.png';
import {appWindow} from '@tauri-apps/api/window'

export function TitleBar(el: HTMLDivElement) : HTMLDivElement {

    const closeButton = (el.querySelector('.close') as HTMLInputElement);
    closeButton.src = close;
    closeButton.onclick = appWindow.close;

    const minimizeButton = (el.querySelector('.minimize') as HTMLInputElement);
    minimizeButton.src = minimize;
    minimizeButton.onclick = appWindow.minimize;

    const maximizeButton = (el.querySelector('.maximize') as HTMLInputElement);
    maximizeButton.src = maximize;
    maximizeButton.onclick = appWindow.toggleMaximize;

    return el;
}

export const saveStatusDisp = document.getElementById('save-status') as HTMLElement;
export const saveIndicator = document.getElementById('save-indicator') as HTMLElement;
export const titleText = document.getElementById('title-text') as HTMLElement;

for( const element of document.getElementsByClassName('title-bar') ){
    TitleBar(element as HTMLDivElement); 
};
