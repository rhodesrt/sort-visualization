import "../componentStyles.css";
import { useState, useEffect } from "react";

const SortInterface = (props) => {
  const [arrayToSort, setArrayToSort] = useState(() => {
    let array = [];
    for (let i = 0; i < 162; i++) {
      array[i] = Math.floor(Math.random() * 500 + 10);
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
          newArray.push(Math.floor(Math.random() * 500 + 10));
        }
      }
      return newArray;
    });
  }, [props.lengthOfArray]);

  return (
    <div className="sort-interface">
      {arrayToSort.map((barHeight, index, array) => {
        return <Bar height={barHeight} index={index} key={index} />;
      })}
    </div>
  );
};

export default SortInterface;

const Bar = (props) => {
  return <div className="bar" style={{ height: `${props.height}px` }}></div>;
};
