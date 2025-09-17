const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];

  if (!authHeader) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(authHeader, process.env.SECRET_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
