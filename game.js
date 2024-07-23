const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const tileSize = 80; // Tamaño de cada celda del mapa

// //Definimos el mapa
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

// Colisiones con las paredes
function isColliding(newX, newY) {
    // Convertir coordenadas del jugador a coordenadas del mapa
    const mapX = Math.floor(newX);
    const mapY = Math.floor(newY);

    // Verificar si la celda en el mapa es una pared
    if (map[mapY][mapX] === 1) {
        return true;
    }
    return false;
}


// Función para dibujar el mapa
function drawMap() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                context.fillStyle = 'black'; // color de las paredes
            } else {
                context.fillStyle = 'white'; // color del suelo
            }
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

// Función para actualizar el juego
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    requestAnimationFrame(update);
}

// Movimiento
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

    // Verificamos si la colisión es verdadera
    if (!isColliding(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
});


// Iniciamos el juego
update();
