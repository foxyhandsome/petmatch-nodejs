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
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }
    console.log("สร้างข้อมูลผู้ใช้: ", { id: res.username, ...newUser });
    result(null, { id: res.username, ...newUser });
  });
};

User.edit = (idUser, updatedUser, result) => {
  sql.query(
    "UPDATE user SET ? WHERE id_user = ?",
    [updatedUser, idUser],
    (err, res) => {
      if (err) {
        console.log("เกิดข้อผิดพลาด: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // User with the specified id_user was not found
        result({ message: "หาผู้ใช้ไม่เจอ" }, null);
        return;
      }

      console.log("เเก้ไขข้อมูลผู้ใช้: ", idUser);
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
        console.log("เกิดข้อผิดพลาด: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("ผู้ใช้ที่เข้าสู่ระบบ: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: "ชื่ิอผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" }, null);
    }
  );
};

User.delete = (userId, result) => {
  sql.query("DELETE FROM user WHERE id_user = ?", userId, (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // User with the specified user_id was not found
      result({ message: "หาผู้ใช้ไม่เจอ" }, null);
      return;
    }

    console.log("ลบข้อมูลผู้ใช้: ", userId);
    result(null, res);
  });
};

module.exports = User;
