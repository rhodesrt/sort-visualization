import Nav from "./components/Nav";
import SortInterface from "./components/SortInterface";
import "./componentStyles.css";
import { useState } from "react";

function App() {
  const [lengthOfArray, setLengthOfArray] = useState(null);
  const [generateNewArray, setGenerateNewArray] = useState(false);
  const [conductSort, setConductSort] = useState(null);

  return (
    <div className="app-container">
      <Nav
        setLengthOfArray={setLengthOfArray}
        setGenerateNewArray={setGenerateNewArray}
        setConductSort={setConductSort}
      />
      <SortInterface
        lengthOfArray={lengthOfArray}
        generateNewArray={generateNewArray}
        setGenerateNewArray={setGenerateNewArray}
        conductSort={conductSort}
        setConductSort={setConductSort}
      />
    </div>
  );
}

export default App;
