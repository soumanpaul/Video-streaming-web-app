var express = require("express");
var router = express.Router();

const authCtrl = require("../controllers/auth.controller");
const mediaCtrl = require("../controllers/media.controller");
const userCtrl = require("../controllers/user.controller");

router.route("/new/:userId").post(authCtrl.requireSignin, mediaCtrl.create);

router.route("/video/:mediaId").get(mediaCtrl.video);

router.route("/popular").get(mediaCtrl.listPopular);

router.route("/by/:userId").get(mediaCtrl.listByUser);

router.route("/:mediaId").get(mediaCtrl.incrementViews, mediaCtrl.read);

router.route("/related/:mediaId").get(mediaCtrl.listRelated);

router
  .route("/:mediaId")
  .put(authCtrl.requireSignin, mediaCtrl.isPoster, mediaCtrl.update);

router
  .route("/:mediaId")
  .delete(authCtrl.requireSignin, mediaCtrl.isPoster, mediaCtrl.remove);

router.param("mediaId", mediaCtrl.mediaByID);
router.param("userId", userCtrl.userByID);

module.exports = router;
