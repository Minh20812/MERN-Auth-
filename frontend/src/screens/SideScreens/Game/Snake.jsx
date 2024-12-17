import React, { useState, useEffect, useRef } from "react";
import BreadCrumb from "../components/BreadCrumb";

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [gridSize] = useState(20);
  const [snake, setSnake] = useState([{ x: 9, y: 9 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [showGrid, setShowGrid] = useState(true);
  const [lastKey, setLastKey] = useState(null);

  const cols = Math.floor(400 / gridSize);
  const rows = Math.floor(400 / gridSize);

  const placeFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };

    if (
      !snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    ) {
      setFood(newFood);
    } else {
      placeFood();
    }
  };

  const drawGrid = (ctx) => {
    if (!showGrid) return;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    for (let x = 0; x <= 400; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }

    for (let y = 0; y <= 400; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(400, y);
      ctx.stroke();
    }
  };

  const drawSnake = (ctx) => {
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize,
        gridSize
      );
    });
  };

  const drawFood = (ctx) => {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  };

  const moveSnake = (currentSnake, currentDirection) => {
    const newHead = {
      x: currentSnake[0].x + currentDirection.x,
      y: currentSnake[0].y + currentDirection.y,
    };

    const newSnake = [newHead, ...currentSnake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore > 5 && newScore <= 15) setSpeed(150);
        else if (newScore > 15 && newScore <= 25) setSpeed(100);
        else if (newScore > 25) setSpeed(50);
        return newScore;
      });
      placeFood();
    } else {
      newSnake.pop();
    }

    return newSnake;
  };

  const checkCollision = (currentSnake) => {
    const head = currentSnake[0];
    return (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= cols ||
      head.y >= rows ||
      currentSnake
        .slice(1)
        .some((segment) => segment.x === head.x && segment.y === head.y)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === lastKey) return;

    let newDirection = direction;
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) newDirection = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (direction.y === 0) newDirection = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (direction.x === 0) newDirection = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) newDirection = { x: 1, y: 0 };
        break;
      default:
        return;
    }

    setDirection(newDirection);
    setLastKey(e.key);
  };

  const resetGame = () => {
    setSnake([{ x: 9, y: 9 }]);
    setFood({ x: 10, y: 10 });
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setSpeed(200);
    setLastKey(null);
  };

  useEffect(() => {
    const handleGameLoop = () => {
      if (!gameOver) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid(ctx);
        drawFood(ctx);

        const newSnake = moveSnake(snake, direction);
        setSnake(newSnake);
        drawSnake(ctx);

        if (checkCollision(newSnake)) {
          setGameOver(true);
        }
      } else {
        if (window.confirm("Game Over. Restart?")) {
          resetGame();
        }
      }
    };

    const interval = setInterval(handleGameLoop, speed);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver, speed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, lastKey]);

  useEffect(() => {
    const preventArrowScroll = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventArrowScroll);
    return () => window.removeEventListener("keydown", preventArrowScroll);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white rounded-2xl">
      <BreadCrumb />
      <div className="h-screen flex flex-col justify-center items-center ">
        <h1 class="text-2xl font-bold text-white">
          Score:{" "}
          <span id="scoreDisplay" class="text-orange-500">
            0
          </span>
        </h1>
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={() => setShowGrid(!showGrid)}
            class="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-400 focus:ring-2 transition"
          />
          <label for="toggleGrid" class="text-white font-medium">
            Enable Grid
          </label>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{ border: "1px solid white" }}
        ></canvas>
      </div>
    </div>
  );
};

export default SnakeGame;
