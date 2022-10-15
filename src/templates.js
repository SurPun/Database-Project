// Sanitize Function
function sanitize(str) {
  return str.replace(/</g, "&lt;");
}

// HTML Content
const content = (posts, error = {}, value = {}) => {
  return /*html*/ `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width">
        <meta charset="utf-8">
        <link rel="stylesheet" href="styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Music List</title>
      </head>

      <body>
        <main>
            <h1><a href="/">My Music</a></h1>

            <form method="POST" action="/" class="submit-form">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" maxLength="15" value='${
                  value.username ? value.username : ""
                }'>
                ${validation(error.username)}

                <label for="artist">Artist</label>
                <input type="text" name="artist" id="artist" maxLength="50" value='${
                  value.artist ? value.artist : ""
                }'>
                ${validation(error.artist)}
        
                <label for="song">Song</label>
                <input type="text" name="song" id="song" maxLength="50" value='${
                  value.song ? value.song : ""
                }'>
                ${validation(error.song)}
        
                <label for="genre">Genre</label>
                <input type="text" name="genre" id="genre" maxLength="20" value='${
                  value.genre ? value.genre : ""
                }'>
                ${validation(error.genre)}
        
                <label for="rating">Rating</label>
                <input type="range" name="rating" id="rating" min="0" max="5" >

                <button>Post</button>
            </form>
        
            <form method="GET" action="/search">
                <h3>or search by <input name="user" placeholder=" username">${validation(
                  error.user
                )}</h3>
            </form>
        
            <h2>All posts</h2>
            <ul class="grid-container">${posts
              .reverse()
              .map(postItem)
              .join("")}</ul>
        </main>

        <footer>
            <p>@2022 Abby-Alex-Manoela-Suraj</p>
        </footer>
      </body>
    </html>
  `;
};

// Rating
function addStars(rating) {
  const star = `<span class="fa fa-star ratings"></span>`;

  let rating_in_stars = star;

  while (rating > 1) {
    rating_in_stars += star;
    rating--;
  }
  return rating_in_stars;
}

// Post Function
function postItem(post) {
  return `
        <li class="tile">
          <p>@${sanitize(post.username)}</p>
          <p>${capitalizeFirstLetter(sanitize(post.artist))}</p>
          <p>${capitalizeFirstLetter(sanitize(post.song))}</p>
          <p>${capitalizeFirstLetter(sanitize(post.genre))}</p>
          <p>${addStars(post.rating)}</p>
        </li>
      `;
}

// Validation Function
function validation(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}

// Caps Function
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  sanitize,
  content,
};
