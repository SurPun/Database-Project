const express = require("express");
const server = express();

const staticHandler = express.static("public");
const bodyParser = express.urlencoded();

const { content } = require("./templates.js");
const {
  listMusic,
  updateMusicList,
  addUsername,
  searchByUsername,
} = require("./model/music.js");

const postsArr = listMusic();

// Middleware
server.use(staticHandler);

// Route Handlers
server.get("/", (req, res) => {
  res.send(content(postsArr));
});

server.post("/", bodyParser, (req, res) => {
  const error = {};
  const username = req.body.username.toLowerCase();
  const artist = req.body.artist;
  const song = req.body.song;
  const genre = req.body.genre;
  const rating = req.body.rating;

  // Adds user input into an array of objects
  if (!username) {
    error.username = "Please enter your username";
  }
  if (!artist) {
    error.artist = "Please enter the artist' name";
  }
  if (!song) {
    error.song = "Please enter a song";
  }
  if (!genre) {
    error.genre = "Please enter the genre";
  }
  if (Object.keys(error).length > 0) {
    const body = content(postsArr, error, req.body);
    return res.status(400).send(body);
  } else {
    postsArr.push({ genre, artist, song, rating, username });

    const user_id = addUsername(username);

    // Updates the music database with user input. Must use user_id because username doesn't feature on music table.
    updateMusicList({ genre, artist, song, rating, user_id });

    res.redirect("/");
  }
});

// Search by username
server.post("/search", bodyParser, (req, res) => {
  const user = req.body.user.toLowerCase();
  const error = {};

  // If empty throw error
  if (!user) {
    error.user = "Please enter your username";
  }

  if (Object.keys(error).length > 0) {
    // const body = content(postsArr, error);
    return res.status(400).send(body);
  } else {
    res.redirect(`/search/?username=${user}`);
  }
});

server.get("/search?:user", (req, res) => {
  // Get username from the query
  const user = req.query.user.toLowerCase();

  const error = {};

  // Get an array of songs posted by this username
  let postsByUsername = searchByUsername(user);

  if (postsByUsername == "User not found") {
    error.user = "User doesn't exist";
  }

  if (Object.keys(error).length > 0) {
    const body = content(postsArr, error);
    return res.status(400).send(body);
  }

  res.send(content(postsByUsername, error));
});

module.exports = server;
