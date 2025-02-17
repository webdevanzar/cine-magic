const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const handleUpload = require("../config/cloudinary");

const Movies = require("../modals/movieModel");
const {
  movies,
  watchlater,
  movieUpload,
  updateMovie,
  deleteMovie,
  dashbordMovies,
} = require("../controllers/MovieController");
const { checkAuth } = require("../middleware/checkAuth");

router.get("/", checkAuth,movies);
router.get("/watchlater", checkAuth,watchlater);

//configure multer for cloudinary img upload
const upload = multer({ dest: "uploads/" });

router.get("/admin",dashbordMovies)
router.post("/", upload.single("movieImage"), movieUpload);
router.delete("/", deleteMovie);
router.put("/updateGenre/:movieId", updateMovie);

module.exports = router;
