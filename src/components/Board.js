import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";

export default function Board(props) {
  let board = [];
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        isWinning={props.winningLine.includes(i)}
        onClick={() => props.onClick(i)}
      />
    );
  };

  for (let i = 0; i < 9; i += 3) {
    board.push(
      <div key={i} className="board-row">
        {renderSquare(i)}
        {renderSquare(i + 1)}
        {renderSquare(i + 2)}
      </div>
    );
  }

  return <>{board}</>;
}

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.string),
  winningLine: PropTypes.arrayOf(PropTypes.number),
  onClick: PropTypes.func,
};

Board.defaultProps = {
  squares: Array(9).fill(null),
  winningLine: PropTypes.arrayOf(PropTypes.number),
  onClick: () => {},
};
