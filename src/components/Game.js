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
      return { winningPlayer: squares[a], winningLine: lines[i] };
    }
  }

  return { winningPlayer: null, winningLine: null };
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
    isDescending: true,
  });

  const history = state.history;
  const current = history[state.stepNumber];
  const { winningPlayer, winningLine } = calculateWinner(current.squares); // *
  let status = "";
  if (["X", "O"].includes(winningPlayer)) {
    status = `Winner: ${winningPlayer}`;
  } else {
    status = `Next Player: ${state.xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = state.history.slice(0, state.stepNumber + 1);
    const updated = newHistory[newHistory.length - 1];
    const updatedSquares = updated.squares.slice();
    if (calculateWinner(updatedSquares).winningPlayer || updatedSquares[i]) {
      // *
      return;
    }

    updatedSquares[i] = state.xIsNext ? "X" : "O";
    setState({
      ...state,
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
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  const sortHistory = () => {
    setState({
      ...state,
      isDescending: !state.isDescending,
    });
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} with ${
          step.squares[step.position]
        } on ${getCoordinates(step.position)}`
      : "Go to game start";

    return (
      <li key={move}>
        <button type="button" onClick={() => jumpTo(move)}>
          {move === state.stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningLine={winningLine}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button type="button" onClick={() => sortHistory()}>
          Sort by {state.isDescending ? "Descending" : "Ascending"}
        </button>
        <ol>{state.isDescending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}
