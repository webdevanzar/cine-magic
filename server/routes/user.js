const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/checkAuth");
const {
  users,
  profile,
  signup,
  login,
  addToWatchLater,
  deleteFromWatchLater,
  specificUser,
} = require("../controllers/UserController");

router.get("/", users);
router.get("/me", checkAuth, profile);
// router.get("/profile", async (req, res) => {
//   const user = await Users.findById(req.userId);
//   res.json(user);
// });
router.post("/signup", signup);
router.post("/login", login);
router.put("/watchlater/:userId", addToWatchLater);
router.delete("/watchlater/:userId", deleteFromWatchLater);

//get all user(specific) with movie populate
router.get("/withmovie/:userId", specificUser);

module.exports = router;
