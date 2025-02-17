const express = require("express");
const router = express.Router();

const {
  genres,
  addGenre,
  deleteGenre,
  updateGenre,
} = require("../controllers/GenreController");

router.get("/", genres);
router.post("/", addGenre);
router.delete("/", deleteGenre);
router.put("/", updateGenre);

module.exports = router;
