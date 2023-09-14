const sql = require("./db.js");

// constructor
const Admin = function (admin) {
  this.username = admin.username;
  this.password = admin.password;
  this.review_info = admin.review_info;
  this.star = admin.password_admin;
  this.id_user = admin.id_user;
  this.id_pet = admin.id_pet;
  this.admin_modify = admin.admin_modify;
};

Admin.editreview = (idReview ,updatedReview, result) => {
  sql.query(
    "UPDATE review SET ? WHERE id_review = ?",
    [updatedReview, idReview],
    (err, res) => {
      if (err) {
        console.log("เกิดข้อผิดพลาด: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        result({ message: "หาผู้ใช้ไม่เจอ" }, null);
        return;
      }

      console.log("อัปเดทข้อมูลรีวิวผู้ใช้จากไอดี: ", idReview);
      result(null, { id_Review: idReview, ...updatedReview });
    }
  );
};

Admin.delete = (userId, result) => {
  sql.query("DELETE FROM user WHERE id_user = ?", userId, (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ message: "หาผู้ใช้ไม่เจอ" }, null);
      return;
    }

    console.log("ลบข้อมูลผู้ใช้จากไอดี: ", userId);
    result(null, res);
  });
};

Admin.getfindUserByIdUser = (id_user, result) => {
  sql.query("SELECT * FROM user WHERE id_user = ?", id_user, (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }
    console.log("ผู้ใช้ไอดี: ", res);
    result(null, res);
  });
};

Admin.getAlluser = (result) => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }
    console.log("ผู้ใช้ทั้งหมด: ", res);
    result(null, res);
  });
};


module.exports = Admin;
