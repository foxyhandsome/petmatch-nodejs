const Pet = require("../models/pet.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const pet = new Pet({
    picture_pet: req.body.picture_pet,
    sex_pet: req.body.sex_pet,
    health_pet: req.body.health_pet,
    name_pet: req.body.name_pet,
    age_pet: req.body.age_pet,
    id_skin: req.body.id_skin,
    id_blood: req.body.id_blood,
    id_user: req.body.id_user,
    id_breed: req.body.id_breed
  });

  // Save Tutorial in the database
  Pet.create(pet, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "ไม่สามารถลงข้อมูลผู้ใช้ได้",
      });
    else res.send("ลงข้อมูลเรียบร้อย");
  });
};



exports.editPet = (req, res) => {
  const idPet = req.params.id_pet; // Assuming you get the id_user from the route parameter
  const updatedPetData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  Pet.edit(idPet, updatedPetData, (err, updatedPet) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการเเก้ไขสัตว์เลี้ยง:", err);

      if (err.message === "หาสัตว์เลี้ยงไม่เจอ") {
        return res.status(404).json({
          message: "หาสัตว์เลี้ยงไม่เจอ",
        });
      } else {
        return res.status(500).json({
          message: "ไม่สามารถเเก้ไขข้อมูลสัตว์เลี้ยงได้",
        });
      }
    }
    res.json(updatedPet);
  });
};

exports.deletePet = (req, res) => {
  const idPet = req.params.id_pet;
  Pet.delete(idPet, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูลสัตว์เลี้ยง:", err);

      if (err.message === "หาสัตว์เลี้ยงไม่เจอ") {
        return res.status(404).json({
          message: "หาสัตว์เลี้ยงไม่เจอ",
        });
      } else {
        return res.status(500).json({
          message: "ไม่สามารถลบข้อมูลสัตว์เลี้ยงได้",
        });
      }
    }
    res.json({
      message: "ลบข้อมูลสัตว์เลี้ยงเรียบร้อย" ,petId
    });
    res.status(204).send();
  });
};

