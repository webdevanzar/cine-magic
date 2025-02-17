const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
     
    if (!token)
      return res.status(401).json({
        message: "Access denied",
      });

     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token expired or invalid" });
        }
    
        req.user = decoded; // Attach user data to request
        next();
      });
    
  } catch (error) {
    res.status(401).json({
      message: "unauthorized",
    });
  }
};
