// core/spawner.js
import { Directions } from '../utils/utils.directions.js';
import * as colors from '../utils/utils.colors.js';
import { Enemy } from '../entities/enemy.dynamic.js';

export class Spawner {
  /**
   * @param {object} opts
   *  - scene:   Scene   (obbligatorio)
   *  - player:  Player  (obbligatorio)
   *  - camera:  Camera  (opzionale: se presente prova a spawnare off-screen)
   *  - rng:     () => number (opzionale: default Math.random)
   */
  constructor({ scene, player, camera = null, rng = Math.random }) {
    this.scene  = scene;
    this.player = player;
    this.camera = camera;
    this.rng    = rng;

    this.elapsed    = 0;                // secondi dall’inizio
    this.timeToNext = 0;                // countdown al prossimo spawn (s)
    this.maxActive  = 80;               // cap globale “Nemico Gameboy”
    const tile = 48;                    // pixel logici per tile
    this.ring = { rMinPx: 10*tile, rMaxPx: 18*tile }; // anello di spawn intorno al player
  }

  // Conta quanti "Nemico Gameboy" sono attivi nella scena (entities è una Map)
  activeEnemies() {
    const map = this.scene?.entities;
    if (!map) return 0;
    let count = 0;
    for (const ent of map.keys()) {
      if (ent?.identity?.name === "Nemico Gameboy") count++;
    }
    return count;
  }

  // spawns/sec: cresce dolcemente e con micro-ondine
  spawnRate() {
    const t = this.elapsed;
    const minutes = t / 60;
    const base   = 0.6 + 0.12 * minutes;
    const spikes = (Math.sin(t / 18) + 1) * 0.08;
    return Math.min(3, base + spikes);
  }

  scheduleNext() {
    const λ = Math.max(0.05, this.spawnRate());
    const U = Math.max(1e-6, this.rng());
    this.timeToNext = -Math.log(U) / λ; // Exp(λ)
  }

  /**
   * @param {number} dt   delta time in secondi
   * @param {number} tick (facoltativo)
   */
  update(dt, tick) {
    if (!this.scene || !this.player) return;

    this.elapsed += dt;
    if (this.activeEnemies() >= this.maxActive) return;

    this.timeToNext -= dt;
    if (this.timeToNext <= 0) {
      if (this.trySpawn()) this.scheduleNext();
      else this.timeToNext = 0.2; // riprova tra poco se fallisce il posizionamento
    }
  }

  trySpawn() {
    const pos = this.randomRingPosition(this.ring.rMinPx, this.ring.rMaxPx);
    if (!pos) return false;

    // parametri allineati al tuo esempio di Enemy
    const speed = 2;
    const hp    = 100;

    const enemy = new Enemy(
      this.scene,
      { x: Math.floor(pos.x), y: Math.floor(pos.y) },
      { w: 48, h: 48 },
      { speed, dir: Directions.DOWN, moving: true },
      { curr: hp, max: hp, immortal: false, timeToLive: -1 },
      { basicSrc: 'assets/gameboy/gameboy-sprite.png', currentFrame: 0, totalFrames: 2, w: 48, h: 48 },
      { availableShoots: 0, maxShoots: 0, defaultDamage: 15, lastShootTime: 0, reloadTime: 500 },
      this.player,
      { name: "Enemy", color: colors.gameboyText }
    );

    this.scene.addEntity(enemy);
    return true;
  }

  // Estrae una posizione casuale su un anello [rMinPx, rMaxPx] attorno al player.
  // Se c'è la camera, prova a stare fuori dallo schermo (margine 64px).
  randomRingPosition(rMinPx, rMaxPx) {
    const px = this.player.position.x;
    const py = this.player.position.y;

    for (let i = 0; i < 20; i++) {
      const a = this.rng() * Math.PI * 2;
      const r = rMinPx + (rMaxPx - rMinPx) * this.rng();
      const x = px + Math.cos(a) * r;
      const y = py + Math.sin(a) * r;

      if (!this.camera || this.isOffscreen(x, y)) return { x, y };
    }
    return null;
  }

  // Off-screen rispetto a camera.centerPos/width/height (controllo sul punto di spawn)
  isOffscreen(x, y) {
    if (!this.camera) return true;
    const cx = this.camera.centerPos.x;
    const cy = this.camera.centerPos.y;
    const halfW = this.camera.width  / 2;
    const halfH = this.camera.height / 2;
    const left   = cx - halfW;
    const right  = cx + halfW;
    const top    = cy - halfH;
    const bottom = cy + halfH;
    const margin = 64;
    return (
      x < left  - margin ||
      x > right + margin ||
      y < top   - margin ||
      y > bottom+ margin
    );
  }
}
