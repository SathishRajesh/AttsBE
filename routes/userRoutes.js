const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersControllers");
const { verifyToken } = require("../middleware/rolemiddleware");

router.get(
  "/user/get-all-users",
  verifyToken,
  controller.getAllUsers
);
router.delete(
  "/user/delete-user/:id",
  verifyToken,
  controller.deleteUser
);
router.put(
  "/user/edit-user/:id",
  verifyToken,
  controller.editUser
);

module.exports = router;
