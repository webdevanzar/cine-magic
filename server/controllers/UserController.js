const Users = require("../modals/userModel");
const { generateAccessToken } = require("../utils/jwt");
const { generatePasswordHash, comparePasswordHash } = require("../utils/utils");

const users = async (req, res) => {
  try {
    const userList = await Users.find().select("name age gender movie");
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const profile = (req, res) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ message: "unauthenticated" });
  }
};

const signup = async (req, res) => {
  try {
    const { password, username } = req.body;

    if (!(password || username)) {
      return res.status(401).json({
        message: "password/username empty",
      });
    }

    const isExist = await Users.findOne({ name: username });

    if (isExist) {
      return res.status(401).json({
        message: "user alrady exists",
      });
    }

    const hashedPassword = await generatePasswordHash(password);

    const newUser = await Users.create({
      name: username,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "user signup successfull",
      data: newUser,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { password, username } = req.body;

    if (!(password || username)) {
      return res.status(401).json({
        message: "password/username empty",
      });
    }

    const user = await Users.findOne({ name: username });

    if (!user) {
      return res.status(401).json({
        message: "username is not exist",
      });
    }

    const validPassword = await comparePasswordHash(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Password is not valid",
      });
    }

    //Token creation
    const accessToken = generateAccessToken(user);

    res
      .status(200)
      .cookie("token", accessToken, {
        httpOnly: true,
      })
      .json({ _id: user._id, username: user.name });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const addToWatchLater = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(403).json({
        message: "userid/movieId required",
      });
    }

    const isExist = await Users.findOne({
      _id: userId,
      movie: { $in: [movieId] },
    });

    if (isExist) {
      return res.status(403).json({
        message: "Already added this movie",
      });
    }

    const userList = await Users.findByIdAndUpdate(
      userId,
      {
        $push: {
          movie: movieId,
        },
      },
      { new: true }
    );
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteFromWatchLater = async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(403).json({
        message: "userid/movieId required",
      });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $pull: {
          movie: movieId,
        },
      },
      { new: true }
    );

    if (updatedUser) {
      const userList = await Users.findOne({ _id: userId })
        .populate({
          path: "movie",
          populate: {
            path: "genres",
          },
        })
        .select("movie");
      res.status(200).json(userList);
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const specificUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userList = await Users.findOne({ _id: userId })
      .populate({
        path: "movie",
        populate: {
          path: "genres",
        },
      })
      .select("movie");
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  users,
  profile,
  signup,
  login,
  addToWatchLater,
  deleteFromWatchLater,
  specificUser,
};
