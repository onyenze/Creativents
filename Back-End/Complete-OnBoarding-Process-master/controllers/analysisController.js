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


// exports.analyzeTotal = async (req, res) => {
//   try {
//     // Use Mongoose aggregation to calculate analytics data
//     const analyticsData = await Ticket.aggregate([
//       {
//         $group: {
//           _id: '$link',
//           totalSales: { $sum: 1 },
//           totalRevenue: { $sum: '$totalPrice' },
//           averageTicketPrice: { $avg: '$totalPrice' },
//           // averageSaleDate : {"$saleDate"}
//         },
//       },
//     ]);

//     res.status(200).json({
//       message: 'Ticket sales analytics data',
//       data: analyticsData,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

exports.analyzeTotal = async (req, res) => {
  try {
    // Use Mongoose aggregation to calculate analytics data
    const analyticsData = await Ticket.aggregate([
      {
        $lookup: {
          from: 'events', // Assuming the events collection name is 'events'
          localField: 'link',
          foreignField: 'link', // The field you want to match with in the 'events' collection
          as: 'eventData'
        }
      },
      {
        $group: {
          _id: '$link',
          eventCategory: { $first: '$eventData.Leisure' }, // Get the event category
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
          averageTicketPrice: { $avg: '$totalPrice' }
        },
      },
    ]);

    res.status(200).json({
      message: 'Ticket sales analytics data',
      data: analyticsData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





