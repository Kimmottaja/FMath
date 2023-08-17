var overlays : overlay[] = [];
var barrierElements : HTMLElement[] = [];

interface overlay {
    closeFunction: Function,
}

var temp_overlays : overlay[] = [];
var temp_barriers : HTMLElement[] = [];

export function newOverlay(barriers: HTMLElement[], closeFunction : Function ) {
    
    for(const barrier of barriers) {
        temp_barriers.push(barrier);
    }

    temp_overlays.push(
        {
            closeFunction: closeFunction,
        }
    )
}

window.addEventListener('click', evt => {

    for(let el of barrierElements) {
        if(el.contains(evt.target as HTMLElement)) { 
            updateOverlayVariables();
            return
        }
    }

    overlays.forEach(
        ol => {
            ol.closeFunction();
        }
    );

    overlays = [];
    barrierElements = [];

    updateOverlayVariables();

});

function updateOverlayVariables() {
    if(temp_overlays.length + temp_barriers.length > 0) {
        overlays = overlays.concat(temp_overlays);
        barrierElements = barrierElements.concat(temp_barriers);

        temp_barriers = [];
        temp_overlays = [];
    }
}