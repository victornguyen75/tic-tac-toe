import React from "react";
import PropTypes from "prop-types";

export default function Square(props) {
  return (
    <button
      type="button"
      className={`square ${props.isWinning ? "winning" : null}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  isWinning: PropTypes.bool,
  onClick: PropTypes.func,
};

Square.defaultProps = {
  value: null,
  isWinning: false,
  onClick: () => {},
};
