const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    imageUrl: {
      type: String,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genres",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movies", movieSchema);
