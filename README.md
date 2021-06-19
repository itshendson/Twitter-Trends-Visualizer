# Twitter Trends Visualizer

## Description
Twitter Trends Visualizer is a web application to see what topics are trending around the world. Click anywhere on the world map to see a list of trending topics in that region updated from Twitter.

## Technologies
- Google Maps Platform
- Twitter Developer Platform
- JavaScript
- Node.js
- Express.js
- Heroku

## How It Works
Google Maps Platform provides the interactive map itself. When the user clicks a point on the map, its geolocation is collected. The geolocation is broken up into a latitude and longitude and passed to a proxy server. The proxy server was made with Node.js and Express.js. A 'get' request with the latitude and longitude is made from the proxy server to Twitter API, specifically to the 'trends/closest' endpoint. Twitter API responds with the closest location it has trending data for. The woeid (stands for 'where on earth id') is collected from the closest location and a final 'get' request is made to Twitter API, this time to the trends/place endpoint. Twitter API responds with a list of 50 trending topics for the specified woeid. The response of trending topics is passed to the front end and displayed on the map. 

## Challenges and Unique Elements
The most difficult part of this project was surprisingly not the coding itself. Rather, it was figuring out how the different systems and technologies glued together. Initially, I thought I could make an API call from the frontend as I have done so in previous projects. What I did not realize was that modern browser's have a 'same-origin policy' to protect against malicious activities. This frustratingly (and later understandably) made it impossible for me to make an API call from the browser to Twitter API. After many videos watched and articles read, I came to the realization that I would have to make a backend (hence needing to learn Node.js and Express.js). The plan of attack was that I would grab the geolocation from the frontend, pass the data to the backend server that I made, so that the server (not the browser) would make the API call. Once I get the response, I would simply pass the newly obtained data from the backend to the frontend. 

## Conclusion and Future Plans
I enjoyed this project very much. It was one of my favourite projects to make simply because I got to make the whole thing from start to finish, frontend to backend. It also made me see the potential of what else I could do with the help of different Developer Platforms and Node.js.

In the future (whenever I get the chance) I plan on overlaying a heatmap atop my application to indicate the intensity of specific trending keywords. For instance, if I were to search the word 'Trump' (I don't mean to get political but this is such a good example), would the heatmap indicate that the word is trending more intensely in Los Angeles or Austin, Texas? Would the search term and heatmap yield any interesting discoveries? What if I could also add a time component to my project so that not only could I see *where* and *how intense* a search term is but also *when* a search term started gaining traction? Will the search term 'Trump' start trending first in San Francisco or Lousianna or Berlin even? Would there be any unexpected discoveries?