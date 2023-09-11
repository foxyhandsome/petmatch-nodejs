const sql = require("./db.js");

// constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.information = user.information;
  this.contact = user.contact;
  this.id_district = user.id_district;
  this.id_subdistrict = user.id_subdistrict;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.username, ...newUser });
    result(null, { id: res.username, ...newUser });
  });
};

User.login = (username, password, result) => {
  sql.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: "Invalid username or password" }, null);
    }
  );
};

module.exports = User;
