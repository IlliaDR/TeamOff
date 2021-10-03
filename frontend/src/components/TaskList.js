import React from 'react';
import Button from '@mui/material/Button';

import './TaskList.css';

const TaskList = props => {
  return (
    <section className="task-list">
      <h2>Board's Tasks</h2>
      <ul>
        {props.Tasks.map(tsk => (
          <li key={tsk.id}>
            <div>
              <h3>{tsk.title}</h3>
              <p>{tsk.description}</p>
              <p>User{tsk.userId}</p>
              <p>Status{tsk.statusId}</p>
              
              <><Button key={tsk.id} onClick={props.onEditItem.bind(this, tsk.id)}>Edit</Button></>
              <><Button color='secondary' key={tsk.id} onClick={props.onRemoveItem.bind(this, tsk.id)}>Delete</Button></>
              
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TaskList;