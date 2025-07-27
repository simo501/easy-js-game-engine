export function gameLoop(scope) {
    // per rendere codice leggibile e riutilizzabile
    let loop = this;

    const fps = scope.constants.targetFps,
        // 1 tick per millisecondo
        // 60 fps = 1000 ms / 60 = 16.666667
        fpsInterval = 1000 / fps,
        before = window.performance.now(), // il timestamp di inizio

        // Set up an object to contain our alternating FPS calculations
        cycles = {
            new: {
                frameCount: 0, // Frames da quando inizia il ciclo
                startTime: before, // timestamp di inizio del ciclo
                sinceStart: 0 // tempo trascorso dall'inizio del ciclo
            },
            // uguale ma relativo al ciclo precedente
            old: {
                frameCount: 0,
                startTime: before,
                sineStart: 0
            }
        },
        resetInterval = 5, // quando il ciclo viene resettato in secondi
        resetState = 'new'; // The initial frame rate cycle

    loop.fps = 0; // A prop that will expose the current calculated FPS to other modules

    loop.main = function mainLoop(tframe) {
        // posizionando in questo modo requestAnimationFrame all'inizio del loop 
        // essa verra eseguita in loop proprio perchè stiamo dicendo al browser 
        // di richiedere un nuovo frame e di eseguire la funzione loop.main al nuovo frame
        // loop.stopLoop serve per 
        // salvare l'id del frame richiesto con requestAnimationFrame
        // in modo tale da poterlo fermare in seguito se necessario
        loop.stopLoop = window.requestAnimationFrame(loop.main);

        // tframe è il timestamp del frame corrente (timestamp frame)
        let now = tframe;
        let elapsed = now - before; // il tempo trascorso dall'ultimo frame
        let activeCycle, targetResetInterval;

        // se il tempo richiesto per il frame è maggiore del tempo che ci aspettiamo
        // riallineiamo il timestamp di before per non accumulare ritardi
        // e per evitare che il frame rate si abbassi
        if (elapsed > fpsInterval) {
            // sottraiamo a now il tempo trascorso dall'ultimo frame
            // in modulo con il tempo che ci aspettiamo passi tra i frame
            // cosi da avere su before il timestamp del frame precedente che sarebbe dovuto essere
            // evitando che il ritardo si accumuli
            before = now - (elapsed % fpsInterval);


            // aggiorniamo prima new poi old
            for (let cycle in cycles) {
                cycles[cycle].frameCount += 1;
                cycles[cycle].sinceStart = now - cycles[cycle].startTime;
            }

            activeCycle = cycles[resetState];
            // 1000 sono i millisecondi in un secondo
            // sincestart (ms) / framecount
            // ci dice quanto passa in media tra un frame e l'altro in millisecondi
            // dividendo 1000 per questo valore otteniamo il frame rate
            loop.fps =
                Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;


            // se new.frameCount è uguale a old.frameCount allora significa
            // che il frame rate è stabile e non è cambiato
            // altrimenti significa che il frame rate non è stabile e gli diamo piu tempo
            // IMPORTANTE:
            // resetInterval * fps = il numero di frame che devono passare per resettare il ciclo
            if (cycles.new.frameCount === cycles.old.frameCount) {
                targetResetInterval = resetInterval * fps;
            } else {
                // per questo motivo qui moltiplichiamo il resetInterval per 2
                // in modo tale da dare piu tempo al ciclo per stabilizzarsi
                targetResetInterval = resetInterval * fps * 2;
            }

            // se il numero di frame del ciclo attivo è maggiore del numero di frame atteso
            // allora resettiamo il ciclo 
            if (activeCycle.frameCount > targetResetInterval) {
                cycles[resetState].frameCount = 0;
                cycles[resetState].startTime = now;
                cycles[resetState].sinceStart = 0;

                // passiamo allo stato che non è attivo per tenere traccia
                resetState = (resetState === 'new' ? 'old' : 'new');
            }


            scope.state = scope.update(now);

            scope.render();

        }
    };

    // eseguiamo il loop loop
    loop.main();

    return loop;
}