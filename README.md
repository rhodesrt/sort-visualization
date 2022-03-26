This is a sorting algorithm visualization tool inspired my Clement Mihailescu.
Hosted at https://rhodesrt.github.io/sort-visualization/

It is built with React, which offers some unique challenges related to React's rendering dependencies. In order to increase performance of any React App, it is most beneficial to reduce unnecessary re-renders due to state change. In a project with specifications like this, namely a large number of array iterations that may correspond to a higher order state change, there are potential bottlenecks in which one might induce unnecessary re-renders.

- When resizing the array, it is tempting to create a new array upon each resize action, but one quickly realizes that, due to the resize bar being very sensitive, you may be asking the client to iterate over the entire array length, replacing the old array with the new one and at the same time re-rendering the app. The programmer can increase performance here by instead popping and pushing elements off of the array corresponding to the difference in length between the current array length and the desired array length.

As it currently stands, selection, bubble, and merge sorts have been implemented. Quick sort will be implemented imminently.
