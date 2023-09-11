module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();
  router.post("/create-user", user.create);
  router.post("/login", user.login);
  app.use("/pet-match/api/user", router);
};
