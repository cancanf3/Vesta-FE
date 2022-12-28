import logo from "./static/logo.svg";
import "./App.css";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectBorrowers,
  selectLoans,
  selectStatus,
} from "./Redux/LendingSlice";
import { AppContainer } from "./Components/ContainerComponents/AppContainer";

function App() {
  const borrowers = useSelector(selectBorrowers);
  const loans = useSelector(selectLoans);
  const loadingStatus = useSelector(selectStatus);

  console.log(loadingStatus);
  console.log(borrowers, loans);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Vesta Project </h1>
      </header>

      <AppContainer />
    </div>
  );
}

export default App;
