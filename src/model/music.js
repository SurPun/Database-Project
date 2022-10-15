const db = require("../database/db.js");

const select_music = db.prepare(/*sql*/ `
  SELECT
  music.id,
  music.genre,
  music.artist,
  music.song,
  music.rating,
  user.username
  FROM music
  JOIN user
  ON music.user_id = user.id
`);

function listMusic() {
  return select_music.all();
}

// Gets userID
const get_user_id = db.prepare(/*sql*/ `
  SELECT id 
  FROM user
  WHERE username = ?
`);

function getUserId(username) {
  return get_user_id.get(username);
}

// Adds Users Post
const insert_music = db.prepare(/*sql*/ `
  INSERT INTO music (genre, artist, song, rating, user_id)
  VALUES(
    $genre, 
    $artist, 
    $song, 
    $rating,
    $user_id
  )
   RETURNING user_id
`);

function updateMusicList(song) {
  return insert_music.get(song);
}

// Adds New User
const add_username = db.prepare(/*sql*/ `
  INSERT INTO user (username)
  VALUES (
    $username
  )
  RETURNING username;
`);

function updateUsers(username) {
  return add_username.run({ username });
}

// Checks If Username Exists
function addUsername(username) {
  let user_id = getUserId(username);

  if (!user_id) {
    updateUsers(username);
    user_id = getUserId(username);
  }

  return user_id.id;
}

// ========== Filter =========

const music_by_username = db.prepare(/*sql*/ `
  SELECT
  music.genre,
  music.artist,
  music.song,
  music.rating,
  user.username
  FROM music
  JOIN user
  ON music.user_id = user.id
  WHERE music.user_id = ?
`);

function musicByUsername(id) {
  // Returns a list of songs by the username
  // Looks like this {genre: "pop", artist: "rihanna", song: "pon de replay", rating: 5, username: Manoela}
  return music_by_username.all(id);
}

function searchByUsername(username) {
  // Get username id from user folder
  let user_id = getUserId(username);
  // If it doesn't exist return "not found"
  if (!user_id) {
    return "User not found";
  }

  user_id = user_id.id;

  // If found, return music by this user;
  return musicByUsername(user_id);
}

module.exports = {
  listMusic,
  updateMusicList,
  addUsername,
  searchByUsername,
  updateUsers,
};
