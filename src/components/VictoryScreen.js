import React, { useState, useEffect } from "react";
import "./VictoryScreen.css"


export const VictoryScreen = (gameWin) => {
    if (!gameWin) {
        return (
            <div id="victory-screen">Congratulations! You Won!</div>
        )
    } else return null
}