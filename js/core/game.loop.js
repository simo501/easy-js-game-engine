export class GameLoop {
    // per rendere codice leggibile e riutilizzabile
    constructor(scope) {

        this.scope = scope;
        this.fps = scope.constants.targetFps;
        // 1 tick per millisecondo
        // 60 fps = 1000 ms / 60 = 16.666667
        this.fpsInterval = 1000 / this.fps;
        this.before = window.performance.now(); // il timestamp di inizio

        // Set up an object to contain our alternating FPS calculations
        this.cycles = {
            new: {
                frameCount: 0, // Frames da quando inizia il ciclo
                startTime: this.before, // timestamp di inizio del ciclo
                sinceStart: 0 // tempo trascorso dall'inizio del ciclo
            },
            // uguale ma relativo al ciclo precedente
            old: {
                frameCount: 0,
                startTime: this.before,
                sinceStart: 0
            }
        };

        // quando il ciclo viene resettato in secondi
        // quindi in questo caso ogni 5 secondi va resettato il ciclo per mantenere
        // la precisione ed evitare che il frame rate si abbassi
        this.resetInterval = 5; 
        // il ciclo di frame rate iniziale sarà new
        this.resetState = 'new'; 

        // inizializziamo fps
        this.fps = 0; 

        console.log('GameLoop initialized with target FPS:', this.fps);

        this.mainLoop()
    }


    mainLoop(tframe) {
        // posizionando in questo modo requestAnimationFrame all'inizio del this 
        // essa verra eseguita in this proprio perchè stiamo dicendo al browser 
        // di richiedere un nuovo frame e di eseguire la funzione this.main al nuovo frame
        // this.stopLoop serve per 
        // salvare l'id del frame richiesto con requestAnimationFrame
        // in modo tale da poterlo fermare in seguito se necessario
        // dobbiamo bassare la callback this.mainLoop e fare il bind a this
        // in modo tale da poter accedere a this.scope e agli altri metodi della classe
        // mantenendo il giusto contesto di esecuzione
        let stopLoop = window.requestAnimationFrame(this.mainLoop.bind(this));

        // tframe è il timestamp del frame corrente (timestamp frame)
        let now = tframe;
        // il tempo trascorso dall'ultimo frame
        let elapsed = now - this.before;


        // targetResetInterval è il numero di frame che devono passare per resettare il ciclo
        let targetResetInterval;
        // ad activeCycle passiamo il ciclo attualmente attivo
        let activeCycle;

        // se il tempo richiesto per il frame è maggiore del tempo che ci aspettiamo
        // riallineiamo il timestamp di before per non accumulare ritardi
        // e per evitare che il frame rate si abbassi
        if (elapsed > this.fpsInterval) {
            // sottraiamo a now il tempo trascorso dall'ultimo frame
            // in modulo con il tempo che ci aspettiamo passi tra i frame
            // cosi da avere su before il timestamp del frame precedente che sarebbe dovuto essere
            // evitando che il ritardo si accumuli
            this.before = now - (elapsed % this.fpsInterval);


            // aggiorniamo prima new poi old
            for (let cycle in this.cycles) {
                this.cycles[cycle].frameCount += 1;
                this.cycles[cycle].sinceStart = now - this.cycles[cycle].startTime;
            }

            activeCycle = this.cycles[this.resetState];
            // 1000 sono i millisecondi in un secondo
            // sincestart (ms) / framecount
            // ci dice quanto passa in media tra un frame e l'altro in millisecondi
            // dividendo 1000 per questo valore otteniamo il frame rate
            this.fps =
                Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

            // se new.frameCount è uguale a old.frameCount allora significa
            // che il frame rate è stabile e non è cambiato
            // altrimenti significa che il frame rate non è stabile e gli diamo piu tempo
            // IMPORTANTE:
            // resetInterval * fps = il numero di frame che devono passare per resettare il ciclo
            if (this.cycles.new.frameCount === this.cycles.old.frameCount) {
                targetResetInterval = this.resetInterval * this.fps;
            } else {
                // per questo motivo qui moltiplichiamo il resetInterval per 2
                // in modo tale da dare piu tempo al ciclo per stabilizzarsi
                targetResetInterval = this.resetInterval * this.fps * 2;
            }

            // se il numero di frame del ciclo attivo è maggiore del numero di frame atteso
            // allora resettiamo il ciclo 
            if (activeCycle.frameCount > targetResetInterval) {
                this.cycles[this.resetState].frameCount = 0;
                this.cycles[this.resetState].startTime = now;
                this.cycles[this.resetState].sinceStart = 0;

                // passiamo allo stato che non è attivo per tenere traccia
                this.resetState = (this.resetState === 'new' ? 'old' : 'new');
            }

            // aggiorniamo lo stato del gioco
            // chiamando il metodo update di GameUpdate
            this.scope.state = this.scope.update.update(now);
            
            // chiamiamo il metodo render di GameRender
            // per disegnare il gioco sul canvas
            this.scope.render.render();

        }
    };

}