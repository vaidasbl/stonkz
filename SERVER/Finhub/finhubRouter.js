const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
router.use(cors({ origin: "*" }));
//
//
//
//
//
module.exports = router;
