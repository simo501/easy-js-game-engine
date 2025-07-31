export const keysDown = (() => {
    let left = false, right = false, up = false, down = false, space = false;
    let running = true; // stato di esecuzione del gioco (true = attivo, false = in pausa)

    document.onkeydown = function (ev) {
        if (ev.key === 'ArrowRight') right = true;
        if (ev.key === 'ArrowLeft') left = true;
        if (ev.key === 'ArrowUp') up = true;
        if (ev.key === 'ArrowDown') down = true;
        if (ev.key === ' ') space = true;

        if (ev.key === 'p' || ev.key === 'P') {
            running = !running; // Inverti stato pausa
            console.log(`Pausa: ${!running}`); // Debug
        }
    };

    document.onkeyup = function (ev) {
        if (ev.key === 'ArrowRight') right = false;
        if (ev.key === 'ArrowLeft') left = false;
        if (ev.key === 'ArrowUp') up = false;
        if (ev.key === 'ArrowDown') down = false;
        if (ev.key === ' ') space = false;
    };

    // Touch (opzionale)
    document.getElementById('btn-left').onmousedown = () => { left = true; };
    document.getElementById('btn-left').onmouseup = () => { left = false; };

    document.getElementById('btn-right').onmousedown = () => { right = true; };
    document.getElementById('btn-right').onmouseup = () => { right = false; };

    document.getElementById('btn-up').onmousedown = () => { up = true; };
    document.getElementById('btn-up').onmouseup = () => { up = false; };

    document.getElementById('btn-down').onmousedown = () => { down = true; };
    document.getElementById('btn-down').onmouseup = () => { down = false; };

    document.getElementById('btn-space').onmousedown = () => { space = true; };
    document.getElementById('btn-space').onmouseup = () => { space = false; };

    return {
        isPressed: {
            get left() { return left; },
            get right() { return right; },
            get up() { return up; },
            get down() { return down; },
            get space() { return space; },
            get isAny() { return left || right || up || down || space; },
            get running() { return running; }
        }
    };
})();

