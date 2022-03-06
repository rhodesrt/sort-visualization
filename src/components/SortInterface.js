import "../componentStyles.css";
import { useState, useEffect, useRef } from "react";
import { selectionSort } from "../sortAlgorithms/selection.js";

const SortInterface = (props) => {
  const [arrayToSort, setArrayToSort] = useState(() => {
    let array = [];
    for (let i = 0; i < 47; i++) {
      array[i] = {};
      array[i].height = Math.floor(Math.random() * 500 + 10);
      array[i].sorted = false;
    }
    return array;
  });

  useEffect(() => {
    setArrayToSort(() => {
      let newArray = arrayToSort;
      let difference = parseInt(props.lengthOfArray) - arrayToSort.length;
      if (difference < 0) {
        for (let i = difference; i < 0; i++) {
          newArray.pop();
        }
      } else if (difference > 0) {
        for (let i = 0; i < difference; i++) {
          newArray.push({
            height: Math.floor(Math.random() * 500 + 10),
            sorted: false,
          });
        }
      }
      return newArray;
    });
  }, [props.lengthOfArray]);

  // Generate new array
  useEffect(() => {
    props.setConductSort(null);
    if (props.generateNewArray) {
      setArrayToSort(() => {
        let array = [];
        for (let i = 0; i < props.lengthOfArray; i++) {
          array[i] = {};
          array[i].height = Math.floor(Math.random() * 500 + 10);
          array[i].sorted = false;
        }
        return array;
      });
      props.setGenerateNewArray(false);
    }
  }, [props.generateNewArray]);

  // Conduct Sorting algorithms
  const firstUnsorted = useRef(null);
  const lastUnsorted = useRef(null);
  const arrayCopy = useRef(null);
  const [iterateAgain, setIterateAgain] = useState(0);
  const sortedArray = useRef(null);
  const currentI = useRef(null);
  const shortest = useRef({
    height: null,
    i: null,
  });
  useEffect(() => {
    if (props.conductSort === null) {
      console.log(`conductSort is null`);
      return;
    } else if (props.conductSort === "Selection Sort") {
      console.log(`conduct sort is selection`);
      let i = currentI.current;
      // if first unsorted index is null, get first unsorted index
      if (firstUnsorted.current === null) {
        for (let i = 0; i < arrayToSort.length; i++) {
          if (arrayToSort[i].sorted === false) {
            firstUnsorted.current = i;
            break;
          }
        }
      }
      currentI.current = firstUnsorted.current;
      let domArrayToSort = Array.from(document.querySelectorAll(".bar"));
      iterate(domArrayToSort);
      function iterate(domArray) {
        setTimeout(() => {
          // if previous element exists, remove its highlight
          let previousElement = domArray[currentI.current - 1];
          if (previousElement) {
            previousElement.classList.remove("highlighted");
          }
          // if current element exists, add its highlight
          let currentElement = domArray[currentI.current];
          if (currentElement) {
            currentElement.classList.add("highlighted");
          }
          // if shortest is null, shortest = array[currentI]
          if (shortest.current.height === null || shortest.current.i === null) {
            shortest.current = {
              height: arrayToSort[currentI.current].height,
              i: currentI.current,
            };
          }
          // if array[currentI] is shorter than shortest, record
          if (arrayToSort[currentI.current].height <= shortest.current.height) {
            shortest.current = {
              height: arrayToSort[currentI.current].height,
              i: currentI.current,
            };
          }
          // if end of array
          if (currentI.current === arrayToSort.length - 1) {
            // remove its highlight
            currentElement.classList.remove("highlighted");
            //  modify copy of arrayToSort
            let arrayCopy = [];
            for (let i = 0; i < arrayToSort.length; i++) {
              arrayCopy[i] = arrayToSort[i];
            }
            let tempStorageOfHeight = arrayCopy[firstUnsorted.current].height;
            arrayCopy[firstUnsorted.current] = {
              height: shortest.current.height,
              sorted: true,
            };
            arrayCopy[shortest.current.i].height = tempStorageOfHeight;
            //  if all are iterated through
            if (firstUnsorted.current === arrayToSort.length - 1) {
              Array.from(document.querySelectorAll(".selectable")).forEach(
                (element) => {
                  if (element.textContent === "Generate New Array") {
                    element.classList.remove("unclickable");
                  }
                }
              );
              firstUnsorted.current = null;
              props.setConductSort(null);
            } else {
              firstUnsorted.current = firstUnsorted.current + 1;
            }
            shortest.current = {
              height: null,
              i: null,
            };
            currentI.current = null;
            setArrayToSort(arrayCopy);
            return;
          } else {
            currentI.current = currentI.current + 1;
            iterate(domArray);
            return;
          }
        }, 10);
      }
    } else if (props.conductSort === "Bubble Sort") {
      console.log("conduct sort is bubble sort");
      setTimeout(() => {
        if (arrayCopy.current === null) {
          arrayCopy.current = [];
          for (let i = 0; i < props.lengthOfArray; i++) {
            arrayCopy.current[i] = {
              height: arrayToSort[i].height,
              sorted: false,
            };
          }
        }
        if (lastUnsorted.current === null) {
          for (let i = props.lengthOfArray - 1; i > 0; i--) {
            if (arrayCopy.current[i].sorted === false) {
              lastUnsorted.current = i;
              break;
            }
          }
        }
        if (firstUnsorted.current === null) {
          for (let i = 0; i < props.lengthOfArray; i++) {
            if (arrayCopy.current[i].sorted === false) {
              firstUnsorted.current = i;
              break;
            }
          }
        }
        if (currentI.current === null) {
          currentI.current = firstUnsorted.current;
        }
        if (sortedArray.current === null) {
          sortedArray.current = arrayCopy.current.map(
            (element) => element.height
          );
          sortedArray.current.sort();
        }
        function switchElements(currentIteration) {
          let bigger = arrayCopy.current[currentIteration].height;
          arrayCopy.current[currentIteration].height =
            arrayCopy.current[currentIteration + 1].height;
          arrayCopy.current[currentIteration + 1].height = bigger;
          if (
            sortedArray.current[currentIteration].height ===
            arrayCopy.current[currentIteration].height
          ) {
            arrayCopy.current[currentIteration].sorted = true;
          }
          if (
            sortedArray.current[currentIteration + 1].height ===
            arrayCopy.current[currentIteration + 1].height
          ) {
            arrayCopy.current[currentIteration + 1].sorted = true;
          }
        }
        function handleHighlights(currentIteration) {
          let domArray = Array.from(document.querySelectorAll(".bar"));
          domArray[currentIteration].classList.add("highlighted");
          if (domArray[currentIteration + 1]) {
            domArray[currentIteration + 1].classList.add("highlighted");
          }
          setTimeout(() => {
            domArray[currentIteration].classList.remove("highlighted");
            if (domArray[currentIteration + 1]) {
              domArray[currentIteration + 1].classList.remove("highlighted");
            }
          }, 40);
        }
        function resetRefs() {
          currentI.current = null;
          lastUnsorted.current = null;
          firstUnsorted.current = null;
        }
        let i = currentI.current;
        let allSorted = true;
        for (let y = 0; y < props.lengthOfArray; y++) {
          if (arrayToSort[y].sorted === false) {
            allSorted = false;
            break;
          }
        }
        if (allSorted === true) {
          props.setConductSort(null);
        } else {
          handleHighlights(i);
          if (i === lastUnsorted.current - 1) {
            if (arrayToSort[i].height >= arrayToSort[i + 1].height) {
              console.log(`switch: ${i}`);
              switchElements(i);
              resetRefs();
              setArrayToSort(arrayCopy.current);
            } else {
              console.log(`no switch: ${i}`);
              resetRefs();
              setIterateAgain(iterateAgain + 1);
            }
          } else {
            if (arrayToSort[i].height >= arrayToSort[i + 1].height) {
              console.log(`switch: ${i}`);
              switchElements(i);
              currentI.current = i + 1;
              setArrayToSort(arrayCopy.current);
            } else {
              console.log(`no switch: ${i}`);
              currentI.current = i + 1;
              setIterateAgain(iterateAgain + 1);
            }
          }
        }
      }, 40);
    }
  }, [arrayToSort, props.conductSort, iterateAgain]);

  return (
    <div className="sort-interface">
      {arrayToSort.map((bar, index, array) => {
        return (
          <Bar
            height={bar.height}
            sorted={bar.sorted}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default SortInterface;

const Bar = (props) => {
  if (!props.sorted) {
    return (
      <div
        className="bar"
        id={props.index}
        style={{ height: `${props.height}px` }}
      ></div>
    );
  } else if (props.sorted) {
    return (
      <div
        className="bar sorted"
        id={props.index}
        style={{ height: `${props.height}px` }}
      ></div>
    );
  }
};
