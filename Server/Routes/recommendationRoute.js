const express = require("express");
const router = express.Router();
const recommendationController = require("../Controllers/recommendationController");
router.post("/addrecommendation", recommendationController.addRecommendationRecord);
router.post("/getintouch", recommendationController.addGetInTouchResponse);
module.exports = router;
