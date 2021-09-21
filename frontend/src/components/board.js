import React from 'react';
import classes from './board.module.css'

const Board = (props) => {
  return (
    <li className={classes.board}>
      <h2>{props.title}</h2>
    </li>
  );
};

export default Board;
