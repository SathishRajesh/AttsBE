const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const { logout } = require("../controllers/auth.controller");

router.post("/auth/register", controller.registerUser);
router.post("/auth/login", controller.login);
router.post("/auth/refresh-token", controller.getNewToken);
router.post("/auth/logout", logout);
module.exports = router;
