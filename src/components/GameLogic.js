import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { getImagesFromFolder, shuffle } from "./GetImages";
import "./GameLogicStyle.css";

export const GameLogic = (props) => {
  const [gameCards, setGameCards] = useState(getImagesFromFolder);
  const [score, setScore] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  // COMPONENT MOUNTED
  useEffect(() => {
    // Randomize css variables for render animation
    document.querySelectorAll(".game-image").forEach((node) => {
      let locLeft = Math.floor(Math.random() * 100);
      locLeft *= Math.round(Math.random()) ? 1 : -1;
      let locRight = Math.floor(Math.random() * 100);
      locRight *= Math.round(Math.random()) ? 1 : -1;
      node.style.setProperty("--random-location-left", locLeft + "%");
      node.style.setProperty("--random-location-top", locRight + "%");
    });
    console.log("Component Mounted");
  }, []);

  // COMPONENT DID UPDATE
  useEffect(() => {
    setGameCards(shuffle(gameCards));
    document.getElementById("current-score-keeper").innerText = score.length;
    document.getElementById("best-score-keeper").innerText = bestScore;
    // Add a timer so the rendering animation can play
    setTimeout(() => {
      document.querySelectorAll(".game-image").forEach((node) => {
        node.classList.remove("no-pointer-events");
      });
    }, 500);
    // Randomize css variables so the render animation can play
    document.querySelectorAll(".game-image").forEach((node) => {
      let locLeft = Math.floor(Math.random() * 100);
      locLeft *= Math.round(Math.random()) ? 1 : -1;
      let locRight = Math.floor(Math.random() * 100);
      locRight *= Math.round(Math.random()) ? 1 : -1;
      node.style.setProperty("--random-location-left", locLeft + "%");
      node.style.setProperty("--random-location-top", locRight + "%");
    });
    console.log("Component Updated");
  }, [score, bestScore, gameCards]);

  // Reset current score and update best score if possible
  const resetScore = () => {
    if (score.length > bestScore) {
      setBestScore(score.length);
    }
    setScore((arr) => []);
  };

  // Perform score check logic
  const manageScore = (e) => {
    let checkItem = true;
    // remove and add classes for its animations
    document.querySelectorAll(".game-image").forEach((node) => {
      node.classList.add("no-pointer-events");
      if (e.target.id === node.firstChild.id) {
        node.classList.remove("game-image-hover-animation");
        return false;
      }
      node.classList.remove("game-image-hover-animation");
      node.classList.add("selected-image-animation");
    });
    // Set timeout so the selected-image-animation can play out
    setTimeout(() => {
      score.forEach((item) => {
        if (e.target.id === item) {
          checkItem = false;
          resetScore();
        }
      });
      // If a duplicate has not been found add it to the score array
      if (checkItem)
        setScore((prevScoreList) => [...prevScoreList, e.target.id]);
    }, 500);
  };

  // removes the the first rendering animation onMouseEnter so the hover animation can play
  const removeIntroAnimation = (e) => {
    document.querySelectorAll(".game-image").forEach((node) => {
      node.classList.remove("game-image-render-animation");
      node.classList.add("game-image-hover-animation");
    });
  };

  return (
    <div className="game-images-container">
      {gameCards
        ? gameCards.map((image, index) => (
            <div
              className="game-image game-image-render-animation no-pointer-events"
              key={uniqid()}
              onMouseEnter={removeIntroAnimation}
            >
              <img
                src={image}
                alt={`image_N.${index}`}
                key={uniqid()}
                // remove the excess text for id
                id={image.replace("/static/media/", "").slice(0, -24)}
                onClick={manageScore}
              />
            </div>
          ))
        : console.log("No Cards Found")}
    </div>
  );
};
