const express = require('express');
const router = express.Router();
const {
    createReport
  } = require('../controllers/reportController');
  const { userAuth } = require('../middlewares/authMiddleware');

// route to create report
router.post("/report",userAuth,createReport)

// Admin dashboard to view reported items
router.get('/admin/reports', async (req, res) => {
  try {
    const reports = await reportModel.find().populate('reporter targetId').exec();
    res.render('admin-dashboard', { reports });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

// Route to handle actions on reported items (e.g., delete, warn user, etc.)
router.post('/admin/reports/:reportId', async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const action = req.body.action; // Example: 'delete', 'warn'
    
    // Handle the action based on your business logic
    // For example, you can delete the reported item, warn the user, etc.
    
    // Update the report status (e.g., resolved, action taken)
    const report = await reportModel.findByIdAndUpdate(reportId, { status: 'resolved', actionTaken: action });
    
    res.json({ message: 'Action taken successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error taking action on report', error: error.message });
  }
});

module.exports = router;