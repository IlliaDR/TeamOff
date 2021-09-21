import React from 'react';

import Board from './board';
import classes from './boardList.module.css'

const BoardList = (props) => {
  return (
    <ul className={classes['board-list']}>
      {props.boards.map((board) => (
        <Board
          key={board.id}
          title={board.title}
        />
      ))}
    </ul>
  );
};

export default BoardList;
