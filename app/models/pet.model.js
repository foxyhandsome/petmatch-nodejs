const sql = require("./db.js");

// constructor
const Pet = function (pet) {
  this.id_pet = pet.id_pet
  this.picture_pet = pet.picture_pet;
  this.sex_pet = pet.sex_pet;
  this.health_pet = pet.health_pet;
  this.name_pet = pet.name_pet;
  this.age_pet = pet.age_pet;
  this.id_skin = pet.id_skin
  this.id_blood = pet.id_blood
  this.id_user = pet.id_user
  this.id_breed =pet.id_breed
};

Pet.create = (newPet, result) => {
  sql.query("INSERT INTO pet SET ?", newPet, (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }
    console.log("สร้างสัตว์เลี้ยง: ", { id: res.name_pet, ...newPet });
    result(null, { id: res.name_pet, ...newPet });
  });
};

// Pet.edit = (idPet, updatedPet, result) => {
//   const query = "UPDATE pet SET ? WHERE id_pet = ?";
//   const values = [updatedPet, idPet];
//   console.log(idPet)
//   updatedPet
//   sql.query(query, values, (err, res) => {
//     if (err) {
//       console.error("Error updating pet:", err);
//       return result(err, null);
//     }

//     if (res.affectedRows === 0) {
//       return result({ message: "Pet not found" }, null);
//     }
  
//     //console.log(Updated Pet with id: ${idPet});
//     return result(null, { id_pet: idPet, ...updatedPet });
//   });
// };

Pet.edit = (idPet, updatedPet, result) => {
  sql.query(
    "UPDATE pet SET ? WHERE id_pet = ?",
    [updatedPet, idPet],
    (err, res) => {
      if (err) {
        console.log("เกิดข้อผิดพลาด: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // User with the specified id_user was not found
        result({ message: "หาสัตว์เลี้ยงไม่เจอ" }, null);
        return;
      }

      console.log("อัปเดทข้อมูลสัตว์เลี้ยง: ", idPet);
      result(null, { id_pet: idPet, ...updatedPet });
    }
  );
};


Pet.delete = (petId, result) => {
  sql.query("DELETE FROM pet WHERE id_pet = ?", petId, (err, res) => {
    if (err) {
      console.log("เกิดข้อผิดพลาด: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // User with the specified user_id was not found
      result({ message: "หาสัตว์เลี้ยงไม่เจอ" }, null);
      return;
    }

    console.log("ลบสัตว์เลี้ยงเรียบร้อย: ", petId);
    result(null, res);
  });
};

module.exports = Pet;
