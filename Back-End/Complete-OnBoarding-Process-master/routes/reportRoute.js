const express = require('express');
const router = express.Router();
const {
    createReport
  } = require('../controllers/reportController');
  const { userAuth } = require('../middlewares/authMiddleware');

// route to create report
router.post("/report",userAuth,createReport)


module.exports = router;