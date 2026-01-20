import { generateGrid } from "../utils/utils.grid.js";

export class GameUpdate {
    constructor(scope, world) {
        // Salva lo stato come proprietà della classe
        this.scope = scope;
        this.state = scope.state;
        this.world = world; 

        // salviamo l'ultimo timestamp per calcolare dt
        this._lastTs = null;


    }


    update(now) {
        // calcolo deltatime dt in secondi
        let dt = 0;
        if (this._lastTs !== null) {
            dt = (now - this._lastTs) / 1000;
        }
        this._lastTs = now;
        // 1. Rigenera la griglia a ogni frame
        const entities = this.world.scene.entities;
        this.scope.grid = generateGrid(this.scope);

        // 2. Aggiorna tutte le entità presenti 
        this.world.update();

        // 3. aggiorna lo spawner (se esiste)
        if (this.scope.spawner) {
            this.scope.spawner.update(dt, this.scope.tick);
        }
    }
}
