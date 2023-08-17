var overlays : overlay[] = [];
var barriers : HTMLElement[] = [];

function IdGen() {
    var counter = 0;
    return function() : number {
        counter++;
        return counter;
    }
}

const gen = IdGen();

interface overlay {
    barrierElements : HTMLElement[];
    closeFunction: Function,
    id: number,
}

var temp_overlays : overlay[] = [];

function updateBarriers() {

    if(overlays.length == 0) {
        barriers = [];
        return;
    }

    barriers = overlays.map(el => el.barrierElements).reduce( (collector, current) => {
        return collector.concat(current);
    });
}

export function newOverlay(barriers: HTMLElement[], closeFunction : Function ) : number {
    
    const overlayId = gen();

    temp_overlays.push(
        {
            closeFunction: closeFunction,
            barrierElements: barriers,
            id: overlayId,
        }
    )


    return overlayId;

}

export function closeOverlay(id: number) {
    const i = overlays.findIndex(ol => ol.id == id);
    if( i != -1 ) {
        overlays[i].closeFunction();
        overlays.splice(i, 1)
        updateBarriers();
    }
}

window.addEventListener('click', evt => {

    for(let barrier of barriers ) {
        if(barrier.contains(evt.target as HTMLElement)) { 
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
    barriers = [];

    updateOverlayVariables();

});

function updateOverlayVariables() {
    if(temp_overlays.length > 0) {
        overlays = overlays.concat(temp_overlays);
        updateBarriers();

        temp_overlays = [];
    }
}