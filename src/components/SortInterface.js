import "../componentStyles.css";
import { useState, useEffect, useRef } from "react";
import { selectionSort } from "../sortAlgorithms/selection.js";

const SortInterface = (props) => {
  const [arrayToSort, setArrayToSort] = useState(() => {
    let array = [];
    for (let i = 0; i < 162; i++) {
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

  useEffect(() => {
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
  const [performAnotherIteration, setPerformAnotherIteration] = useState(0);
  const firstUnsortedIndex = useRef(null);
  const currentIteration = useRef(null);
  const shortest = useRef({
    height: null,
    index: null,
  });
  useEffect(() => {
    // If all elements sorted, end sorting process
    if (arrayToSort[arrayToSort.length - 1].sorted === true) {
      props.setConductSort(null);
    } else if (props.conductSort === "Selection Sort") {
      if (firstUnsortedIndex.current === null) {
        for (let i = 0; i < arrayToSort.length; i++) {
          if (arrayToSort[i].sorted === false) {
            firstUnsortedIndex.current = i;
            break;
          }
        }
      }

      setTimeout(() => {
        setArrayToSort(() => {
          if (currentIteration.current === null) {
            currentIteration.current = firstUnsortedIndex.current;
          } else {
            Array.from(document.querySelectorAll(".bar"))[
              currentIteration.current - 1
            ].classList.remove("highlighted");
          }
          Array.from(document.querySelectorAll(".bar"))[
            currentIteration.current
          ].classList.add("highlighted");
          if (shortest.current.height === null) {
            shortest.current.height =
              arrayToSort[currentIteration.current].height;
            shortest.current.index = currentIteration.current;
          } else if (
            arrayToSort[currentIteration.current].height <=
            shortest.current.height
          ) {
            shortest.current.height =
              arrayToSort[currentIteration.current].height;
            shortest.current.index = currentIteration.current;
          }
          if (currentIteration.current === arrayToSort.length - 1) {
            Array.from(document.querySelectorAll(".bar"))[
              currentIteration.current
            ].classList.remove("highlighted");
            let tempContainer = {
              height: arrayToSort[firstUnsortedIndex.current].height,
              sorted: arrayToSort[firstUnsortedIndex.current].sorted,
            };
            arrayToSort[firstUnsortedIndex.current].height =
              shortest.current.height;
            arrayToSort[firstUnsortedIndex.current].sorted = true;
            arrayToSort[shortest.current.index].height = tempContainer.height;
            if (firstUnsortedIndex.current < arrayToSort.length) {
              firstUnsortedIndex.current++;
            }
            currentIteration.current = null;
            shortest.current.height = null;
            shortest.current.index = null;
          } else {
            currentIteration.current++;
            setPerformAnotherIteration(performAnotherIteration + 1);
          }
          return arrayToSort;
        });
      }, 20);
    }
  }, [performAnotherIteration, arrayToSort, props.conductSort]);

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
