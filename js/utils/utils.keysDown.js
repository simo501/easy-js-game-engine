export const keysDown = (() => {
    let left = false, right = false, up = false, down = false;

    // Set up `onkeydown` event handler.
    document.onkeydown = function (ev) {
        if (ev.keyCode === 39) { right = true; }
        if (ev.keyCode === 37) { left = true; }
        if (ev.keyCode === 38) { up = true; }
        if (ev.keyCode === 40) { down = true; }
    };

    // Set up `onkeyup` event handler.
    document.onkeyup = function (ev) {
        if (ev.keyCode === 39) { right = false; }
        if (ev.keyCode === 37) { left = false; }
        if (ev.keyCode === 38) { up = false; }
        if (ev.keyCode === 40) { down = false; }
    };

    return {
        isPressed: {
            get left() { return left; },
            get right() { return right; },
            get up() { return up; },
            get down() { return down; }
        }
    };
})();
