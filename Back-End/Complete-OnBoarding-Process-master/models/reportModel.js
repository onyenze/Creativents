const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetType: {
      type: String,
      enum: ['event', 'review', 'user'],
      required: true,
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  });
  
const reportModel = mongoose.model('Report', reportSchema);

module.exports=reportModel;