import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./game";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  );
};

export default App;
