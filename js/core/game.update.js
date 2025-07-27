export class GameUpdate {
    constructor(scope) {
        // Salva lo stato come proprietà della classe
        this.state = scope.state || {};
        this.update()
    }

    update() {
        console.log('GameUpdate: update method called');
        // Aggiorna tutte le entità se presenti
        if (this.state.entities && Array.isArray(this.state.entities)) {
            for (let entity of this.state.entities) {
                if (typeof entity.update === 'function') {
                    entity.update();
                }
            }
        }
    }

    getState() {
        // Ritorna lo stato corrente del gioco
        return this.state;
    }
}
