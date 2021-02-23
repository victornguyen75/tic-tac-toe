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

export default function Game() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
  });

  const history = state.history;
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);
  let status = "";
  if (["X", "O"].includes(winner)) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${state.xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    const updatedSquares = current.squares.slice();
    updatedSquares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat({
        squares: updatedSquares,
      }),
      xIsNext: !state.xIsNext,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol></ol>
      </div>
    </div>
  );
}
