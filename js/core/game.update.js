export class GameUpdate {
    constructor(scope) {
        // Salva lo stato come proprietà della classe
        this.state = scope.state || {};
        this.update()
    }


    update() {
        // Aggiorna tutte le entità se presenti
        const entities = Object.values(this.state.entities);
        for (const entity of entities) {
            entity.update(); // Itera su ogni entità
        }
    }


    getState() {
        // Ritorna lo stato corrente del gioco
        return this.state;
    }
}
