const Movies = require("../modals/movieModel");
const fs = require("fs");
const handleUpload = require("../config/cloudinary");

const movies = async (req, res) => {
  const { page, limit } = req.query;
  try {
    let skip = 0;
    if (page > 1) {
      skip = +limit * (page - 1);
    }

    const movieList = await Movies.find()
      .select("title imageUrl")
      .skip(skip)
      .limit(limit);

    const moviesCount = await Movies.find().countDocuments({});
    const pageCount = moviesCount / limit;

    res.status(200).json({ movieList, pageCount });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const dashbordMovies = async (req, res) => {
  try {
    const movieList = await Movies.find()
      .select("title imageUrl rating genres")
      .populate("genres");

      res.json(movieList)
  } catch (error) {
    res.status(404).json({
        message: error.message,
      });
  }
};

const watchlater = async (req, res) => {
  try {
    const movieList = await Movies.find()
      .select("title imageUrl rating genres")
      .populate("genres");
    res.status(200).json(movieList);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const movieUpload = async (req, res) => {
  try {
    const { title, rating, genres } = req.body;
    if (!genres || !title || !genres) {
      return res.status(400).json({
        message: "missing some fields",
      });
    }

    const isExist = await Movies.findOne({ title: title.toLowerCase() });

    if (isExist) {
      return res.status(400).json({
        message: "This movie already exists",
      });
    }

    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        message: "Only image files are allowed",
      });
    }

    //upload image to cloudinary
    const result = await handleUpload(req.file.path);

    if (!result || !result.secure_url) {
      return res.status(400).json({
        message: "Cloudinary upload failed",
      });
    }

    // remove temporary file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    //save movie data in mongodb
    const newMovie = await Movies.create({
      title: title,
      imageUrl: result.secure_url,
      rating: rating,
      genres: genres.split(","),
    });

    res.status(200).json({
      message: "uploaded successfully",
      data: newMovie,
    });
  } catch (error) {
    console.error(error);

    // Remove temporary file in case of an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(404).json({
      message: error.message,
    });
  }
};

//Update movie with genre
const updateMovie = async (req, res) => {
  //movieId
  //genreId

  try {
    const movie = await Movies.findByIdAndUpdate(
      req.params.movieId,
      {
        $push: {
          genre: req.body.genreId,
        },
      },
      { new: true }
    );

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!("_id" in req.body)) {
      return res.status(400).json({
        message: "missing attribute: _id",
      });
    }

    const deletedMovie = await Movies.findByIdAndDelete(_id);
    const allMovies = await Movies.find()
      .select("title imageUrl rating genres")
      .populate("genres");

    if (deletedMovie && allMovies) {
      return res.status(200).json(allMovies);
    }

    res.status(404).json({ message: "Item does not exist" });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { movies, watchlater, movieUpload, updateMovie, deleteMovie ,dashbordMovies};
