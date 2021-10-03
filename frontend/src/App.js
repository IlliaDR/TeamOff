import React from 'react';
import './App.css';
import Board from './components/Board';
import ButtonAppBar from './components/AppBar';
import Footer from './components/Footer';


const App = props => {
  return (
    <div>
      <ButtonAppBar />
      <div>
        <Board />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
export default App;