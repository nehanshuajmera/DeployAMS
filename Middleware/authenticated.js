const jwt = require("jsonwebtoken");

// Middleware function to check if the student is authenticated and the token is not expired
function isauthenticated(req, res, next) {
  // Get the JWT token from the request cookies or headers
  const token = req.cookies._secureourapp || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }
  
  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Check if the token is expired
    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Unauthorized: Token has expired" });
    }

    // If the token is valid and not expired, you can access the user's information
    req.user_id = decoded.user_id;
    req.user_role = decoded.user_role;

    next(); // Proceed to the next middleware or route handler
  });
}

module.exports =  isauthenticated;
