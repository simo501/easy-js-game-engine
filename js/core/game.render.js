export function gameRender(scope) {

    // prendiamo le costanti definite in Game()
    let width = scope.constants.width;
    let height = scope.constants.height;

    // adesso ritorniamo ad una funzione render
    // che si occupa di disegnare sul canvas
    // rendendo così modulare e riutilizzabile il codice 
    // separando l'inizializzazione delle variabili dalla logica
    return function render() {

        // puliamo il canvas
        scope.context.clearRect(0, 0, width, height);

        // disegniamo un rettangolo rosso
        scope.context.fillStyle = 'red';
        scope.context.fillRect(0, 0, width, height);

        // disegniamo un testo
        scope.context.fillStyle = 'white';
        scope.context.font = '24px Arial';
        scope.context.fillText('Game Render', 10, 30);

        if (scope.constants.showFps) {
            // se showFps è true, disegniamo il frame rate
            scope.context.fillText(`FPS: ${Math.round(scope.constants.targetFps)}`, 10, 50);
        }

        if (scope.hasOwnProperty('entities')) {
            let entities = scope.state.entities;

            for (let entity of entities) {
                if (entity.hasOwnProperty('render')) {
                    // se l'entità ha un metodo render, lo chiamiamo
                    entity.render(scope.context);
                }
            }

        }
    };

}