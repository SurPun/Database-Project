const test = require("node:test");
const assert = require("node:assert");
const { listUsers } = require("../src/model/user");
const { updateUsers } = require("../src/model/music");

// Test if username is inserted into user table properly

test("updateUsers update the table", () => {
  updateUsers("abbie");
  const data = listUsers();
  assert.equal(data[data.length - 1].username, "abbie");
});
