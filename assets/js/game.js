
//Initialisation du canvas et définition du context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Ajout de la bordure au canvas
canvas.style.border = '1px solid #6198d8';
ctx.lineWidth = 1;

//Variables nécessaires
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
const paddleMarginBottom = 20;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = canvas.height -paddleHeight;
let gameOver = false;
var score = 0;
var lives = 2;
var level = 1;
const maxLevel = 3;
let isPaused = false;

//Variable de mise en place des touche de la planche
var rightPressed = false;
var leftPressed = false;

//variables de brique
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;



// Mise en place des touche de la planche
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

//desiner la balle
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


//desiner la planche
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// column = colonnes de briques
// row = lignes de briques

var bricks = [];
for(var column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    for(var row = 0; row < brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
}
//desiner les briques
function drawBricks() {
    for(var column = 0; column < brickColumnCount; column++) {
        for(var row = 0; row < brickRowCount; row++) {
            if(bricks[column][row].status == 1) {
                var brickX = (column*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[column][row].x = brickX;
                bricks[column][row].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// collision
function collisionDetection() {
    for(var column= 0; column < brickColumnCount; column++) {
        for(var row= 0; row < brickRowCount; row++) {
            var b = bricks[column][row];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    BRICK_HIT.play();
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        WIN.play();
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

//Afficher les statistiques du jeu
function showStats(img, iPosX, iPosY, text = '', tPosX = null, tPosY = null) {
    ctx.fillStyle = '#fff';
    ctx.font = '20px gruppo';
    ctx.fillText(text, tPosX, tPosY);
    ctx.drawImage(img, iPosX, iPosY, width = 20, height = 20);
}

//GESTION DU DOM POUR L'AFFICHAGE DES ERREURS
//Importation des éléments du DOM
const rules = document.getElementById('rules');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const game_over = document.getElementById('game-over');
const youWin = game_over.querySelector('#you-won');
const youLose = game_over.querySelector('#you-lose');
const restart = game_over.querySelector('#restart');

//Affichage des règles du jeu
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
    isPaused = true;
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
    isPaused = false;
});
//Fin de la partie
function gameover () {
    if (lives<= 0) {
        showEndInfo('lose');
        gameOver = true;
    }
}

//Affichage des info de fin de parties (Victoire ou echec)
function showEndInfo(type = 'win') {
    game_over.style.visibility = 'visible';
    game_over.style.opacity = '1';
    if (type === 'win') {
        youWin.style.visibility = 'visible';
        youLose.style.visibility = 'hidden';
        youLose.style.opacity = '0';
    } else {
        youWin.style.visibility = 'hidden';
        youWin.style.opacity = '0';
        youLose.style.visibility = 'visible';
    }
} 

//Aller au niveau suivant
// function nextLevel () {
//     // let isLevelUp = true;

//     // for (let r = 0; r < brickRowCount; r++) {
//     //     for (let c = 0; c < brickColumnCount; c++) {
//     //         isLevelUp = isLevelUp && score == brickRowCount*brickColumnCount;
//     //     }
//     // }

//     // if (isLevelUp) {
//     //     WIN.play();

//     //     if (level >= maxLevel) {
//     //         showEndInfo();
//     //         gameOver = true;
//     //         return;
//     //     }
//     //         brickRowCount += 2;
//     //         drawBricks();
            
//     //         level++;
        
       
//     // }
// }
//GESTION DES EVENEMENTS AUDIO
const sound = document.getElementById('sound');
sound.addEventListener('click', audioManager);

function audioManager() {
    //Changer l'image
    let imgSrc = sound.getAttribute('src');
    let SOUND_IMG = imgSrc === 'assets/image/sound_on.png' ? 'assets/image/mute.png' : 'assets/image/sound_on.png';
    sound.setAttribute('src', SOUND_IMG);

    //Modification des sons en fonction des etats
    WALL_HIT.muted = !WALL_HIT.muted;
    PADDLE_HIT.muted = !PADDLE_HIT.muted;
    BRICK_HIT.muted = !BRICK_HIT.muted;
    WIN.muted = !WIN.muted;
    LIFE_LOST.muted = !LIFE_LOST.muted;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle(); 
    showStats(SCORE_IMG, canvas.width - 100, 5, score, canvas.width - 65, 22);
    showStats(LIFE_IMG, 35, 5, lives, 70, 22);
    showStats(LEVEL_IMG,(canvas.width / 2) - 25, 5, level, (canvas.width / 2), 22);
    collisionDetection();
    // nextLevel();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        WALL_HIT.play();
    }
    if(y + dy < ballRadius) {
        dy = -dy;
        WALL_HIT.play();
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        PADDLE_HIT.play();
      }
      else {
        lives--;
        LIFE_LOST.play();
        if(!lives) {
            gameover();
        //    alert("GAME OVER");
        
        //   document.location.reload();
        }
        else {
            
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 3;
          dy = -3;
          paddleX = (canvas.width-paddleWidth)/2;
          
        }
      }
    }
  
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }
  
    x += dx;
    y += dy;
    if(!gameOver){
        requestAnimationFrame(draw);
    }
    
}

//Relancer le jeu
restart.addEventListener('click', () => {location.reload();});


    


  

