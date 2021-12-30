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

    const checkColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + boardWidth, i + boardWidth * 2, i + boardWidth * 3];
            const assignedCandy = currentCandyArrangement[i];

            if(columnOfFour.every(candy => currentCandyArrangement[candy] === assignedCandy)){
                columnOfFour.forEach(candy => currentCandyArrangement[candy] = '');
                return true;
            }
        }
    }

    const checkRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2];
            const assignedCandy = currentCandyArrangement[i];
            const invalidCandy = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

            if (invalidCandy.includes(i)) continue

            if(rowOfFour.every(candy => currentCandyArrangement[candy] === assignedCandy)){
                rowOfFour.forEach(candy => currentCandyArrangement[candy] = '');
                return true;
            }
        }
    }

    const checkColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + boardWidth, i + boardWidth * 2];
            const assignedCandy = currentCandyArrangement[i];

            if(columnOfThree.every(candy => currentCandyArrangement[candy] === assignedCandy)){
                columnOfThree.forEach(candy => currentCandyArrangement[candy] = '');
                return true;
            }
        }
    }

    const checkRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2];
            const assignedCandy = currentCandyArrangement[i];
            const invalidCandy = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];

            if (invalidCandy.includes(i)) continue

            if(rowOfThree.every(candy => currentCandyArrangement[candy] === assignedCandy)){
                rowOfThree.forEach(candy => currentCandyArrangement[candy] = '');
                return true;
            }
        }
    }
  
    const moveCandyToSquareBelow = () => {
        for(let i = 0; i <= 55; i++) {

            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const isFirstRow = firstRow.includes(i);

            if(isFirstRow && currentCandyArrangement[i] === '') {
                let newRandomNumber = Math.floor(Math.random() * candyColors.length);
                currentCandyArrangement[i] = candyColors[newRandomNumber];
            }

            if((currentCandyArrangement[i + boardWidth]) === '') {
                currentCandyArrangement[i + boardWidth] = currentCandyArrangement[i];
                currentCandyArrangement[i] = '';
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
        console.log(candyBeingDraggedId);
        console.log(candyBeingReplacedId);

        currentCandyArrangement[candyBeingReplacedId] = candyBeingDragged.style.backgroundColor;
        currentCandyArrangement[candyBeingDraggedId] = candyBeingReplaced.style.backgroundColor;

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
            currentCandyArrangement[candyBeingReplacedId] = candyBeingReplaced.style.backgroundColor;
            currentCandyArrangement[candyBeingDraggedId] = candyBeingDragged.style.backgroundColor;
        }
    }

  useEffect(() => {
    createBoard();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
        checkColumnOfFour();
        checkColumnOfThree();
        checkRowOfFour();
        checkRowOfThree();
        moveCandyToSquareBelow();
        setCurrentCandyArrangement([...currentCandyArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkColumnOfFour, checkColumnOfThree, checkRowOfFour, checkRowOfThree, moveCandyToSquareBelow, currentCandyArrangement])

  return (
    <div className="App">
        <div className="board">
            {currentCandyArrangement.map((candyColor, index) => (
                <img
                key={index}
                style={{backgroundColor: candyColor}}
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
