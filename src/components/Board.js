import React, { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
    xIsNext: true,
  });
  const status = `Next Player: ${state.xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    const updatedSquares = state.squares.slice();
    updatedSquares[i] = "X";
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
