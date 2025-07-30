const minuteInTick = 1000;

export class World {
    constructor(scope, width = 800, height = 600, scene) {
        this.scope = scope;
        this.width = width;
        this.height = height;
        this.scene = scene;
    }



    render() {
        const ctx = this.scope.context;
        ctx.clearRect(0, 0, this.width, this.height);

        // Renderizza tutte le entità
        for (const entity of this.entities) {
            entity.render();
        }

        // Se la griglia è definita, disegnala
        if (this.grid) {
            drawGrid(ctx, this.grid);
        }
    }

    update() {
        this.scene.update(); // Aggiorna la scena
        updateTime(); // Simula il passare del tempo
    }

    getTimeOfDay() {
        let hours = (tick % (minuteInTick * 60 * 24)) / (minuteInTick * 60)
        let minutes = (tick % minuteInTick * 60) / minuteInTick;

        return { hours, minutes };
    }

}