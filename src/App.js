import "./App.css";
import { GameLogic } from "./components/GameLogic";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="game-name-info">
          <h3>Memory Game</h3>
          <p>
            Pick as many unique cards as possible by not picking the same card
            twice.
          </p>
        </div>
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
      </header>
      <div className="game-container">
        <GameLogic />
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
