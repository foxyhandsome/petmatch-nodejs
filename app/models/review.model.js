const sql = require("./db.js");

// constructor
const Review = function (review) {
  this.id_review = review.id_review;
  this.review_info = review.review_info;
  this.star = review.star;
  this.id_user = review.id_user;
  this.id_pet = review.id_pet;
  this.admin_modify = review.admin_modify;
};


Review.createReview = (newReview, result) => {
  sql.query("INSERT INTO review SET ?", newReview, (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }
    console.log("สร้างข้อมูลรีวิว: ", { id: res.id_review, ...newReview });
    result(null, { id: res.id_review, ...newReview });
  });
};


Review.editReview = (idReview ,updatedReview, result) => {
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

module.exports = Review;
