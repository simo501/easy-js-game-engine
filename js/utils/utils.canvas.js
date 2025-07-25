function getPixelRatio(context) {

    const devicePixelRatio = window.devicePixelRatio || 1;

    // indica la densita di pixel logici usata dal browser per disegnare sul canvas
    const backingStorePixelRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;

        console.log('devicePixelRatio:', devicePixelRatio);
        console.log('backingStorePixelRatio:', backingStorePixelRatio);

    return devicePixelRatio / backingStorePixelRatio;
}


function generateCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    const pixelRatio = getPixelRatio(context);

    if (pixelRatio !== 1) {
        // cambiamo lo stile del canvas per mantenere le dimensioni visive corrette
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        // scaliamo il context per mantenere la risoluzione corretta
        // tra pixel logici e pixel fisici
        canvas.width *= pixelRatio;
        canvas.height *= pixelRatio;
        context.scale(pixelRatio, pixelRatio);
    }

    return { canvas, context };
}

function clearCanvas(context, width, height) {
    context.clearRect(0, 0, width, height);
}


export { generateCanvas, clearCanvas };
