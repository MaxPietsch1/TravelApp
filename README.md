# Fetch data from API's for a travel app

What we will be buildning
We will build an app that will allow users to get weather data, image data and a countdown to the departure date and display the result dynamically. The API's we will be using is from Pixabay, which gets us data for images from Pixabay, GeoName and weatherbit which gives us weatherdata and coordinates.

We will be using Node and Express to run our server and Webpack will be our buildtool.

## "Extend your Project"

display weather forecast for more than 1 day, total 16 days.

# How to run the project

## In development mode

start the server on port 8000

```
$ npm run build-dev
```

## In production mode

Install dependencies, then generate dist files and start server at port 8080

```
$ npm install
```

```
$ npm run build-prod
```

```
$ npm run start
```

## Configs

We are using two webpack configs. webpack.dev.js for developer-mode and webpack.prod.js for production-mode.

In package.json we have all of our dependencies.

## Offline mode

Our app will be able to work in offline mode, thanks to the service worker we are using.
