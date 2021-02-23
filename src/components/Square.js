import React from "react";
import PropTypes from "prop-types";

export default function Square(props) {
  return (
    <button type="button" className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

Square.defaultProps = {
  value: null,
  onClick: () => {},
};
