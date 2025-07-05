import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameState: 'home',
  countdown: 3,
  timer: 30,
  score: 0,
  currentChar: '',
  charColor: 'white',
  position: { top: '50%', left: '50%' },
  charSpeed: 2000,
  difficulty: 1,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action) => void (state.gameState = action.payload),
    setCountdown: (state, action) => void (state.countdown = action.payload),
    setTimer: (state, action) => void (state.timer = action.payload),
    setScore: (state, action) => void (state.score = action.payload),
    setCurrentChar: (state, action) => void (state.currentChar = action.payload),
    setCharColor: (state, action) => void (state.charColor = action.payload),
    setPosition: (state, action) => void (state.position = action.payload),
    setCharSpeed: (state, action) => void (state.charSpeed = action.payload),
    setDifficulty: (state, action) => void (state.difficulty = action.payload),
    resetGame: (state) => {
      state.score = 0;
      state.timer = 30;
      state.charSpeed = 10000;
      state.difficulty = 1;
    },
  },
});

export const {
  setGameState, setCountdown, setTimer, setScore,
  setCurrentChar, setCharColor, setPosition,
  setCharSpeed, setDifficulty, resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
