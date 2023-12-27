const express = require("express");
const { videosController } = require("../../controllers/");

const router = express.Router();

router.get("/:videoId",videosController.getVideosById);
router.get("/", videosController.getVideos);
router.post("/",videosController.insertVideo);
router.patch("/:videoId/votes",videosController.updateVotes);
router.patch("/:videoId/views",videosController.updateViews);
module.exports = router;