const Admin = require("../models/admin.model.js");

exports.create = (req, res) => {
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "ไม่สามารถส่งได้เนื่องจากไม่มีการส่งข้อมูลเข้ามา",
    });
  }


  const admin = new Admin({
    id_user : req.body.id_user,
    username : req.body.username,
    password : req.body.password,
  });
}

exports.deleteUserAdmin = (req, res) => {
  const idUser = req.params.id_user;
  Admin.delete(idUser, (err, result) => {
    if (err) {
      console.error("ไม่สามารถลบข้อมูลได้:", err);

      if (err.message === "หาผู้ใช้ไม่เจอ") {
        return res.status(404).json({
          message: "หาผู้ใช้ไม่เจอ",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้.",
        });
      }
    }
    res.json({
      message: "ลบข้อมูลเรียบร้อย ",userId
    });
    res.status(204).send();
  });
};


// exports.editReview = (req, res) => {
//   const idReview = req.params.id_review; 
//   const updatedUserData = req.body; 

//   Admin.editReview(idReview, updatedReviewData, (err, updatedReivew) => {
//     if (err) {
//       console.error("ไม่สามารถเเก้ไขได้:", err);

//       if (err.message === "User not found") {
//         return res.status(404).json({
//           message: "หาผู้ใช้ไม่เจอ.",
//         });
//       } else {
//         return res.status(500).json({
//           message: "เกิดข้อผิดพลาดในการเเก้ไข",
//         });
//       }
//     }

//     // User edited successfully
//     res.json(updatedReivew);
//   });
// };

exports.findUserByIdUser = (req, res) => {
  const idUser = req.params.id_user;

  Admin.getfindUserByIdUser(idUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "ไม่สามารถดึงข้อมูลได้จากเลขไอดีผู้ใช้",
      });
    else res.send(data);
  });
};

exports.findAlluser = (req, res) => {
  Admin.getAlluser((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "ไม่สามารถเรียกดูผู้ใช้ทั้งหมดได้.",
      });
    else res.send(data);
  });
};

