export class GameUpdate {
    constructor(scope) {
        // Salva lo stato come proprietà della classe
        this.state = scope.state || {};
        this.update()
    }


    update() {
        // Aggiorna tutte le entità se presenti
        if (this.state.entities && Array.isArray(this.state.entities)) {
            for (let entity of this.state.entities) {
                if (typeof entity.update === 'function') {
                    entity.update();
                }
            }
        } else if (this.state.entities) {
            console.log('GameUpdate: updating player entity');
            let entity = this.state.entities.player;
            if (typeof entity.update === 'function') {
                entity.update();
            }
        }
    }


    getState() {
        // Ritorna lo stato corrente del gioco
        return this.state;
    }
}
