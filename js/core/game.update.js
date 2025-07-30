import { generateGrid } from "../utils/utils.grid.js";

export class GameUpdate {
    constructor(scope) {
        // Salva lo stato come proprietà della classe
        this.state = scope.state;
        this.scope = scope;
    }


    update(tick) {
        // 1. Rigenera la griglia a ogni frame
        this.scope.grid = generateGrid(this.scope);

        // 2. Aggiorna tutte le entità presenti 
        const entities = this.state.entities;
        for (const entity of entities.keys()) {
            entity.update(tick);
        }
    }
}
