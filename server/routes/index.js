const express = require("express");
const userRouter = require("./user.js")
const paperRouter = require("./paper.js")

const router = express.Router();

router.use("/user", userRouter);
router.use("/paper", paperRouter);

module.exports = router; 
