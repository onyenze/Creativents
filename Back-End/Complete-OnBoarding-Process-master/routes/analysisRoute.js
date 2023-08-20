const express = require('express');
const router = express.Router();
const {
  analyzeEventCategories,
  analyzeTicketPurchasesByEventCategory
} = require('../controllers/analysisController');

router.get('/analyze/event-categories', analyzeEventCategories);
router.get('/analyze/ticket-purchases-by-event-category', analyzeTicketPurchasesByEventCategory);

module.exports = router;
