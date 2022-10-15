const test = require("node:test");
const assert = require("node:assert");
const { listMusic } = require("../src/model/music");

test("can list all the dummy data in the page", () => {
  const listData = listMusic();

  assert.equal(
    listData.length,
    listData.length,
    `recieved ${listData.length} data, ${listData.length}`
  );

  const data = listMusic()[0];
  assert.equal(data.artist, "disclosure");
  assert.equal(data.genre, "Electronic");
  assert.equal(data.id, 1);
  assert.equal(data.rating, 5);
  assert.equal(data.song, "Latch");
  assert.equal(data.username, "alex");
});
