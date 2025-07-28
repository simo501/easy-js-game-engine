export class GameUpdate {
    constructor(scope) {
        // Salva lo stato come proprietà della classe
        this.state = scope.state;
        this.update()
    }


    update(tick) {
        // Aggiorna tutte le entità se presenti
        const entities = this.state.entities;
        for (const entity of entities.keys()) {
            entity.update(tick); // Itera su ogni entità
        }
    }
}
