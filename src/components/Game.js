import React, { useState } from "react";
import Board from "./Board";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function getCoordinates(i) {
  switch (i) {
    case 0:
      return "(1, 1)";
    case 1:
      return "(1, 2)";
    case 2:
      return "(1, 3)";
    case 3:
      return "(2, 1)";
    case 4:
      return "(2, 2)";
    case 5:
      return "(2, 3)";
    case 6:
      return "(3, 1)";
    case 7:
      return "(3, 2)";
    default:
      return "(3, 3)";
  }
}

export default function Game() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        position: "",
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  let status = "";
  if (["X", "O"].includes(winner)) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${state.xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = state.history.slice(0, state.stepNumber + 1);
    const updated = newHistory[newHistory.length - 1];
    const updatedSquares = updated.squares.slice();
    if (calculateWinner(updatedSquares) || updatedSquares[i]) {
      return;
    }

    updatedSquares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: newHistory.concat({
        squares: updatedSquares,
        position: i,
      }),
      stepNumber: newHistory.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step) => {
    setState({
      history,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {history.map((step, move) => {
            const desc = move
              ? `Go to move #${move} with ${
                  step.squares[step.position]
                } on ${getCoordinates(step.position)}`
              : "Go to game start";

            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
