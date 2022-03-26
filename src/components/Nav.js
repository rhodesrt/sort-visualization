import "../componentStyles.css";
import { useState, useEffect, useRef } from "react";

const Nav = (props) => {
  const toggleGenerateNewArray = () => {
    let selectableElements = Array.from(
      document.querySelectorAll(".selectable")
    );
    selectableElements.forEach((element) => {
      element.classList.remove("unclickable");
    });
    props.setGenerateNewArray(true);
  };

  const handleSortSelection = (e) => {
    let selectableElements = Array.from(
      document.querySelectorAll(".selectable")
    );
    selectableElements.forEach((element) => {
      element.classList.add("unclickable");
    });
    props.setConductSort(e.target.textContent);
  };

  return (
    <nav className="nav-container">
      <div>
        <h2 className="selectable" onClick={toggleGenerateNewArray}>
          Generate New Array
        </h2>
      </div>
      <div>
        <h2 className="selectable" id="arraySize-nav">
          Array Size
        </h2>
        <Slider setLengthOfArray={props.setLengthOfArray} />
      </div>
      <div>
        <h2 className="selectable" onClick={handleSortSelection}>
          Selection Sort
        </h2>
        <h2 className="selectable" onClick={handleSortSelection}>
          Bubble Sort
        </h2>
        <h2 className="selectable" onClick={handleSortSelection}>
          Merge Sort
        </h2>
        <h2 className="unclickable" onClick={handleSortSelection}>
          Quick Sort
        </h2>
      </div>
    </nav>
  );
};

export default Nav;

const Slider = (props) => {
  const sliderValue = useRef(Math.floor((70 - 25) / 2 + 25));
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
    <div id="slider" className="selectable">
      <input
        type="range"
        min="25"
        max="70"
        value={sliderValue.current}
        id="numberOfElements"
        onInput={handleSliderChange}
        onClick={handleSliderChange}
      />
    </div>
  );
};
