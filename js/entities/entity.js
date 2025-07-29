export class Entity {
    constructor(
        scope,
        position = { x: 0, y: 0 },
        moveSpeed = 3,
        width = 23,
        height = 16,
        direction = "down",
        damage = 10,
    ) {
        this.scope = scope;
        // per rendere il codice piu leggibile 
        // passiamo anche un parametro state nella classe 
        this.state = scope.state;
        this.position = position;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
        
        this.direction = direction; // direzione in cui si muove l'entità
        this.damage = damage; // danno che infligge l'entità
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

    update(tick) { }

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
        let isBorder = false;

        // controlliamo i limiti del canvas
        if (nextX < 0 || nextX + this.width > this.scope.constants.width ||
            nextY < 0 || nextY + this.height > this.scope.constants.height) {
            // se nextX o nextY sono fuori dai limiti del canvas
            // allora abbiamo una collisione con il bordo del canvas
            collision = true;
            isBorder = true;
            console.log('Collision with border');
        }

        // controlliamo le collisioni con gli altri oggetti
        const entities = this.state.entities;
        // ci serve per tenere traccia dell'entità con cui è avvenuta la collisione
        let entityCollided;

        for (const entity of entities.keys()) {
            if (this !== entity &&
                nextX < entity.position.x + entity.width &&
                nextX + this.width > entity.position.x &&
                nextY < entity.position.y + entity.height &&
                nextY + this.height > entity.position.y) {
                // Collisione rilevata
                console.log(nextX, nextY, this, 'has detected a collision detected with', entity);

                collision = true;
                entityCollided = entity;
            }
        }
        return { collision, isBorder, entityCollided };
    }

    changePosition(nextX, nextY) {  
        this.position.x = nextX;
        this.position.y = nextY;
    }

    die() {
        this.state.entities.delete(this);
    }
}