document.addEventListener('keydown', e => {
    if (e.ctrlKey) {
        switch(e.key) {
            case "s":
                (window as any).actions.save();
                e.preventDefault();
            break
            default:
        }
    }
});