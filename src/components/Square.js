import React from "react";

export default function Square(props) {
  return (
    <button type="button" className="square">
      {props.value}
    </button>
  );
}
