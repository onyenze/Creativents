const userModel = require("../models/userModel");

const signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isEmail = await userModel.findOne({ email });
    if (isEmail) {
      res.status(400).json({
        message: "email already registerd",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      const user = await userModel.create({
        username,
        email: email.toLowerCase(),
        isAdmin: true,
        password: hash,
      });
      const token = await genToken(user._id, "30m");
      const subject = "New userModel";
      const link = `${req.protocol}://${req.get("host")}/api/verify/${token}`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      sendEmail(data);
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const blockedUser = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    if (blockedUser) {
      res.status(200).json({ message: "user Blocked", blockedUser });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const unblockedUser = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (unblockedUser) {
      res.status(200).json({ message: "user Unblocked", unblockedUser });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await userModel.find({ isBlocked: true });
    res.status(200).json({ blockedUsers });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const allUsers = async (req, res) => {
  try {
      const users = await userModel.find({isAdmin: false})
      .populate("myEventsLink")
      .populate("myticketsLink")
      .populate("bookmarks");
      if (users.length == 0) {
          res.status(404).json({
              message: ' No User not found'
          })
      } else {
          res.status(200).json({
              message: 'All Users found',
              data: users
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
};



const allLoginUsers = async (req, res)=>{
  try {

      const loginUsers = await userModel.find({islogin: true})
      if (loginUsers.length == 0) {
          res.status(404).json({
              message: 'No Login Users at the Moment'
          })
      } else {
          res.status(200).json({
              message: 'All Login Users',
              data: loginUsers
          });
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
}



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



// Get all reports
const getAllReports = async (req, res) => {
  try {
    const events = await reportModel.find()
    .populate("reporter")
    .populate("targetId")
    .exec();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get a report event by ID
const getReportById = async (req, res) => {
  try {
    const report = await reportModel.findById(req.params.id)
    .populate("reporter")
    .populate("targetId")
    .exec();
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error: error.message });
  }
};


// Deleting a User.
const deleteUser = async (req, res)=>{
  try {
      const { userId } = req.params;
      const { id } = req.params;
      const adminUser = await userModel.findById(id);
      if (adminUser.isAdmin == false) {
          res.status(400).json({
              message: 'You are not an Admin and cannot delete'
          })
      } else {
          const deleteUser = await userModel.findByIdAndDelete(userId);
          if(!deleteUser) {
              res.status(404).json({
                  message: 'User not found'
              });
          } else {
              res.status(200).json({
                  message: 'User deleted successfully'
              })
          }
      }
  } catch (error) {
      res.status(500).json({
          message: error.message
      })
  }
}
// get all pending delete
// delete event

module.exports = {
  blockUser,
  unblockUser,
  getAllBlockedUsers,
  signupAdmin,
  allUsers,
  allLoginUsers,
  getReportById,
  getAllReports,
  deleteUser,
};