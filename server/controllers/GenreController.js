const Genres = require("../modals/genreModel");

const genres = async (req, res) => {
  try {
    const genreList = await Genres.find();
    res.status(200).json(genreList);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const addGenre = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "text attribute does not exist",
      });
    }

    const isExist = await Genres.findOne({ title: title.toLowerCase() });
    if (!isExist) {
      const genreList = await Genres.create({ title: title });
      return res.status(200).json(genreList);
    }
    res.status(400).json({
      message: "Genre with this name already exist",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!("_id" in req.body)) {
      return res.status(400).json({
        message: "Missing attribute: _id",
      });
    }

    const deletedGenre = await Genres.findByIdAndDelete(_id);
    const allGenres = await Genres.find();

    if (deletedGenre && allGenres) {
      return res.status(200).json(allGenres);
    }
    res.status(404).json({ message: "item does not exist" });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateGenre = async (req, res) => {
  try {
    const { _id, updatedTitle } = req.body;

    //ERROR HANDLING
    const requiredFields = ["_id", "updatedTitle"];
    const missingFields = requiredFields.filter(
      (field) => !(field in req.body)
    );
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `miising attributes : ${missingFields}`,
      });
    }

    const updatedGenre = {
      title: updatedTitle,
    };

    const updatedField = await Genres.findByIdAndUpdate(_id, updatedGenre, {
      new: true,
    });

    if (updatedField) {
      return res.status(200).json(updatedField);
    }

    res.status(404).json({
      message: "Item does not exist",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { genres, addGenre, deleteGenre, updateGenre };
