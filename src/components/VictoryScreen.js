import React, { useState, useEffect } from "react";
import "./VictoryScreen.css";
import paimon_easy from "../images/paimon_easy.png";
import paimon_normal from "../images/paimon_normal.png";
import paimon_hard from "../images/paimon_hard.png";
import paimon_master from "../images/paimon_master.png";

export const VictoryScreen = (gameWin) => {
  console.log("Victory Status", gameWin);
  console.log("Difficulty passed", gameWin.name.difficulty.name);
  if (gameWin.name.winCondition === "true") {
    let victoryMessage = "";
    let paimon_image;
    if (gameWin.name.difficulty.name === "Easy") {
      victoryMessage = "You Won the game on Easy difficulty! Nicely Done!";
      paimon_image = paimon_easy;
    } else if (gameWin.name.difficulty.name === "Normal") {
      victoryMessage = "You Won the game on Normal difficulty! Impressive!";
      paimon_image = paimon_normal;
    } else if (gameWin.name.difficulty.name === "Hard") {
      victoryMessage = "You Won the game on Hard difficulty! Amazing!";
      paimon_image = paimon_hard;
    } else if (gameWin.name.difficulty.name === "Master") {
      victoryMessage = "You Won the game on MASTER difficulty! A BEAST!";
      paimon_image = paimon_master;
    }
    console.log("gameWin.playAgain",gameWin.name.playAgain)
    return (
      <div id="victory-screen">
        <div>Congratulations!</div>
        <div className="victory-text">{victoryMessage}</div>
        <button className="victory-button" onClick={gameWin.name.playAgain}>Play Again</button>
        <img src={paimon_image} alt="paimon_easy" id="paimon-victory-screen" />
      </div>
    );
  } else return null;
};
