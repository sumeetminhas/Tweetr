"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";
const dataHelpersFactory   = require("./lib/data-helpers.js");
const tweetsRoutesFactory = require("./routes/tweets");

console.log('Connecting to:', MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



MongoClient.connect(MONGODB_URI).then(db => {
const dataHelpers  = dataHelpersFactory(db);
const tweetsRoutes = tweetsRoutesFactory(dataHelpers);

  app.use('/tweets', tweetsRoutes);

  app.listen(PORT, () => {
    console.log('Tweeter app listening on port ' + PORT);
  });
}).catch((err) => {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
});