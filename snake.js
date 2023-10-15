const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
});
document.body.appendChild(app.view);

const cellSize = 20;
let direction = { x: 1, y: 0 };
const snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };

function drawCell(x, y, color) {
    const rect = new PIXI.Graphics();
    rect.beginFill(color);
    rect.drawRect(x * cellSize, y * cellSize, cellSize, cellSize);
    rect.endFill();
    app.stage.addChild(rect);
}

// ... [остальной код остается без изменений]


function drawSnake() {
    snake.forEach(segment => {
        drawCell(segment.x, segment.y, 0x00FF00);
    });
}

function drawFood() {
    drawCell(food.x, food.y, 0xFF0000);
}

function gameLoop() {
    const head = Object.assign({}, snake[0]);

    head.x += direction.x;
    head.y += direction.y;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (app.screen.width / cellSize)),
            y: Math.floor(Math.random() * (app.screen.height / cellSize))
        };
    } else {
        snake.pop();
    }

    app.stage.removeChildren();
    drawSnake();
    drawFood();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

setInterval(gameLoop, 100);
