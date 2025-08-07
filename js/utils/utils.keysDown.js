export const keysDown = (() => {
    let left = false, right = false, up = false, down = false, space = false;

    // Set up `onkeydown` event handler.
    document.onkeydown = function (ev) {
        if (ev.key === 'ArrowRight') { right = true; }
        if (ev.key === 'ArrowLeft') { left = true; }
        if (ev.key === 'ArrowUp') { up = true; }
        if (ev.key === 'ArrowDown') { down = true; }
        if (ev.key === ' ') { space = true; } // Space key
    };

    // Set up `onkeyup` event handler.
    document.onkeyup = function (ev) {
        if (ev.key === 'ArrowRight') { right = false; }
        if (ev.key === 'ArrowLeft') { left = false; }
        if (ev.key === 'ArrowUp') { up = false; }
        if (ev.key === 'ArrowDown') { down = false; }
        if (ev.key === ' ') { space = false; } // Space key
    };

    document.getElementById('btn-left').onmousedown = () => { left = true; };
    document.getElementById('btn-left').onmouseup = () => { left = false; };
    document.getElementById('btn-left').ontouchstart = () => { left = true; };
    document.getElementById('btn-left').ontouchend = () => { left = false; };

    document.getElementById('btn-right').onmousedown = () => { right = true; };
    document.getElementById('btn-right').onmouseup = () => { right = false; };
    document.getElementById('btn-right').ontouchstart = () => { right = true; };
    document.getElementById('btn-right').ontouchend = () => { right = false; };

    document.getElementById('btn-up').onmousedown = () => { up = true; };
    document.getElementById('btn-up').onmouseup = () => { up = false; };
    document.getElementById('btn-up').ontouchstart = () => { up = true; };
    document.getElementById('btn-up').ontouchend = () => { up = false; };

    document.getElementById('btn-down').onmousedown = () => { down = true; };
    document.getElementById('btn-down').onmouseup = () => { down = false; };
    document.getElementById('btn-down').ontouchstart = () => { down = true; };
    document.getElementById('btn-down').ontouchend = () => { down = false; };

    document.getElementById('btn-space').onmousedown = () => { space = true; };
    document.getElementById('btn-space').onmouseup = () => { space = false; };
    document.getElementById('btn-space').ontouchstart = () => { space = true; };
    document.getElementById('btn-space').ontouchend = () => { space = false; };


    return {
        isPressed: {
            get left() { return left; },
            get right() { return right; },
            get up() { return up; },
            get down() { return down; },
            get space() { return space; }, // Space key
            get isAny() { // per controllare se almeno un tasto è premuto
                return left || right || up || down || space;
            }
        }
    };
})();
