import React, { useState, useEffect, unmountComponentAtNode } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import Select from "react-select";
import GameLogic from "./components/GameLogic";
import genshinLogo from "./images/Site-logo.jpg";
import paimon from "./images/paimon_sticker_2.png"

const App = () => {
  const difficulty = [
    { value: "Easy", label: "Easy - 8 Unique Cards" },
    { value: "Normal", label: "Normal - 18 Unique Cards" },
    { value: "Hard", label: "Hard - 32 Unique Cards" },
    { value: "Master", label: "Master - 56 Unique Cards" },
  ];
  const [diff, setDiff] = useState("Easy");
  useEffect(() => {
    // console.log(diff) ? GameLogic(diff) : console.log(diff);
    console.log("APP Component Mounted");
  }, []);

  useEffect(() => {
    // console.log(diff) ? GameLogic(diff) : console.log(diff);
    console.log("diff- UPDATED");
  }, [diff]);

  const setDiffFunction = (choice) => {
    setDiff(choice.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={genshinLogo} alt="Game logo" id="game-logo" />
        <div className="game-name-info">
          <h3>Memory Game</h3>
          <p>
            Pick as many cards as possible while not picking the same card
            twice.
          </p>
        </div>
        <img src={paimon} alt="paimon" id="paimon" />
        <div className="game-score">
          <div className="best-score">
            <div>Best Score</div>
            <div id="best-score-keeper">0</div>
          </div>
          <div className="current-score">
            <div>Current Score</div>
            <div id="current-score-keeper">0</div>
          </div>
        </div>
        <div className="select-game-difficulty">
          <div id="set-game-difficulty">Set The Difficulty</div>
          <Select
            options={difficulty}
            defaultValue={{ value: "Easy", label: "Easy - 8 Unique Cards" }}
            onChange={(choice) => setDiffFunction(choice)}
          />
        </div>
      </header>
      <div className="game-container" id="game-container-id">
        <GameLogic name={diff} />
      </div>
      <footer>
        <div>Memory Card game by&nbsp;</div>
        <img
          id="github-logo"
          src={require("./GitHub-Mark-32px.png")}
          alt=""
        />{" "}
        &nbsp; <a href="https://github.com/NenoPr">NenoPr</a>
      </footer>
    </div>
  );
};

export default App;