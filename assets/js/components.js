/* ===== CHARGEMENT DES DIFFERENTS SONS DU JEU===== */
const WALL_HIT = new Audio('assets/sounds/wall.mp3');

const PADDLE_HIT = new Audio('assets/sounds/paddle_hit.mp3');

const BRICK_HIT = new Audio('assets/sounds/brick_hit.mp3');

const WIN = new Audio('assets/sounds/win.mp3');

const LIFE_LOST = new Audio('assets/sounds/life_lost.mp3');

/* ===== CHARGEMENT DES IMAGES ===== */
const LEVEL_IMG = new Image(40, 40);
LEVEL_IMG.src = 'assets/image/level.png';
const LIFE_IMG = new Image(40, 40);
LIFE_IMG.src = 'assets/image/life.png';
const SCORE_IMG = new Image();
SCORE_IMG.src = 'assets/image/score.png';