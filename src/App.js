import Nav from "./components/Nav";
import SortInterface from "./components/SortInterface";
import "./componentStyles.css";
import { useState } from "react";

function App() {
  const [lengthOfArray, setLengthOfArray] = useState(null);

  return (
    <div className="app-container">
      <Nav setLengthOfArray={setLengthOfArray} />
      <SortInterface lengthOfArray={lengthOfArray} />
    </div>
  );
}

export default App;
