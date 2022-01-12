const router = require("express").Router();

const {
  signUp,
  signIn,
  getUserDetail,
  updateProfileUser,
  deleteUser,
} = require("../controllers/user");
const {
  createUserValidators,
  upadateUserValidator,
} = require("../middlewares/validator/user");
const authentication = require("../middlewares/auth/auth");

router.post("/signup", createUserValidators, signUp);
router.post("/signin", signIn);
router.get("/profile", authentication, getUserDetail);
router.patch(
  "/update",
  authentication,
  upadateUserValidator,
  updateProfileUser
);
router.delete("/delete", authentication, deleteUser);

module.exports = router;
