const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const eventModel = require('../models/eventModel');
// const reviewModel = require('../models/reviewModel');
const reportModel = require('../models/reportModel');

const createReport = async (req, res) => {
  try {
    const { targetType, targetId, reason } = req.body;
    const reporterId = req.userId; // Assuming user is authenticated
    
    // Check if the target exists and is valid
    let targetModel, targetDocument;
    if (targetType === 'event') {
      targetModel = eventModel;
    } else if (targetType === 'review') {
      targetModel = reviewModel;
    } else if (targetType === 'user') {
      targetModel = userModel;
    } else {
      return res.status(400).json({ message: 'Invalid target type' });
    }
    
    targetDocument = await targetModel.findById(targetId);
    if (!targetDocument) {
      return res.status(404).json({ message: 'Target not found' });
    }
    
    // Create and save the report
    const newReport = new reportModel({
      reporter: reporterId,
      targetType,
      targetId,
      reason,
    });
    await newReport.save();
    
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};



module.exports = {
  createReport
};