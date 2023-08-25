const express = require('express');
const router = express.Router();
const {
  analyzeEventCategories,
  analyzeTicketPurchasesByEventCategory,
  analyzeTotal
} = require('../controllers/analysisController');

router.get('/analyze/event-categories', analyzeEventCategories);
router.get('/analyze/ticket-purchases-by-event-category', analyzeTicketPurchasesByEventCategory);


  
// Analytics Route - Return Ticket Sales Data
router.get('/analytics/ticket-sales', analyzeTotal);

module.exports = router;
