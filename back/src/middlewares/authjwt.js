import config from "../config";
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//verificar token existente
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return req.status(400).json({ message: "No hay token" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(400).json({ message: "Token invalido" });
    next();
  } catch (error) {
    return res.status(400).json({message: "No tiene autorizacion"})
  }
};

module.exports = verifyToken;
