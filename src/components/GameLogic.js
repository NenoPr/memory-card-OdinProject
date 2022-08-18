import React, { useState, useEffect } from "react"
import uniqid from "uniqid"
import './GameLogicStyle.css'


function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images[index] = r(item); });
    return images;
}
  
  const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
  console.log(images)
  images.forEach(image => {
    console.log(image)
    })
  


export const GameLogic = props => {

    const [gameCards, setGameCard] = useState(images)

    return (
        <div className="game-images-container">
            {gameCards.map((image, index) => 
                <div className="game-image"><img src={image} alt={`image_N.${index}`} key={uniqid()} /></div>)
            }
        </div>
    )
}