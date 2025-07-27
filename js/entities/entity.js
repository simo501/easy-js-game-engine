export class Entity {
    constructor(scope, position = { x: 0, y: 0 }, moveSpeed = 3, width = 23, height = 16) {
        this.scope = scope;
        // per rendere il codice piu leggibile 
        // passiamo anche un parametro state nella classe 
        this.state = scope.state || {};
        this.position = position;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
    }

    render(color = '#ff44ff') {
        this.scope.context.fillStyle = color;
        this.scope.context.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    };

    update() { }

    checkCollision(nextX, nextY) {
        // qui dovremmo implementare la logica per controllare le collisioni
        // con altri oggetti o entità nel gioco
        // ad esempio, se il giocatore tocca un muro o un altro oggetto
        // possiamo usare le coordinate di this.position e le dimensioni
        // this.width e this.height per verificare le collisioni
        // con altri oggetti nel gioco

        // proprietà che una collisione può avere
        // collision: se è avvenuta una collisione
        // isDeadly: se l'oggetto con cui è avvenuta la collisione è letale
        // isBorder: se l'oggetto con cui è avvenuta la collisione è un bordo
        // isSolid: se l'oggetto con cui è avvenuta la collisione è solido
        let collision = false;
        let isDeadly = false;
        let isBorder = false;
        let isSolid = false;

        // controlliamo i limiti del canvas
        if (nextX < 0 || nextX + this.width > this.scope.constants.width ||
            nextY < 0 || nextY + this.height > this.scope.constants.height) {
            // se nextX o nextY sono fuori dai limiti del canvas
            // allora abbiamo una collisione con il bordo del canvas
            collision = true;
            isBorder = true;
            // console.log('Collision with border');
        }

        // controlliamo le collisioni con gli altri oggetti
        const entities = Object.values(this.state.entities);
        for (const entity of entities) {
            if (this !== entity && 
                nextX < entity.position.x + entity.width &&
                nextX + this.width > entity.position.x &&
                nextY < entity.position.y + entity.height &&
                nextY + this.height > entity.position.y) {
                // Collisione rilevata
                // console.log('Collision detected with', entity);

                collision = true;
            }
        }
        return {collision, isDeadly, isBorder, isSolid};
    }

    getEntity() {
        return this;
    }
}