const test = require("node:test");
const assert = require("node:assert");
const server = require("../src/server");

// Test if server connect properly
test("if the test works", () => {
  assert.equal(1, 1);
});

// Test if the home route show the correct info
test("home route returns expected page", async () => {
  const app = server.listen(9876);
  const response = await fetch("http://localhost:9876");
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /artist/);
});

// Test if post request post the right data to the page
test("/submit route responds to POST requests", async () => {
  const app = server.listen(3332);

  const response = await fetch("http://localhost:3332", {
    method: "POST",
    body: "username=Lisa&genre=pop&artist=Drake&song=hello&rating=1",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /lisa/);
});
