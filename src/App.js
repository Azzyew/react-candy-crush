import React, { useState, useEffect } from 'react';
import './App.css';
import Vi from './images/Vi.png';
import Jinx from './images/Jinx.png';
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import html from './images/html.png';
import js from './images/js.png';
import ts from './images/ts.png';
import ruby from './images/ruby.png';
import node from './images/node.png';
import react from './images/react.png';
import blank from './images/blank.png';

const boardWidth = 8;
const candyColors = [
  ruby,
  html,
  js,
  node,
  ts,
  react
]

const App = () => {

    const [currentCandyArrangement, setCurrentCandyArrangement] = useState([]);
    const [candyBeingDragged, setCandyBeingDragged] = useState(null);
    const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);

    const [currentScore, setCurrentScore] = useState();

    const createBoard = () => {
        const randomCandyArrangement = [];
            for (let i = 0; i < boardWidth * boardWidth; i++) {
                const randomCandy = candyColors[Math.floor(Math.random() * candyColors.length)];
                randomCandyArrangement.push(randomCandy);
            }
            setCurrentCandyArrangement(randomCandyArrangement);
    }

    const checkColumnOfFive = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFive = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3, i + boardWidth * 4];
            const assignedCandy = currentCandyArrangement[i];
            const isBlank = currentCandyArrangement[i] === blank;

            if(columnOfFive.every(candy => currentCandyArrangement[candy] === assignedCandy && !isBlank)){
                columnOfFive.forEach(candy => currentCandyArrangement[candy] = blank);
                return true;
            }
        }
    }

    const checkRowOfFive = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
            const assignedCandy = currentCandyArrangement[i];
            const invalidCandy = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55, 61, 62, 63, 64];
            const isBlank = currentCandyArrangement[i] === blank;

            if (invalidCandy.includes(i)) continue

            if(rowOfFive.every(candy => currentCandyArrangement[candy] === assignedCandy && !isBlank)){
                rowOfFive.forEach(candy => currentCandyArrangement[candy] = blank);
                return true;
            }
        }
    }

    const checkColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3];
            const assignedCandy = currentCandyArrangement[i];
            const isBlank = currentCandyArrangement[i] === blank;

            if(columnOfFour.every(candy => currentCandyArrangement[candy] === assignedCandy && !isBlank)){
                columnOfFour.forEach(candy => currentCandyArrangement[candy] = blank);
                return true;
            }
        }
    }

    const checkRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3];
            const assignedCandy = currentCandyArrangement[i];
            const invalidCandy = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
            const isBlank = currentCandyArrangement[i] === blank;

            if (invalidCandy.includes(i)) continue

            if(rowOfFour.every(candy => currentCandyArrangement[candy] === assignedCandy && !isBlank)){
                rowOfFour.forEach(candy => currentCandyArrangement[candy] = blank);
                return true;
            }
        }
    }

    const checkColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + boardWidth, i + boardWidth * 2];
            const assignedCandy = currentCandyArrangement[i];
            const isBlank = currentCandyArrangement[i] === blank;

            if(columnOfThree.every(candy => currentCandyArrangement[candy] === assignedCandy && !isBlank)){
                columnOfThree.forEach(candy => currentCandyArrangement[candy] = blank);
                return true;
            }
        }
    }

    const checkRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const assignedCandy = currentCandyArrangement[i];
            const invalidCandy = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
            const isBlank = currentCandyArrangement[i] === blank;

            if (invalidCandy.includes(i)) continue

            if(rowOfThree.every(candy => currentCandyArrangement[candy] === assignedCandy && !isBlank)){
                rowOfThree.forEach(candy => currentCandyArrangement[candy] = blank);
                return true;
            }
        }
    }
  
    const moveCandyToSquareBelow = () => {
        for(let i = 0; i <= 55; i++) {

            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if(isFirstRow && currentCandyArrangement[i] === blank) {
                let newRandomNumber = Math.floor(Math.random() * candyColors.length);
                currentCandyArrangement[i] = candyColors[newRandomNumber];
            }

            if((currentCandyArrangement[i + boardWidth]) === blank) {
                currentCandyArrangement[i + boardWidth] = currentCandyArrangement[i];
                currentCandyArrangement[i] = blank;
            }
        }
    }

    //Candy actions
    const dragStart = (e) => {
        setCandyBeingDragged(e.target);
    }

    const dragDrop = (e) => {
        setCandyBeingReplaced(e.target);
    }

    const dragEnd = (e) => {
        const candyBeingDraggedId = parseInt(candyBeingDragged.getAttribute('data-id'));
        const candyBeingReplacedId = parseInt(candyBeingReplaced.getAttribute('data-id'));

        currentCandyArrangement[candyBeingReplacedId] = candyBeingDragged.getAttribute('src');
        currentCandyArrangement[candyBeingDraggedId] = candyBeingReplaced.getAttribute('src');

        const validMoves = [
            candyBeingDraggedId - 1,
            candyBeingDraggedId + 1,
            candyBeingDraggedId - boardWidth,
            candyBeingDraggedId + boardWidth
        ]

        const validMove = validMoves.includes(candyBeingReplacedId);
        
        const isColumnOfFour = checkColumnOfFour();
        const isRowOfFour = checkRowOfFour();
        const isColumnOfThree = checkColumnOfThree();
        const isRowOfThree = checkRowOfThree();

        if(candyBeingDraggedId && validMove && (isColumnOfFour || isRowOfFour || isColumnOfThree || isRowOfThree)){
            setCandyBeingDragged(null);
            setCandyBeingReplaced(null);
        } else {
            currentCandyArrangement[candyBeingReplacedId] = candyBeingReplaced.getAttribute('src');
            currentCandyArrangement[candyBeingDraggedId] = candyBeingDragged.getAttribute('src');
            setCurrentCandyArrangement([...currentCandyArrangement]);
        }
    }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
        checkColumnOfFive();
        checkRowOfFive();
        checkColumnOfFour();
        checkRowOfFour();
        checkColumnOfThree();
        checkRowOfThree();
        moveCandyToSquareBelow();
        setCurrentCandyArrangement([...currentCandyArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkColumnOfFive, checkRowOfFive, checkColumnOfFour, checkColumnOfThree, checkRowOfFour, checkRowOfThree, moveCandyToSquareBelow, currentCandyArrangement])

  return (
    <div className="App">
        <div className="board">
            {currentCandyArrangement.map((candyColor, index) => (
                <img
                key={index}
                src={candyColor}
                alt={candyColor}
                data-id={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
                />
            ))}
        </div>
    </div>
  );
}

export default App;
