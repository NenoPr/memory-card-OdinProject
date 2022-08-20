import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { getImagesFromFolder, shuffle } from "./GetImages";
import { VictoryScreen } from "./VictoryScreen";
import "./GameLogicStyle.css";

const GameLogic = (difficulty) => {
  const [score, setScore] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  console.log(difficulty);
  const [gameCards, setGameCards] = useState(getImagesFromFolder(difficulty));
  const [winCondition, setWinCondition] = useState(false)

  useEffect(() => {
    console.log("updated")
    setGameCards(getImagesFromFolder(difficulty))
  }, [difficulty])

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
    console.log("GameLogic Component Mounted");

    // return () => {
    //   console.log("GameLogic Component Unmounted")
    // }
  }, []);

  // COMPONENT DID UPDATE
  useEffect(() => {
    console.log("gameCards", gameCards);
    setGameCards(shuffle(gameCards, score));
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
    console.log("GameLogic Component Updated");
  }, [score, bestScore, gameCards]);

  // Reset current score and update best score if possible
  const resetScore = () => {
    if (score.length > bestScore) {
      document
        .getElementById("best-score-keeper")
        .classList.add("score-change-animation");
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
        renderMiss(e);
        node.classList.remove("game-image-hover-animation");
        return false;
      }
      node.classList.remove("game-image-hover-animation");
      node.classList.add("selected-image-animation");
    });
    // Set timeout so the selected-image-animation can play out
    setTimeout(() => {
      document
        .getElementById("current-score-keeper")
        .classList.add("score-change-animation");
      score.forEach((item) => {
        if (e.target.id === item) {
          checkItem = false;
          resetScore();
          document
            .getElementById("current-score-keeper")
            .classList.remove("score-change-animation");
          document
            .getElementById("current-score-keeper")
            .classList.add("score-change-animation-red");
          return true;
        }
      });
      // If a duplicate has not been found add it to the score array
      if (checkItem)
        setScore((prevScoreList) => [...prevScoreList, e.target.id]);
    }, 500);
    if (score.length === gameCards.length) {
      console.log("You Win!")
      setWinCondition(true)
    }
    document
      .getElementById("current-score-keeper")
      .classList.remove("score-change-animation-red");
    document
      .getElementById("current-score-keeper")
      .classList.remove("score-change-animation");
    document
      .getElementById("best-score-keeper")
      .classList.remove("score-change-animation");
  };

  // removes the the first rendering animation onMouseEnter so the hover animation can play
  const removeIntroAnimation = (e) => {
    document.querySelectorAll(".game-image").forEach((node) => {
      node.classList.remove("game-image-render-animation");
      node.classList.add("game-image-hover-animation");
    });
  };

  // Renders the hit and miss animations on the selected card
  const renderMiss = (e) => {
    // e.target.nextElementSibling.nextElementSibling === miss-card
    // e.target.nextElementSibling.nextElementSibling.nextElementSibling === hit-card
    score.forEach((item) => {
      if (e.target.id === item) {
        e.target.nextElementSibling.nextElementSibling.style.visibility =
          "unset";
        e.target.nextElementSibling.nextElementSibling.classList.add(
          "miss-card-animation"
        );
        return true;
      }
    });
    if (
      !e.target.nextElementSibling.nextElementSibling.classList.contains(
        "miss-card-animation"
      )
    ) {
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.style.visibility =
        "unset";
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
        "hit-card-animation"
      );
    }
    setTimeout(() => {
      e.target.nextElementSibling.nextElementSibling.style.visibility =
        "hidden";
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.style.visibility =
        "hidden";
      e.target.nextElementSibling.nextElementSibling.classList.remove(
        "miss-card-animation"
      );
      e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
        "hit-card-animation"
      );
    }, 700);
  };

  //displays the characters name when entering card element
  const displayCharName = (e) => {
    console.log(e.target.id);
    let idName = e.target.id;
    console.log(idName);
    let name = "";
    for (let i = 10; i < idName.length; i++) {
      if (idName[i] === "_") break;
      name += idName[i];
    }
    e.target.nextElementSibling.innerText = name;
    console.log(name);
  };

  // removes the characters name when the mouse leaves the card element
  const removeCharName = (e) => {
    e.target.nextElementSibling.innerText = "";
  };

  return (
    <div className="game-images-container">
      {gameCards
        ? gameCards.slice(0, 12).map((image, index) => (
            <div
              className="game-image game-image-render-animation no-pointer-events"
              key={uniqid()}
              onMouseEnter={removeIntroAnimation}
            >
              <img
                onMouseEnter={displayCharName}
                onMouseLeave={removeCharName}
                src={image}
                alt={`image_N.${index}`}
                key={uniqid()}
                // remove the excess text for id
                id={image.replace("/static/media/", "").slice(0, -25)}
                onClick={manageScore}
              />
              <div className="char-name-display"></div>
              <div className="miss-card">Miss!</div>
              <div className="hit-card">Nice!</div>
            </div>
          ))
        : console.log("No Cards Found")}
        <VictoryScreen name={winCondition} />
    </div>
  );
};

export default GameLogic;
