const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password:{
    type:String,
    required:true
  },
  movie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
