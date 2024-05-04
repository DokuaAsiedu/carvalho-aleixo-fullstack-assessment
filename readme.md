# Scrapper App

A small app designed to search the Amazon store and pull results about the search keyword

## Implementation

This app uses Node.js, Express and jsdom on the backend to get the search results and on the frontend, uses vanilla JavaScript in combination with Axios to get data from the backend and display it on the ui and is styled with Tailwind.

## Run the App

To run this project,

- First install dependencies using

  ```
  npm install
  ```

- Run the server with

  ```
  nodemon index.js
  ```

  To have tailwind css applied, run

  ```
  npx tailwindcss -i ./public/css/input-styles.css -o ./public/css/output-styles.css --watch
  ```

  in another terminal to have changes made to Tailwind css classes be output

😊Thank you!
