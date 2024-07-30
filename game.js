const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const tileSize = 80; // Tamaño de cada celda del mapa

// Definimos el mapa
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

// Definimos al jugador
const player = {
    x: 1.5, // posición en el eje x (en coordenadas del mapa)
    y: 1.5, // posición en el eje y (en coordenadas del mapa)
    size: 10, // tamaño del jugador
    speed: 0.1, // velocidad del jugador
};

// Array de enemigos
let enemies = [
    {
        x: 6.5, // posición en el eje x (en coordenadas del mapa)
        y: 6.5, // posición en el eje y (en coordenadas del mapa)
        size: 10, // tamaño del enemigo
        speed: 0.1, // velocidad del enemigo
    }
];

// Posición del cuadrado verde
let square = {
    x: Math.random() * 6 + 1, // Ajuste para no salir del borde
    y: Math.random() * 6 + 1, // Ajuste para no salir del borde
    size: 20 / tileSize, // tamaño del cuadrado en términos de celdas del mapa
};

// Colisiones con las paredes
function isColliding(newX, newY) {
    const mapX = Math.floor(newX);
    const mapY = Math.floor(newY);

    if (map[mapY][mapX] === 1) {
        return true;
    }
    return false;
}

// Función para dibujar el mapa
function drawMap() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            context.fillStyle = map[y][x] === 1 ? 'black' : 'white';
            context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

// Función para dibujar al jugador
function drawPlayer() {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(player.x * tileSize, player.y * tileSize, player.size, 0, Math.PI * 2);
    context.fill();
}

// Función para dibujar los enemigos
function drawEnemies() {
    context.fillStyle = 'blue';
    enemies.forEach(enemy => {
        context.beginPath();
        context.arc(enemy.x * tileSize, enemy.y * tileSize, enemy.size, 0, Math.PI * 2);
        context.fill();
    });
}

// Función para dibujar el cuadrado verde
function drawSquare() {
    context.fillStyle = 'green';
    context.fillRect(square.x * tileSize, square.y * tileSize, square.size * tileSize, square.size * tileSize);
}

// Función para actualizar el juego
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    drawEnemies();
    drawSquare();
    checkCollisions();
    checkSquareCollision();
    requestAnimationFrame(update);
}

// Movimiento del jugador
document.addEventListener('keydown', function(event) {
    let newX = player.x;
    let newY = player.y;

    if (event.key === 'ArrowUp') {
        newY -= player.speed;
    }
    if (event.key === 'ArrowDown') {
        newY += player.speed;
    }
    if (event.key === 'ArrowLeft') {
        newX -= player.speed;
    }
    if (event.key === 'ArrowRight') {
        newX += player.speed;
    }

    if (!isColliding(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
});

// Movimiento aleatorio de los enemigos
function moveEnemies() {
    enemies.forEach(enemy => {
        let newX = enemy.x + (Math.random() - 0.5) * 2 * enemy.speed;
        let newY = enemy.y + (Math.random() - 0.5) * 2 * enemy.speed;

        if (!isColliding(newX, newY)) {
            enemy.x = newX;
            enemy.y = newY;
        }
    });
    setTimeout(moveEnemies, 1000);
}

// Función para añadir un nuevo enemigo
function addEnemy() {
    let newEnemy = {
        x: Math.random() * 6 + 1, // posición aleatoria en el mapa
        y: Math.random() * 6 + 1, // posición aleatoria en el mapa
        size: 10, // tamaño del enemigo
        speed: 0.1, // velocidad del enemigo
    };
    enemies.push(newEnemy);
    setTimeout(addEnemy, 10000); // Añadir un nuevo enemigo cada 10 segundos
}

// Función para verificar colisiones con enemigos
function checkCollisions() {
    enemies.forEach(enemy => {
        const distance = Math.sqrt(
            Math.pow(player.x - enemy.x, 1) +
            Math.pow(player.y - enemy.y, 1)
        );

        if (distance < (player.size + enemy.size) / tileSize) {
            alert('Perdiste');
            resetGame();
        }
    });
}

// Función para verificar colisiones con el cuadrado verde
function checkSquareCollision() {
    const distance = Math.sqrt(
        Math.pow(player.x - square.x, 1) +
        Math.pow(player.y - square.y, 1)
    );

    if (distance < (player.size / tileSize) + square.size) {
        alert('Ganaste');
        resetGame();
    }
}

// Función para reiniciar el juego
function resetGame() {
    player.x = 1.5;
    player.y = 1.5;
    enemies = [
        {
            x: 6.5,
            y: 6.5,
            size: 10,
            speed: 0.1,
        }
    ];
    // Generar una nueva posición para el cuadrado verde
    square.x = Math.random() * 6 + 1;
    square.y = Math.random() * 6 + 1;
}

// Iniciamos el movimiento de los enemigos
moveEnemies();

// Iniciamos la adición de nuevos enemigos
addEnemy();

// Iniciamos el juego
update();