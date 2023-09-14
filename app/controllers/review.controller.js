const Review = require("../models/review.model.js");

exports.createReview = (req, res) => {
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "ไม่สามารถส่งได้เนื่องจากไม่มีการส่งข้อมูลเข้ามา",
    });
  }


  const review  = new Review({
    id_review : req.body.id_review,
    review_info : req.body.review_info,
    star : req.body.star,
    id_user : req.body.id_user,
    id_pet : req.body.id_pet,
    admin_modify : req.body.admin_modify

  });


Review.createReview(review, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || "เกิดข้อผิดพลาด",
    });
  else res.send("ข้อมูลรีวิวเข้าเรียบร้อย.");
});
};

exports.editReview = (req, res) => {
  const idReview = req.params.id_review; 
  const updatedReviewData = req.body; 

  Review.editReview(idReview, updatedReviewData, (err, updatedReivew) => {
    if (err) {
      console.error("ไม่สามารถเเก้ไขได้:", err);

      if (err.message === "หาผู้ใช้ไม่เจอ") {
        return res.status(404).json({
          message: "หาผู้ใช้ไม่เจอ",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดในการเเก้ไข",
        });
      }
    }

    // User edited successfully
    res.json(updatedReivew);
  });
};

