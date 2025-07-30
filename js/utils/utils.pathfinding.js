import { generateGrid, drawGrid } from "./utils.grid.js";  

// === MOVIMENTO ENEMY DIRETTO CON COLLISIONE ===
export function enemyUpdate(enemy, player, gridData) {
  const dx = player.position.x - enemy.position.x;
  const dy = player.position.y - enemy.position.y;
  const dist = Math.hypot(dx, dy);

  if (dist > 1) {
    const moveX = (dx / dist) * enemy.moveSpeed;
    const moveY = (dy / dist) * enemy.moveSpeed;
    const nextX = enemy.position.x + moveX;
    const nextY = enemy.position.y + moveY;

    const { collision } = enemy.checkCollision(nextX, nextY);
    if (!collision) {
      // enemy.position.x = nextX;
      // enemy.position.y = nextY;
      enemy.changePosition(nextX, nextY);
    } else {
      // tenta movimenti singoli asse X o Y
      const testX = enemy.checkCollision(enemy.position.x + moveX, enemy.position.y);
      if (!testX.collision || testX.isBorder && !testX.isInvalicable) {
        enemy.position.x += moveX;
      } else {
        const testY = enemy.checkCollision(enemy.position.x, enemy.position.y + moveY);
        if (!testY.collision || testX.isBorder && testX.isInvalicable) {
          enemy.position.y += moveY;
        }
      }
    }
  }
}

