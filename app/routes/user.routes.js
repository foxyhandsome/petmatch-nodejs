const Review = require("../models/review.model");

module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const pet = require("../controllers/pet.controller");
  const admin = require("../controllers/admin.controller");
  const review = require("../controllers/review.controller");


  var router = require("express").Router();
  router.post("/create-user", user.createUser); //สร้างผู้ใช้ทั่วไป
  router.post("/login-user", user.login); //เข้าสู่ระบบผู้ใช้
  router.delete("/delete-user/:id_user", user.deleteUser); //ลบข้อมูลผู้ใช้
  router.put("/edit/:id_user", user.editUser); //เเก้ไขข้อมูลผู้ใช้
  
  router.post("/create-pet", pet.create); //สร้างสัตว์เลี้ยง
  router.post("/edit-pet/:id_pet", pet.editPet); //เเก้ไขข้อมูลสัตว์เลี้ยง
  router.delete("/delete-pet/:id_pet", pet.deletePet); //ลบข้อมูลสัตว์เลี้ยง
  
  router.get("/get-alluser", admin.findAlluser); //เรียกดูข้อมูลผู้ใช้ทั้งหมด
  router.get("/get-user-by-id/:id_user", admin.findUserByIdUser); //เรียกดูข้อมูลผู้ใช้ตามไอดีผู้ใช้
  router.delete("/delete-user-admin/:id_user", admin.deleteUserAdmin); //ลบข้อมูลผู้ใช้ฝ่ายเเอดมิน          
  
  router.post("/create-review", review.createReview ); //สร้างรีวิว
  router.put("/edit-review/:id_review", review.editReview); //เเก้ไขข้อมูลรีวิว เเอดมินใช้ได้เท่านั่น

  app.use("/pet-match/api/user", router); // ลิ้ง api เริ่มต้น ต้องใส่ก่อนถ้าไม่ใส่กูจะใส่หน้ามึงเเทน   // อย่าเเก้ไขนะไอ้สัส
};
