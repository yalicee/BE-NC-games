const db = require("../db/connection");

exports.selectUsers = async () => {
  let queryStr = "SELECT * FROM users";
  const users = await db.query(queryStr).then(({ rows }) => rows);
  return users;
};
