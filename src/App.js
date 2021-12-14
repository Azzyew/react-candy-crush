import React, { useState, useEffect } from 'react';
import './App.css';

const boardWidth = 8;
const candyColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
]

const App = () => {

  const [currentCandyArrangement, setCurrentCandyArrangement] = useState([]);

  const createBoard = () => {

    const randomCandyArrangement = [];
    for (let i = 0; i < boardWidth * boardWidth; i++) {
      const randomCandy = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomCandyArrangement.push(randomCandy);
    }
    setCurrentCandyArrangement(randomCandyArrangement);
  }

  useEffect(() => {
    createBoard();
  }, [])
  

  return (
    <div className="App">
      <div className="board">
        {currentCandyArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{backgroundColor: candyColor}}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
