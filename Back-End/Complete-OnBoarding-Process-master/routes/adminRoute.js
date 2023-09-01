const express = require("express");
const router = express.Router();
const {
  signupAdmin,
  blockUser,
  unblockUser,
  getAllBlockedUsers,
  allUsers,
  deleteUser,
  allLoginUsers,
  getReportById,
  deleteEventById,
  searchUsers,
  getAllEventsPendingDelete,
  getAllReports,
  getUserById,
} = require("../controllers/adminController");
const { isAdminAuthorized, userAuth } = require("../middlewares/authMiddleware");

// these routes are the admin privilages
router.post("/signup-admin", signupAdmin);

// to block user
router.put("/blockuser/:userId", userAuth, isAdminAuthorized, blockUser);

// get all logged in users
router.get('/loginusers', userAuth, isAdminAuthorized, allLoginUsers)

// to unblock user
router.put("/unblockuser/:userId", userAuth, isAdminAuthorized, unblockUser);

// to get all blocked users
router.get("/get-blocked", userAuth, isAdminAuthorized, getAllBlockedUsers);

// remember to add userAuth and isAdmin middleware
router.get('/allusers', userAuth,isAdminAuthorized, allUsers)

// to get all reports 
router.get('/admin/reports',userAuth,isAdminAuthorized,getAllReports)

// to get report by id 
router.get('/admin/report/:id',userAuth,isAdminAuthorized,getReportById)

// Endpoint for searching events with query parameters
router.get('/searchusers/search',userAuth, isAdminAuthorized,searchUsers);

// delete a user
router.delete("/deleteuser/:id", userAuth, isAdminAuthorized, deleteUser);

// DELETE request to delete an event by ID
router.delete('/Delete/:eventID', userAuth, isAdminAuthorized,deleteEventById);

// DELETE request to delete an event by ID
router.get('/eventsPendingDelete', userAuth, isAdminAuthorized,getAllEventsPendingDelete);

// GET request to get all event reviews
router.get('/getUserById/:id',  userAuth, isAdminAuthorized,getUserById);

module.exports = router;