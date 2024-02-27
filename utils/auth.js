import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  try {
    return jwt.verify(token, "69wHAt420tHe1337FuCk95SabotagE");
  } catch (error) {
    return null; // Token is invalid or expired
  }
};

module.exports = verifyToken;
