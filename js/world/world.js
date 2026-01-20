import { Camera } from '../core/game.camera.js';
import { basePath } from "../utils/utils.asset.js";
import * as colors from "../utils/utils.colors.js";

const minuteInTick = 1000;

export class World {
    constructor(
        scope,
        camera,
        scene
    ) {
        this.scope = scope;
        this.camera = camera; // La telecamera per la visualizzazione della scena
        this.scene = scene;
        this.sizes = {
            w: scope.constants.width,
            h: scope.constants.height
        }

        const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');

        if (this.scene.assets.backgroundSrc) {
            this.backgroundImage = new Image();
            this.backgroundImage.src = basePath + this.scene.assets.backgroundSrc;
        }
    }



    render() {
        const ctx = this.scope.context;

        // ctx.fillText(`orario: ${this.getTimeOfDay().hours}:${this.getTimeOfDay().minutes}`, 10, 70);

        // 2. Sfondo
        // Crea un pattern ripetuto
        if (this.backgroundImage) {
            const pattern = ctx.createPattern(this.backgroundImage, 'repeat');
            ctx.fillStyle = pattern;
            // Riempi l'intero canvas con il pattern
            ctx.fillRect(0, 0, this.sizes.w, this.sizes.h);
        } else {
            // Se non c'è un'immagine di sfondo, riempi con un colore di default
            ctx.fillStyle = colors.gameboyBackground; // Colore di sfondo predefinito
            ctx.fillRect(0, 0, this.sizes.w, this.sizes.h);
        }

        if (this.scene.player === null) {
            ctx.fillStyle = colors.gameboyText;
            ctx.font = '40px Arial';
            ctx.fillText('SEI MORTO',  30, (this.sizes.h / 2) - 30);
        }

        const entities = this.scene.entities;
        for (const entity of entities.keys()) {
            if (this.camera.isOnCamera(entity).onCamera) {
                // console.log(`Rendering entity: ${entity.constructor.name} at position x=${entity.position.x}, y=${entity.position.y}`);
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