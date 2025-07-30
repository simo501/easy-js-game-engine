// === CONFIG ===
const tileSize = 20;

// === GRIGLIA ===
export function generateGrid(game) {
  const cols = Math.floor(game.constants.width / tileSize);
  const rows = Math.floor(game.constants.height / tileSize);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (const [entity, info] of game.state.entities) {
    if (info.type === "block") {
      const startCol = Math.floor(entity.position.x / tileSize);
      const startRow = Math.floor(entity.position.y / tileSize);
      const endCol = Math.floor((entity.position.x + entity.width) / tileSize);
      const endRow = Math.floor((entity.position.y + entity.height) / tileSize);

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (row >= 0 && row < rows && col >= 0 && col < cols) {
            grid[row][col] = 1;
          }
        }
      }
    }
  }

  return { grid, cols, rows };
}

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
      enemy.position.x = nextX;
      enemy.position.y = nextY;
    } else {
      // tenta movimenti singoli asse X o Y
      const testX = enemy.checkCollision(enemy.position.x + moveX, enemy.position.y);
      if (!testX.collision) {
        enemy.position.x += moveX;
      } else {
        const testY = enemy.checkCollision(enemy.position.x, enemy.position.y + moveY);
        if (!testY.collision) {
          enemy.position.y += moveY;
        }
      }
    }
  }
}

// === DISEGNO DELLA GRIGLIA PER DEBUG ===
export function drawGrid(context, gridData) {
  context.save();
  context.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  context.lineWidth = 1;

  for (let row = 0; row < gridData.rows; row++) {
    for (let col = 0; col < gridData.cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      context.strokeRect(x, y, tileSize, tileSize);
    }
  }

  context.restore();
}
