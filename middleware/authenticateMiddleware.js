import { verifyToken } from "../utils/auth";

const authenticateMiddleware = (handler) => async (req, res) => {
  const user = req.user; // This comes from the 'user' prop set in MyApp component

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Attach the authenticated user to the request
  req.user = user;
  return handler(req, res);
};

export default authenticateMiddleware;
