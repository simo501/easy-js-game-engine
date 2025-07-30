import { Camera } from '../core/game.camera.js'; 

const minuteInTick = 1000;

export class World {
    constructor(scope, width = 800, height = 600, camera, scene) {
        this.scope = scope;
        this.width = width;
        this.height = height;
        this.camera = camera; // La telecamera per la visualizzazione della scena
        this.scene = scene;
    }



    render() {
        const ctx = this.scope.context;

        const entities = this.scene.entities;
        for (const entity of entities.keys()) {
            if (this.camera.isOnCamera(entity)) {
                entity.render(this.scope.tick);
            }
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