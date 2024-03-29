const jwt = require("jsonwebtoken");
module.exports.validateRegister = (req, res, next) => {
  const { username, password, rePassword } = req.body;
  if (username.length > 0 && username.length <= 8) {
    if (password === rePassword && password.length >= 5) {
      next();
    } else {
      res.json({
        msg: "Somethings went wrong.",
      });
    }
  } else {
    res.json({
      msg: "Username's length fail.",
    });
  }
};

module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Access denied" });
    }
    const decoded = jwt.verify(token, "9yoahvofN");
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
