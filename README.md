# polyglot-space



# Overview

polyglot-space is a fullstack web application built during a 3-days stackathon project.

This web application allows users to users to upload images and submit words. When submitting the images and words, users select a language of choice. Labels detected from the objects in the images or words submitted will be translated in the language the user selected.

# Technologies

Javascript, Node.js, React, Redux, Express, Sequelize, PostgreSQL, Heroku,  HTML, CSS, Google Cloud Vision API, Google Cloud Translation API, AWS S3

## Development Mode Setup & Installation

```
// Create database using PostgreSQL:
createdb stackathon

// Install all node.js dependencies:
npm install

// Seed the database:
npm run seed

// Run app on local server:
npm run start-dev
