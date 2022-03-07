This is a sorting algorithm visualization tool inspired my Clement Mihailescu.
Hosted at https://rhodesrt.github.io/sort-visualization/

I am building it with React, which offers some unique challenges related to React's rendering dependencies. In order to increase performance of any React App, it is most beneficial to reduce unnecessary re-renders due to state change. In a project with specifications like this, namely a large number of array iterations that may correspond to a higher order state change, there are a few bottlenecks in which one might accidentally induce unnecessary re-renders.

- When resizing the array, it is tempting to create a new array upon each resize action, but one quickly realizes that, due to the resize bar being very sensitive, you may be asking the client to iterate over the array length, replacing the old array with the new one and at the same time re-rendering the app. The programmer can increase performance here by instead popping and pushing elements off of the array in order to increase or decrease the array length.

As it currently stands, only selection sort and bubble sort have been implemented, but each algorithm will soon follow, so stay tuned.
