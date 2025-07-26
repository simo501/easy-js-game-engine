export function gameLoop(scope) {
    // per rendere codice leggibile e riutilizzabile
    let loop = this

    loop.main = function mainLoop(tframe) {
        // posizionando in questo modo requestAnimationFrame all'inizio del loop 
        // essa verra eseguita in loop proprio perchè stiamo dicendo al browser 
        // di richiedere un nuovo frame e di eseguire la funzione loop.main al nuovo frame
        // loop.stopLoop serve per 
        // salvare l'id del frame richiesto con requestAnimationFrame
        // in modo tale da poterlo fermare in seguito se necessario
        loop.stopLoop = window.requestAnimationFrame(loop.main);

        scope.state = scope.update(now);

        scope.render();
    };

    // eseguiamo il loop loop
    loop.main();

    return loop;
}