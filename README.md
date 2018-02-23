# :newspaper: Paper Scraper (aka Onion Peeler) :trollface:
A `Node.js` &amp; `MongoDB` webapp that web-scrapes news data from [Nintendo](https://www.nintendo.com/whatsnew#all) and allows users to comment about what they have read. Users can also delete unwanted comments.

Please check out the deployed version in Heroku [here](https://secret-sands-39307.herokuapp.com/)!


## Functionality
On the backend, the app uses `express` to serve routes and `mongoose` to interact with a `MongoDB` database.

On the frontend, the app uses `handlebars` for templating each article and `materialize` as a styling framework. The app also uses `jQuery` and `AJAX` to help with making post requests.

And for webscraping, the app uses the `request` and `cheerio` node packages. All webscrapping code can be found in the `controllers.js` file.


## Cloning down the repo
If you wish to clone the app down to your local machine...
  1. Ensure that you have MongoDB set up on your laptop
    * An amazing repo to get you started with that can be found [here](https://github.com/dannyvassallo/mongo_lesson).
  2. Once you are set up, `cd` into this repo and run `npm install`.
  3. Then open another bash or terminal window and run `mongod`
  4. Run the script with `node server.js`.
  5. Navigate to `localhost:3000` in your browser.

#### Note that the web scraping occurs on the `/scrape` route.
#### On visiting the index route, `/`, express redirects to `/scrape` and then `/articles` routes
