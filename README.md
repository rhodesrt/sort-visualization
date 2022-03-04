This is a sorting algorithm visualization tool inspired my Clement Mihailescu.

I am building it with React, which offers some unique challenges related to React's rendering dependencies. In order to increase performance of any React App, it is most beneficial to reduce unnecessary re-renders due to state change. In a project with specifications like this, namely a large number of array iterations that may correspond to a higher order state change, there are a few bottlenecks in which one might accidentally induce unnecessary re-renders.

1. When resizing the array, it is tempting to create a new array upon each resize action, but one quickly realizes that, due to the resize bar being very sensitive, you may be asking the client to iterate over the array length, replacing the old array with the new one and at the same time re-rendering the app. The programmer can increase performance here by instead popping and pushing elements off of the array in order to increase or decrease the array length.

2. When the sorting algorithms are being conducted, there is a lot of array iteration occurring. In order to visualize this process, I have to make each array iteration asynchronous or else it would look like the array is instantly sorted. Asynchronous array iteration with React's useEffect hook can be a little tricky. In this case, I have made my iterating function recursive with a base case that the array iteration is complete. Only once I have iterated through the entire array do I call a state change. So, though there are n opportunities to call a state change during array iteration, only one state change occurs per iteration.

As it currently stands, only selection sort has been implemented, but each algorithm will soon follow, so stay tuned.
