const jwt = require("jsonwebtoken");

function isauthenticated(req, res, next) {
  try {
    const token = req.cookies.token;
    // console.log("MIDDLEWARE :",token);
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    // decode the token to get the expiration date
    const decoded = jwt.decode(token);
    // check if the token is expired
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ errorMessage: "Token expired" });
    }
    // verify the token with the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = isauthenticated;
