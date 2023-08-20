const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');

exports.analyzeEventCategories = async (req, res) => {
  try {
    const analysisResults = await Event.aggregate([
      {
        $group: {
          _id: '$eventCategory',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          eventCategory: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};




exports.analyzeTicketPurchasesByEventCategory = async (req, res) => {
  try {
    const analysisResults = await Event.aggregate([
      {
        $lookup: {
          from: 'tickets',
          localField: 'purchasedTickets',
          foreignField: '_id',
          as: 'tickets'
        }
      },
      {
        $unwind: '$tickets'
      },
      {
        $group: {
          _id: '$eventCategory',
          totalPurchased: { $sum: '$tickets.ticketQuantity' }
        }
      },
      {
        $project: {
          eventCategory: '$_id',
          totalPurchased: 1,
          _id: 0
        }
      }
    ]);

    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
