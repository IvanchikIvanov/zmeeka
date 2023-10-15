import * as PIXI from 'https://cdn.skypack.dev/pixi.js';

const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

let score = 0;

const ball = new PIXI.Graphics();
ball.beginFill(0xFF0000);
ball.drawCircle(0, 0, 20);
ball.endFill();
ball.x = Math.random() * app.screen.width;
ball.y = 0;
app.stage.addChild(ball);

ball.interactive = true;
ball.buttonMode = true;

ball.on('pointerdown', () => {
    score++;
    ball.x = Math.random() * app.screen.width;
    ball.y = 0;
    console.log("Score:", score);
});

function gameLoop() {
    ball.y += 5;

    if (ball.y > app.screen.height) {
        ball.x = Math.random() * app.screen.width;
        ball.y = 0;
    }
}

app.ticker.add(gameLoop);
