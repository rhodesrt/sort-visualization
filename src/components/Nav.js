import "../componentStyles.css";
import { useState, useEffect, useRef } from "react";

const Nav = (props) => {
  const toggleGenerateNewArray = () => {
    props.setGenerateNewArray(true);
  };

  const handleSortSelection = (e) => {
    props.setConductSort(e.target.textContent);
  };

  return (
    <nav className="nav-container">
      <div>
        <h2 onClick={toggleGenerateNewArray}>Generate New Array</h2>
      </div>
      <div>
        <h2 id="arraySize-nav">Array Size</h2>
        <Slider setLengthOfArray={props.setLengthOfArray} />
      </div>
      <div>
        <h2 onClick={handleSortSelection}>Selection Sort</h2>
        <h2 onClick={handleSortSelection}>Bubble Sort</h2>
        <h2 onClick={handleSortSelection}>Merge Sort</h2>
        <h2 onClick={handleSortSelection}>Quick Sort</h2>
      </div>
    </nav>
  );
};

export default Nav;

const Slider = (props) => {
  const sliderValue = useRef(Math.floor((300 - 25) / 2 + 25));
  const handleSliderChange = (e) => {
    sliderValue.current = e.target.value;
    props.setLengthOfArray(parseInt(e.target.value));
  };

  useEffect(() => {
    props.setLengthOfArray(
      parseInt(document.querySelector("#numberOfElements").value)
    );
  }, []);

  return (
    <div>
      <input
        type="range"
        min="25"
        max="300"
        value={sliderValue.current}
        id="numberOfElements"
        onInput={handleSliderChange}
      />
    </div>
  );
};
