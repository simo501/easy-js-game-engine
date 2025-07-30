import { Camera } from '../core/game.camera.js'; 

const minuteInTick = 1000;

export class World {
    constructor(scope, camera, scene) {
        this.scope = scope;
        this.camera = camera; // La telecamera per la visualizzazione della scena
        this.scene = scene;
    }



    render() {
        const ctx = this.scope.context;

        ctx.fillText(`orario: ${this.getTimeOfDay().hours}:${this.getTimeOfDay().minutes}`, 10, 70);

        const entities = this.scene.entities;
        for (const entity of entities.keys()) {
            if (this.camera.isOnCamera(entity).onCamera) {
                console.log(`Rendering entity: ${entity.constructor.name} at position x=${entity.position.x}, y=${entity.position.y}`);
                entity.render(this.scope.tick);
            }
        }
    }

    update() {
        // console.log(`Updating world at tick: ${this.scope.tick}`);
        this.camera.update(this.scene.player)
        this.scene.update(); // Aggiorna la scena
    }

    getTimeOfDay() {
        const tick = this.scope.tick;
        let hours = Math.floor(((tick) % (minuteInTick * 60 * 24)) / (minuteInTick * 60))
        let minutes = Math.floor(((tick) % (minuteInTick * 60)) / minuteInTick)

        return { hours, minutes };
    }

}