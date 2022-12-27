import logo from './static/logo.svg';
import './App.css';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectBorrowers, selectLoans, selectStatus } from './Redux/LendingSlice';

function App() {

  const borrowers = useSelector(selectBorrowers);
  const loans = useSelector(selectLoans);
  const loadingStatus = useSelector(selectStatus)

  console.log(loadingStatus);
  console.log(borrowers, loans);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
