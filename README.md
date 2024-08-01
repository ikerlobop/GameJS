# JavaScript Gauntlet: Code Your Way Through the Maze!

## Descripción

JavaScript Gauntlet" es un juego de acción inspirado en Gauntlet, desarrollado en JavaScript. Los jugadores deben navegar a través de un laberinto, enfrentarse a enemigos, disparar proyectiles y llegar a la puerta de salida para ganar. Actualmente, el juego está en desarrollo, y su objetivo principal es servir como un proyecto para profundizar en el conocimiento de la programación.

## Características Actuales

- **Mapa Dinámico**: Laberinto definido por una matriz que indica paredes y espacios libres.
- **Jugador**: Mueve al jugador con las teclas de flechas y dispara proyectiles con la tecla de espacio.
- **Enemigos**: Los enemigos se generan aleatoriamente y se mueven de manera aleatoria.
- **Proyectiles**: Dispara proyectiles que se mueven en la dirección de tu movimiento.
- **Objetivo**: Alcanzar el cuadrado verde (puerta) para ganar el juego recogiendo previamente el cuadrado amarillo(llave).

## Requisitos del Sistema

Este juego se ejecuta en un navegador web moderno. Asegúrate de tener:

- **Navegador**: Última versión de Chrome, Firefox, Safari o Edge.


## Instalación y Ejecución

Clona el repositorio:

```bash
git clone https://github.com/ikerlobop/GameJS.git
```
## Abre el archivo HTML

1. Navega al directorio clonado.
2. Abre `index.html` en tu navegador web.

## Cómo Jugar

- **Movimiento**: Usa las teclas de flechas (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) para mover al jugador.
- **Disparo**: Presiona la tecla Espacio para disparar proyectiles.
- **Objetivo**: Alcanza el cuadrado verde para ganar.

## Controles

- **Movimiento**: Teclas de flechas
- **Disparo**: Tecla de espacio

## Funciones Principales

- **drawMap**: Dibuja el laberinto en el canvas.
- **drawPlayer**: Dibuja al jugador.
- **drawEnemies**: Dibuja a los enemigos.
- **drawProjectiles**: Dibuja los proyectiles.
- **drawSquare**: Dibuja el cuadrado verde objetivo.
- **update**: Actualiza el estado del juego y redibuja los elementos.
- **checkCollisions**: Verifica colisiones entre el jugador y los enemigos.
- **checkSquareCollision**: Verifica si el jugador alcanza el cuadrado verde.
- **checkProjectileCollisions**: Verifica colisiones entre proyectiles y enemigos.

## Mejoras y Futuras Expansiones

- **Mejorar la IA de los Enemigos**: Implementar comportamientos más inteligentes y patrones de movimiento para los enemigos.
- **Niveles y Dificultad**: Añadir niveles adicionales con diferentes mapas y aumentar la dificultad.
- **Interfaz de Usuario (UI)**: Incluir elementos como barras de vida, puntuación y temporizadores.
- **Gráficos y Animaciones**: Mejorar los gráficos del juego y añadir animaciones para el jugador, enemigos y proyectiles.
- **Sonido y Música**: Incorporar efectos de sonido y música para una experiencia más inmersiva.
- **Multijugador**: Desarrollar un modo cooperativo para permitir que varios jugadores jueguen juntos.

## Créditos

- **Desarrollador Principal**: Iker Lobo Pérez

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
