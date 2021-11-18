const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  };
  

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ message: "Acces denied, No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ message: "Access denied, Invalid token" });
    req.user = user;
    next();
  });
};


const checkIsOwner = (req, res, next) => {
  const userId = req.user.id;
  if (userId != req.params.id)
    return res
      .status(403)
      .send({
        message: "Acces denied, you are not the owner of this resource",
      });
  next();
};

// refresh token

module.exports = {
  auth,
  generateToken,
  checkIsOwner,
};
