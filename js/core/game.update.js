
// passiamo la variabile scope che contiene il contesto del gioco
// per poter manipolare dati e proprietà che sono esterni alla funzione
export function gameUpdate(scope) {
    // se esiste assegna state senno assegna un oggetto vuoto
    let state = scope.state || {};

    if (state.hasOwnProperty('entities')) {
        // se esiste la proprietà entities, le aggiorniamo
        let entities = state.entities;

        for (let entity of entities) {
            if (entity.hasOwnProperty('update')) {
                // se l'entità ha un metodo update, lo chiamiamo
                entity.update();
            }

        }
        return state;
    }
}