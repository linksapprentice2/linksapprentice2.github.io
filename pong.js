const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

    // Draw scores
    ctx.font = '30px Arial';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, canvas.width * 3 / 4, 50);
}

// Update game state
function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
        ballSpeedY *= -1;
    }

    // Ball collision with paddles
    if (ballX - ballSize / 2 < paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
        ballSpeedX *= -1;
    }
    if (ballX + ballSize / 2 > canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
        ballSpeedX *= -1;
    }

    // Ball out of bounds (scoring)
    if (ballX < 0) {
        player2Score++;
        resetBall();
    } else if (ballX > canvas.width) {
        player1Score++;
        resetBall();
    }
}

// Reset ball position
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 5; // Random initial direction
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 5;
}

// Handle paddle movement
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w':
            player1Y -= 10;
            break;
        case 's':
            player1Y += 10;
            break;
        case 'ArrowUp':
            player2Y -= 10;
            break;
        case 'ArrowDown':
            player2Y += 10;
            break;
    }
    // Keep paddles within bounds
    player1Y = Math.max(0, Math.min(canvas.height - paddleHeight, player1Y));
    player2Y = Math.max(0, Math.min(canvas.height - paddleHeight, player2Y));
});

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
resetBall();
gameLoop();
