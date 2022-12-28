import "./App.css";
import * as React from "react";
import { useSelector } from "react-redux";
import {
  selectFormBorrowers,
  selectFormLoans,
  selectFormStatus,
} from "./Redux/LendingFormSlice";
import { AppContainer } from "./Components/ContainerComponents/AppContainer";

function App() {
  const borrowers = useSelector(selectFormBorrowers);
  const loans = useSelector(selectFormLoans);
  const loadingStatus = useSelector(selectFormStatus);

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
