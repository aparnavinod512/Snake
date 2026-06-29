import { useEffect, useRef, useState } from "react";
import "./App.css";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

function createFood(snake) {
  let food;

  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));

  return food;
}

function createGame() {
  return {
    snake: INITIAL_SNAKE,
    food: createFood(INITIAL_SNAKE),
    score: 0,
    running: false,
    gameOver: false,
  };
}

export default function App() {
  const [game, setGame] = useState(createGame);
  const direction = useRef({ x: 1, y: 0 });

  useEffect(() => {
    function handleKeyDown(event) {
      const directions = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      const nextDirection = directions[event.key];
      if (!nextDirection) return;

      event.preventDefault();

      const current = direction.current;
      const isOpposite =
        current.x + nextDirection.x === 0 &&
        current.y + nextDirection.y === 0;

      if (!isOpposite) {
        direction.current = nextDirection;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!game.running) return;

    const timer = setInterval(() => {
      setGame((current) => {
        const head = current.snake[0];
        const newHead = {
          x: head.x + direction.current.x,
          y: head.y + direction.current.y,
        };

        const hitWall =
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE;

        const ateFood =
          newHead.x === current.food.x && newHead.y === current.food.y;

        const body = ateFood
          ? current.snake
          : current.snake.slice(0, -1);

        const hitSnake = body.some(
          (part) => part.x === newHead.x && part.y === newHead.y
        );

        if (hitWall || hitSnake) {
          return { ...current, running: false, gameOver: true };
        }

        const snake = [newHead, ...current.snake];

        if (!ateFood) {
          snake.pop();
        }

        return {
          ...current,
          snake,
          food: ateFood ? createFood(snake) : current.food,
          score: ateFood ? current.score + 10 : current.score,
        };
      });
    }, 130);

    return () => clearInterval(timer);
  }, [game.running]);

  function startGame() {
    setGame((current) => ({ ...current, running: true }));
  }

  function restartGame() {
    direction.current = { x: 1, y: 0 };
    setGame({ ...createGame(), running: true });
  }

  return (
    <main className="game">
      <h1>Snake Game</h1>
      <p className="score">Score: {game.score}</p>

      <div className="board">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
          const x = index % BOARD_SIZE;
          const y = Math.floor(index / BOARD_SIZE);

          const snakePosition = game.snake.findIndex(
            (part) => part.x === x && part.y === y
          );

          const isFood = game.food.x === x && game.food.y === y;

          let className = "cell";
          if (snakePosition === 0) className += " snake head";
          else if (snakePosition > 0) className += " snake";
          if (isFood) className += " food";

          return <div className={className} key={index} />;
        })}
      </div>

      {game.gameOver && <p className="message">Game over!</p>}

      {!game.running && (
        <button onClick={game.gameOver ? restartGame : startGame}>
          {game.gameOver ? "Play Again" : "Start Game"}
        </button>
      )}

      <p className="instructions">Use the arrow keys to move.</p>
    </main>
  );
}