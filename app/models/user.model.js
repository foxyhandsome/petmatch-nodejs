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

User.edit = (idUser, updatedUser, result) => {
  sql.query(
    "UPDATE user SET ? WHERE id_user = ?",
    [updatedUser, idUser],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // User with the specified id_user was not found
        result({ message: "User not found" }, null);
        return;
      }

      console.log("updated user with id: ", idUser);
      result(null, { id_user: idUser, ...updatedUser });
    }
  );
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

User.delete = (userId, result) => {
  sql.query("DELETE FROM user WHERE id_user = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // User with the specified user_id was not found
      result({ message: "User not found" }, null);
      return;
    }

    console.log("deleted user with id: ", userId);
    result(null, res);
  });
};

module.exports = User;
