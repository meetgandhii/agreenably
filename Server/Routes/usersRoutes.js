const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/getallusers", userController.getAllUsers);
router.get("/profile/:username", userController.getDetails);
router.get("/getUserDetails/:id", userController.getDetails)
router.put("/profile/:username", userController.updateDetails);
router.put("/submitcertificate", userController.updateDetailsAfterSubmit);
router.put("/begincertificate", userController.updateDetailsAfterBegin);
module.exports = router;
