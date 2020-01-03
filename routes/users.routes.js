const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();

router
  .route("/")
  .get(userCtrl.list)
  .post(userCtrl.create);
router
  .route("/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);
router.param("userId", userCtrl.userByID);

module.exports = router;