const db = require("../database/db.js");

const selectUsers = db.prepare(/*sql*/ `
SELECT
id, 
username
FROM user
`);

function listUsers() {
  return selectUsers.all();
}

module.exports = { listUsers };
