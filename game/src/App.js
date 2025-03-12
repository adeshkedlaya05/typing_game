import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const App = () => {
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
      setCountdown(count); // Set initial countdown
      const interval = setInterval(() => {
        count--;  // Decrease count first
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
    setCharColor("white"); // Ensure the character starts as white
  
    setTimeout(spawnNewCharacter, charSpeed); // Automatically spawn next character
  
    // 🔥 Adjust speed scaling 🔥
    setDifficulty((prev) => prev + 1);
    setCharSpeed((prev) => Math.max(prev - difficulty * 80, 8000)); // Faster scaling
  };
  
  const handleKeyPress = (event) => {
    if (gameState !== "playing") return;
  
    if (event.key === currentChar) {
      setScore((prev) => prev + 5);
      setTimer(30);
      setCharColor("green");
      setTimeout(spawnNewCharacter, 200);
    } else {
      setCharColor("red"); // Only turns red if a wrong key is pressed
    }
  };
  
  

  return (
    <div className="game-container" ref={gameContainerRef} onKeyDown={handleKeyPress} tabIndex="0">
      {gameState === "home" && (
        <div className="home-screen text-center">
          <h1 className="title">Reflex Typing</h1>
          <p className="description">Test your reflexes and typing speed!</p>
          <button className="btn btn-outline-light play-btn" onClick={() => setGameState("countdown")}>
            Play
          </button>
        </div>
      )}

      {gameState === "countdown" && <h1 className="countdown">{countdown === 0 ? "Start!" : countdown}</h1>}

      {gameState === "playing" && (
        <>
          <div className="progress bg-danger" style={{ height: "20px", width: "100%", position: "absolute", top: 0 }}>
            <div className="progress-bar bg-warning" style={{ width: `${(timer / 30) * 100}%` }}></div>
          </div>
          <h2 className="score" style={{ fontSize: "3rem", fontWeight: "bold" }}>
  Score: {score}
</h2>
          <h1 className="char-display" style={{ ...position, color: charColor }}>
            {currentChar}
          </h1>
        </>
      )}

      {gameState === "gameover" && (
        <div className="gameover-screen">
          <h1>Game Over!</h1>
          <h4>Final Score: {score}</h4>
          <button className="btn btn-success m-3" style={{ width: "200px", fontSize: "1.5rem" }} onClick={() => setGameState("countdown")}>
  Play Again
</button>
<button className="btn btn-danger m-3" style={{ width: "200px", fontSize: "1.5rem" }} onClick={() => setGameState("home")}>
  Home
</button>

        </div>
      )}
    </div>
  );
};

export default App;
