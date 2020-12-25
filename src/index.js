import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let board = [];
    for (let i = 0; i < 9; i+=3) {
      board.push(
        <div key={i} className="board-row">
          {this.renderSquare(i)}
          {this.renderSquare(i + 1)}
          {this.renderSquare(i + 2)}
        </div>
      );
    }

    return <div>{board}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: '',
      }],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares,
        position: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  sortHistory() {
    this.setState({
      isDescending: !this.state.isDescending,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner ? `Winner ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`; 

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move} with ${step.squares[step.position]} on ${getCoordinates(step.position)}` : `Go to game start`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {move  === this.state.stepNumber ? <b>{desc}</b> : desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <ol>{this.state.isDescending ? moves : moves.reverse()}</ol>
          <button onClick={() => this.sortHistory()}>
            Sort by: {this.state.isDescending ? "Descending" : "Ascending"}
          </button>

        </div>
      </div>
    );
  }
}


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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function getCoordinates(i) {
  switch(i) {
    case 0:
      return '(1, 1)';
    case 1:
      return '(1, 2)';
    case 2:
      return '(1, 3)';
    case 3:
      return '(2, 1)';
    case 4:
      return '(2, 2)';
    case 5:
      return '(2, 3)';
    case 6:
      return '(3, 1)';
    case 7:
      return '(3, 2)';
    default:
      return '(3, 3)';
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));