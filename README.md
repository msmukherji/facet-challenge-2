# facet-challenge-2

This is a CRUD app that enables interactions with a balance sheet.  The user can enter assets and liabilities one at a time.  They can delete any entries they have made.

The application makes use of React, Node.js, Express, Postgres, and Webpack, and is deployed to Heroku here: (https://facet-challenge.herokuapp.com/)

To run locally, clone the repo and run `npm run dev` - this will start two servers, one for the client code and one for the server code.  The boilerplate includes hot reloading for local development.  Only the back end server will run in production.  You will need to have a local postgres instance, and enter your configuration details in the config.js file (ideally, this would be managed in a non-version-controlled file, using dotenv or similar..)

Initial setup was based on simple-react-full-stack
(build info:
[![Build Status](https://travis-ci.org/crsandeep/simple-react-full-stack.svg?branch=master)](https://travis-ci.org/crsandeep/simple-react-full-stack))

