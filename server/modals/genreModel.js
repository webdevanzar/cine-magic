const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    set: (value)=> value.toLowerCase()
  },
});

module.exports = mongoose.model("Genres", genreSchema);
