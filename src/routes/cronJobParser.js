const express = require("express");
const router = express.Router();
const cronJobController = require("../controller/cronjobController");

router.post("/parse-cron", cronJobController.cronJobParser);

exports.router = router;
