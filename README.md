This is a sorting algorithm visualization tool inspired my Clement Mihailescu.
Hosted at https://rhodesrt.github.io/sort-visualization/

It is built with React, which offers some unique challenges related to React's rendering dependencies. In order to increase performance of any React App, it is most beneficial to reduce unnecessary re-renders due to state change. In a project with specifications like this, namely a large number of array iterations that may correspond to a higher order state change, there are potential bottlenecks in which one might induce unnecessary re-renders.
