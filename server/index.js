const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/user");
const genreRoute = require("./routes/genre");
const movieRoute = require("./routes/movie");

require("dotenv").config();
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
connectDb();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/genres", genreRoute);
app.use("/api/movies", movieRoute);

app.all("*", (req, res) => {
  res.status(404).json("This page doe not exist");
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
