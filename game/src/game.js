import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const Game = () => {
  const [gameState, setGameState] = useState("home");
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [currentChar, setCurrentChar] = useState("");
  const [charColor, setCharColor] = useState("white");
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [charSpeed, setCharSpeed] = useState(2000);
  const [difficulty, setDifficulty] = useState(1);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (gameState === "countdown") {
      let count = 3;
      setCountdown(count);
      const interval = setInterval(() => {
        count--;
        setCountdown(count);
        if (count === 0) {
          clearInterval(interval);
          setGameState("playing");
          startGame();
        }
      }, 1000);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing") {
      const gameTimer = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(gameTimer);
            setGameState("gameover");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(gameTimer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing") {
      gameContainerRef.current.focus();
    }
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setTimer(30);
    setCharSpeed(10000);
    setDifficulty(1);
    spawnNewCharacter();
  };

  const spawnNewCharacter = () => {
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    const randomTop = Math.floor(Math.random() * 60) + 30 + "%";
    const randomLeft = Math.floor(Math.random() * 80) + "%";
    setCurrentChar(randomChar);
    setPosition({ top: randomTop, left: randomLeft });
    setCharColor("white");
    setTimeout(spawnNewCharacter, charSpeed);
    setDifficulty((prev) => prev + 1);
    setCharSpeed((prev) => Math.max(prev - difficulty * 80, 8000));
  };

  const handleKeyPress = (event) => {
    if (gameState !== "playing") return;
    if (event.key === currentChar) {
      setScore((prev) => prev + 5);
      setTimer(30);
      setCharColor("green");
      setTimeout(spawnNewCharacter, 200);
    } else {
      setCharColor("red");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 text-white bg-dark position-relative"
      ref={gameContainerRef}
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      {gameState === "home" && (
        <div className="text-center">
          <h1 className="display-1 fw-bold">Reflex Typing</h1>
          <p className="fs-3 fst-italic">Test your reflexes and typing speed!</p>
          <button className="btn btn-outline-light btn-lg px-5 py-3 mt-4" onClick={() => setGameState("countdown")}>
            Play
          </button>
        </div>
      )}

      <AnimatePresence>
        {gameState === "countdown" && (
          <motion.h1
            className="display-1 fw-bold"
            key="countdown"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {countdown === 0 ? "Start!" : countdown}
          </motion.h1>
        )}
      </AnimatePresence>

      {gameState === "playing" && (
        <>
          <div className="progress bg-danger position-absolute top-0 start-0 w-100" style={{ height: "20px" }}>
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{
                width: `${(timer / 30) * 100}%`,
                transition: "width 1s linear",
              }}
            ></div>
          </div>

          <h2 className="position-absolute top-0 mt-4 fs-1 fw-bold">Score: {score}</h2>

          <motion.h1
            className="position-absolute fw-bold"
            key={currentChar}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
            style={{
              ...position,
              color: charColor,
              transform: "translate(-50%, -50%)",
              fontSize: "4rem",
            }}
          >
            {currentChar}
          </motion.h1>
        </>
      )}

      <AnimatePresence>
        {gameState === "gameover" && (
          <motion.div
            key="gameover"
            className="text-white p-4 rounded shadow text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "linear-gradient(135deg, rgba(10,15,37,0.95), rgba(26,14,42,0.95))",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h1 className="mb-3">Game Over!</h1>
            <h4 className="mb-4">Final Score: {score}</h4>
            <button className="btn btn-success me-3 px-4 py-2 fs-5" onClick={() => setGameState("countdown")}>
              Play Again
            </button>
            <button className="btn btn-danger px-4 py-2 fs-5" onClick={() => setGameState("home")}>
              Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;
