"use strict";

const express = require("express");

const router = express.Router();


/* =================================
   API STATUS
================================= */

router.get("/status", (req, res) => {
    res.json({
        success: true,
        message: "FITNESS Backend is running!",
        status: "online"
    });
});


module.exports = router;