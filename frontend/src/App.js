import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { apiLinks } from './components/data/apiLinks';
import BoardList from './components/boardList';

function App() {
  const [boards, setBoards] = useState([]);

  function fetchBoardsHandler(){
    fetch(apiLinks.API_BOARDS)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      const transformedBoards = data.map (boardsData =>{
        return {
          id: boardsData.boardId,
          title: boardsData.boardName
        };
      });
      setBoards(transformedBoards);
    });
  }

/*   useEffect(() => {
    fetch(apiLinks.API_BOARDS)
      .then(response => response.json())
      .then(data => console.log(data));
    //empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []); */

  return (
    <div>
      <button onClick={fetchBoardsHandler}>GetBoards</button>
      <BoardList boards={boards} />
    </div>
  );
}
export default App;