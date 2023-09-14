const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.createUser = (req, res) => {
  console.log(req);
  if (!req.body) {
    res.status(400).send({
      message: "ไม่สามารถส่งได้เนื่องจากไม่มีการส่งข้อมูลเข้ามา",
    });
  } 
  
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    information: req.body.information,
    contact: req.body.contact,
    id_district: req.body.id_district,
    id_subdistrict: req.body.id_subdistrict,
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดปัญหาชื่อผู้ใช้ซ้ำกัน",
      });
    else res.send("ข้อมูลเข้าเรียบร้อย.");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "ต้องกรอกชื่อผู้ใช้กับรหัสผ่านให้ครบถ้วน",
    });
  }
  User.login(username, password, (err, user) => {
    if (err) {
      console.error("เข้าสู่ระบบไม่สำเร็จ:", err);
      return res.status(500).json({
        message: "เกิดปัญหาในเข้าสู่ระบบ",
      });
    }
    if (!user) {
      return res.status(401).json({
        message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      });
    }
    res.json({
      message: "เข้าสู่ระบบเรียบร้อย",
      user,
    });
  });
};

exports.deleteUser = (req, res) => {
  const idUser = req.params.id_user;
  User.delete(idUser, (err, result) => {
    if (err) {
      console.error("เกิดปัญหาในการลบผู้ใช้:", err);

      if (err.message === "หาผู้ใช้ไม่เจอ") {
        return res.status(404).json({
          message: "หาผู้ใช้ไม่เจอ",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้",
        });
      }
    }
    res.json({
      message: "ลบข้อมูลผู้ใช้เรียบร้อย" ,idUser
    });
    res.status(204).send();
  });
};

exports.editUser = (req, res) => {
  const idUser = req.params.id_user; // Assuming you get the id_user from the route parameter
  const updatedUserData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  User.edit(idUser, updatedUserData, (err, updatedUser) => {
    if (err) {
      console.error("ไม่สามารถเเก้ไขได้:", err);

      if (err.message === "หาผู้ใช้ไม่เจอ") {
        return res.status(404).json({
          message: "หาผู้ใช้ไม่เจอ",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดในการเเก้ไขข้อมูลผู้ใช้.",
        });
      }
    }

    // User edited successfully
    res.json(updatedUser);
  });
};
