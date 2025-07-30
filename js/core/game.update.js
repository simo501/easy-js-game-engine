import { generateGrid } from "../utils/utils.grid.js";

export class GameUpdate {
    constructor(scope, world) {
        // Salva lo stato come proprietà della classe
        this.scope = scope;
        this.state = scope.state;
        this.world = world; 
    }


    update() {
        // 1. Rigenera la griglia a ogni frame
        const entities = this.world.scene.entities;
        this.scope.grid = generateGrid(this.scope, entities);

        // 2. Aggiorna tutte le entità presenti 
        this.world.update();
    }
}
