import jwt from "jsonwebtoken";
import config from "../config";

const authorize = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send("Token is invalid !");
    return;
  }

  const verifiedToken = jwt.verify(token, config.jwtKey);
  if (!verifiedToken) {
    res.status(401).send("Token is invalid !");
    return;
  }

  req.current = verifiedToken;

  next();
};

export default authorize;
