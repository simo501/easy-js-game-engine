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

    return {
        isPressed: {
            get left() { return left; },
            get right() { return right; },
            get up() { return up; },
            get down() { return down; },
            get space() { return space; } // Space key
        }
    };
})();
