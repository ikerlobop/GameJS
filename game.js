const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const tileSize = 70; // Tamaño de cada celda del mapa

// Definimos el mapa
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

// Función para generar posiciones válidas (dentro de celdas blancas)
function getRandomPosition() {
    let x, y;
    do {
        x = Math.floor(Math.random() * 8); // 8 columnas en el mapa
        y = Math.floor(Math.random() * 8); // 8 filas en el mapa
    } while (map[y][x] !== 0);
    return { x, y };
}

// Definimos al jugador
const player = {
    x: 1.5, // posición en el eje x (en coordenadas del mapa)
    y: 1.5, // posición en el eje y (en coordenadas del mapa)
    size: 10, // tamaño del jugador
    speed: 0.1, // velocidad del jugador
};

// Direcciones del jugador
const playerDirection = { x: 0, y: 0 };

// Posición del cuadrado verde
let position = getRandomPosition();
let greenSquare = {
    x: position.x + 0.5, // centrar dentro de la celda
    y: position.y + 0.5, // centrar dentro de la celda
    size: 20 / tileSize, // tamaño del cuadrado en términos de celdas del mapa
};

// Posición del cuadrado amarillo
position = getRandomPosition();
let yellowSquare = {
    x: position.x + 0.5,
    y: position.y + 0.5,
    size: 20 / tileSize,
};

let hasCollectedYellowSquare = false;

// Array de enemigos y proyectiles
let enemies = [];
let projectiles = [];

// Evento para disparar proyectiles
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        shootProjectile();
    }
});

function shootProjectile() {
    const speed = 5; // velocidad del proyectil
    const magnitude = Math.sqrt(playerDirection.x * playerDirection.x + playerDirection.y * playerDirection.y);

    // Asegurarse de que el jugador tenga una dirección válida (evitar división por cero)
    const normalizedDirectionX = (magnitude > 0) ? playerDirection.x / magnitude : 0;
    const normalizedDirectionY = (magnitude > 0) ? playerDirection.y / magnitude : 0;

    // Añadir el proyectil al array de proyectiles
    projectiles.push({
        x: player.x * tileSize,
        y: player.y * tileSize,
        vx: normalizedDirectionX * speed,
        vy: normalizedDirectionY * speed,
        size: 3 // tamaño del proyectil
    });
}

// Función para actualizar la posición de los proyectiles
function updateProjectiles() {
    projectiles = projectiles.filter(projectile => {
        projectile.x += projectile.vx;
        projectile.y += projectile.vy;

        // Mantener proyectiles en pantalla
        return projectile.x > 0 && projectile.x < canvas.width &&
               projectile.y > 0 && projectile.y < canvas.height;
    });
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

// Función para dibujar los proyectiles
function drawProjectiles() {
    context.fillStyle = 'black';
    projectiles.forEach(projectile => {
        context.beginPath();
        context.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
        context.fill();
    });
}

// Función para dibujar el cuadrado verde
function drawGreenSquare() {
    context.fillStyle = 'green';
    context.fillRect(greenSquare.x * tileSize, greenSquare.y * tileSize, greenSquare.size * tileSize, greenSquare.size * tileSize);
}

// Función para dibujar el cuadrado amarillo
function drawYellowSquare() {
    context.fillStyle = 'yellow';
    context.fillRect(yellowSquare.x * tileSize, yellowSquare.y * tileSize, yellowSquare.size * tileSize, yellowSquare.size * tileSize);
}

// Función para actualizar el juego
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    drawEnemies();
    if (yellowSquare) drawYellowSquare(); // Dibujar el cuadrado amarillo si no ha sido recogido
    drawGreenSquare(); // Dibujar el cuadrado verde
    updateProjectiles();
    drawProjectiles();
    checkCollisions();
    checkYellowSquareCollision(); // Verificar colisiones con el cuadrado amarillo
    checkGreenSquareCollision(); // Verificar colisiones con el cuadrado verde
    checkProjectileCollisions();
    requestAnimationFrame(update);
}

// Colisiones con las paredes
function isColliding(newX, newY) {
    const mapX = Math.floor(newX);
    const mapY = Math.floor(newY);

    if (map[mapY][mapX] === 1) {
        return true;
    }
    return false;
}

// Movimiento del jugador
document.addEventListener('keydown', function(event) {
    let newX = player.x;
    let newY = player.y;
    let directionX = 0;
    let directionY = 0;

    if (event.key === 'ArrowUp') directionY = -1;
    if (event.key === 'ArrowDown') directionY = 1;
    if (event.key === 'ArrowLeft') directionX = -1;
    if (event.key === 'ArrowRight') directionX = 1;

    // Si se detecta una dirección de movimiento
    if (directionX !== 0 || directionY !== 0) {
        let magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
        directionX /= magnitude;
        directionY /= magnitude;

        newX += directionX * player.speed;
        newY += directionY * player.speed;

        playerDirection.x = directionX;
        playerDirection.y = directionY;

        // Verificar colisiones y actualizar la posición del jugador
        if (!isColliding(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }
});

/*
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
}*/

 // Movimiento de los enemigos para perseguir al jugador
function moveEnemies() {
    enemies.forEach(enemy => {
        // Calcular la dirección hacia el jugador
        const directionX = player.x - enemy.x;
        const directionY = player.y - enemy.y;
        const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);

        // Normalizar la dirección y escalarla por la velocidad del enemigo
        const normalizedDirectionX = directionX / magnitude;
        const normalizedDirectionY = directionY / magnitude;

        // Calcular nueva posición del enemigo
        let newX = enemy.x + normalizedDirectionX * enemy.speed;
        let newY = enemy.y + normalizedDirectionY * enemy.speed;

        // Verificar colisiones con paredes y actualizar posición
        if (!isColliding(newX, newY)) {
            enemy.x = newX;
            enemy.y = newY;
        }
    });

   
    //ralentizar velocidad de los enemigos
    setTimeout(moveEnemies, 1000 / 5); // Aproximadamente 120 FPS
}
     
      
// Función para añadir un nuevo enemigo
function addEnemy() {
    let position = getRandomPosition();
    let newEnemy = {
        x: position.x + 0.5, // centrar dentro de la celda
        y: position.y + 0.5, // centrar dentro de la celda
        size: 10, // tamaño del enemigo
        speed: 0.05, // velocidad del enemigo
    };
    enemies.push(newEnemy);
    setTimeout(addEnemy, 10000); // Añadir un nuevo enemigo cada 10 segundos
}

// Función para verificar colisiones con enemigos
function checkCollisions() {
    enemies.forEach(enemy => {
        const distance = Math.sqrt(
            Math.pow(player.x - enemy.x, 2) +
            Math.pow(player.y - enemy.y, 2)
        );

        if (distance < (player.size + enemy.size) / tileSize) {
            alert('Perdiste');
            resetGame();
        }
    });
}

// Función para verificar colisiones con el cuadrado verde
function checkGreenSquareCollision() {
    const distance = Math.sqrt(
        Math.pow(player.x - greenSquare.x, 2) +
        Math.pow(player.y - greenSquare.y, 2)
    );

    // Si el jugador colisiona con el cuadrado verde y ha recogido el cuadrado amarillo
    if (distance < (player.size + greenSquare.size) / tileSize && hasCollectedYellowSquare) {
        alert('Ganaste');
        resetGame();
    }
}

// Función para verificar colisiones con el cuadrado amarillo
function checkYellowSquareCollision() {
    if (!yellowSquare) return; // Si el cuadrado amarillo ya fue recogido, no hacer nada

    const distance = Math.sqrt(
        Math.pow(player.x - yellowSquare.x, 2) +
        Math.pow(player.y - yellowSquare.y, 2)
    );

    // Al colisionar con el cuadrado amarillo, se marca como recogido
    if (distance < (player.size + yellowSquare.size) / tileSize) {
        yellowSquare = null;
        hasCollectedYellowSquare = true;
    }
}

// Función para verificar colisiones con proyectiles
function checkProjectileCollisions() {
    projectiles.forEach((projectile, pIndex) => {
        enemies.forEach((enemy, eIndex) => {
            const distance = Math.sqrt(
                Math.pow((projectile.x / tileSize) - enemy.x, 2) +
                Math.pow((projectile.y / tileSize) - enemy.y, 2)
            );

            if (distance < (enemy.size / tileSize)) {
                // Eliminar el proyectil y el enemigo
                enemies.splice(eIndex, 1);
                projectiles.splice(pIndex, 1);
            }
        });
    });
}

// Función para reiniciar el juego
function resetGame() {
    player.x = 1.5;
    player.y = 1.5;
    enemies = [];
    projectiles = [];
    hasCollectedYellowSquare = false;

    // Generar nueva posición para el cuadrado verde
    position = getRandomPosition();
    greenSquare.x = position.x + 0.5;
    greenSquare.y = position.y + 0.5;

    // Generar nueva posición para el cuadrado amarillo
    position = getRandomPosition();
    yellowSquare = {
        x: position.x + 0.5,
        y: position.y + 0.5,
        size: 20 / tileSize,
    };

    // Añadir un enemigo inicial en una posición válida
    addEnemy();
}

// Iniciamos el movimiento de los enemigos
moveEnemies();

// Iniciamos la adición de nuevos enemigos
addEnemy();

// Iniciamos el juego
update();
