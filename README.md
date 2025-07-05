# 🚀 Reflex Typing Game

Reflex Typing is a fast-paced, reflex-driven typing game that challenges your typing speed and accuracy. Built with **React**, **Redux**, **Framer Motion**, and styled entirely using **Bootstrap** — no custom CSS used!

---

## 🎮 Gameplay Overview

### 🏠 Home Screen
- Displays the game title and a short description.
- A **"Play"** button begins the game.

### ⏳ Countdown
- A countdown begins: **3 → 2 → 1 → Start!**

### ⌨️ Typing Challenge
- A random character (letter, number, or symbol) appears at a random screen position.
- Type the correct character before the timer runs out.
- Feedback:
  - ✅ **Correct input**: character turns **green**
  - ❌ **Wrong input**: character turns **red**
- Timer resets on correct key, and your **score increases by 5**.

### 🔥 Game Progression
- As the game continues:
  - Characters appear **faster**
  - The timer bar decreases
  - Difficulty gradually increases

### ⛔ Game Over
- When the timer reaches **0**, a **Game Over panel** appears:
  - Shows **final score**
  - Offers buttons to **Play Again** or return **Home**

---

## 🖥️ UI & Tech Stack

- ⚛️ **React** with Hooks
- 🧠 **Redux** for managing game state (score, timer, etc.)
- 🎨 **Bootstrap** for layout and styling (no custom CSS)
- 🎬 **Framer Motion** for subtle UI animations
- 📦 Fully modular, clean, and scalable file structure

---
