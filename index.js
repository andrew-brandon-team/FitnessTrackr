// This is where we will be building our Express server.
// 1: Import express
const express = require('express');
const { client } = require('./db/index')
// 2: Setting up new express server instance
const app = express();


client.connect()
// 3: Set up your port to listen to our server
app.listen(3000, () => {
  console.log("We are now running on port 3000");
});

