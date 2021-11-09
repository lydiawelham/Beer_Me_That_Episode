# Creating a Meme to Episode Catalogue using React and Astra DB

The meme catalogue is designed to answer the burning desire to watch your favourite Office moment when you can’t remember the episode and to act as a gateway from meme peruser to devout fan. The ReactJS app is an adaptation of the Netflix LoLoMo (list of list of movies) model. The catalogue displays a list of lists of The Office gifs, which link on click to the episode they are from on Netflix. Additional seasons (vertical lists) are paginated by scrolling down (on mouse entering page footer) and additional memes (horizontal lists) are paginated by clicking on the right arrow.  

These lists are supplied by queries to a custom-built Astra DB. I set the database up using the GraphQL Playground API and the app is supported by Netlify. The project was built and runs on a Raspberry Pi server. I created the logo and svg icons in Canva. 

Special thanks go to Ania Kubow for her Netflix Clone tutorial. 

Additional features include: 

* SEO changes made to meta data
* Accessibility features, including alt text for all gifs and hidden description for the search bar feature 
* Database design - addition of index columns to memes and seasons list to control content layout
* WIP: Search bar added to the header (thanks to Angela Delise for her tutorial on search bar design using SCSS, which I adapted for React) - I am continuing to develop functionality for this using Apache Solr 
* Bug fixing on page resize issues - page resize is dynamic in Safari, Chrome and some versions of Firefox
