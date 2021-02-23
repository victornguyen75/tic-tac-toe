import React, { useState } from "react";
import Square from "./Square";

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

export default function Board() {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  const winner = calculateWinner(state.squares);

  let status = "";
  if (["X", "O"].includes(winner)) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${state.xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    if (calculateWinner(state.squares) || state.squares[i]) {
      return;
    }

    const updatedSquares = state.squares.slice();
    updatedSquares[i] = state.xIsNext ? "X" : "O";
    setState({ squares: updatedSquares, xIsNext: !state.xIsNext });
  };

  const renderSquare = (i) => {
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
}
