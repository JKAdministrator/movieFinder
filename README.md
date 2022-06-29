# About the project

This project was created by request of a work proposal.

# Purpose of the application

Your local movie theater is in dire need of attracting a new audience. To do this, they ask you to create a simple web application that allows users to discover new movies and search for them. Since they don't have a back-end service, the first version of the app will be built using the public API: https://developers.themoviedb.org/3 (FAQ: https://www.themoviedb.org/documentation/api)

# Features that the application must have

### Discover

Upon opening the web app, users should be able to see a list of movies suggested by the app and sorted by popularity.
Pagination is not required for this version.
- API reference: https://developers.themoviedb.org/3/discover/movie-discover

### Search

In the discovery view, add a search bar at the top to let users look up information about movies. If the search field is empty, it displays the discovery results.
- API Reference: https://developers.themoviedb.org/3/search/search-movies

### Filter by rating (Do this filtering on the client side)

The rating is a value between 0 and 10. Add a five-star rating filter (like https://dribbble.com/shots/1053518-Filters). When selecting a star, all stars to the left must also be selected. The rank of each star is 2, so if the first star is selected, only movies rated 0-2 should appear. If the second star is selected, only movies with a rating of 2 to 4 should appear, and so on. If the star that was clicked is the currently active star, disable the filter.
- Rating field in movie model: `vote_average`

### Detail view

When clicked, a detailed view should be displayed, showing more information about the movie.

# App Design

We do not require amazing designs. A clean and minimal user interface will do. We want to see the movie images provided by the API. (look at https://dribbble.com/shots/1682568-Flixus-Homepage-WIP/attachments/266476 as a design suggestion, but you decide)

# Development requirements

- Use `create-react-app` for this project
- Use the latest version of React
- Provide all the necessary steps to launch the application

# Deliverables

- The codebase for the project was delivered in some way (your choice, preferably on github.com).
- Anything else you think is important to understand the app.

# Frequently Asked Questions

**Do I need to add tests?**
No.

**Do I need to use any specific dependencies?**
Aside from `React`, use what you feel comfortable with and what you think is necessary for this project

**What kind of React functions can I use?**
There are no restrictions here, show us what you know. We love React and we love using the latest features.

**Do I have to follow the designs?**
No, feel free to create the user interface as you wish. We only care about the code.


# Project Considerations

- Redux (react-redux) was used to maintain application state (mainly UI state) to avoid unnecessary prop-drilling
- react-router-dom was used to enable query strings in the web url so that users can copy and paste the page they are on, keeping the state of the app while doing so. This does not mean that they will always have the same results since in the case of searches the results depend on the api endpoint. 
- Interface design is similar to Netflix but designed to prioritize mobile over desktop
- The API version 3 from ww.themoviedb.org was used to simplify access. If you want to run the app locally, you should create an .env in the "src" folder with the environment variable "REACT_APP_API_KEY". This should have as value the access token belonging to a user who can execute queries on the api.
- The app can be tested online on https://cinemas-jk.netlify.app/
- It is a PWA so it can be installed on PC/tablets/cell phones to function as a native-like app. However it is not taking advantage of having the service worker.
- A debounce functionality is not implemented on the search due to lack of time. It had problems with the searchParams of react-router-dom but it is a potential improvement in the future
- The score filter (stars) is applied on the search, not on what the "homepage" results would be. It can be unintuitive especially because when selecting the stars it seems like you are choosing a minimum of stars when in fact just a value is selected. It would be more intuitive in the future to change the filter to a dropdown like input or to have it work as a "minimum" of score to filter
- Styles of the app were armed with MUI + css because the design is not the objective of the app. In a larger project it is recommended to change it to styled components or a similar library 
