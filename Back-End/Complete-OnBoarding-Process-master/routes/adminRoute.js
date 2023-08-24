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
  getAllReports
} = require("../controllers/adminController");
const { isAdminAuthorized, userAuth } = require("../middlewares/authMiddleware");

// these routes are the admin privilages
router.post("/signup-admin", signupAdmin);

// to block user
router.put("/blockuser", userAuth, isAdminAuthorized, blockUser);

// get all logged in users
router.get('/loginusers', userAuth, isAdminAuthorized, allLoginUsers)

// to unblock user
router.put("/unblockuser", userAuth, isAdminAuthorized, unblockUser);

// to get all blocked users
router.get("/get-blocked", userAuth, isAdminAuthorized, getAllBlockedUsers);

// remember to add userAuth and isAdmin middleware
router.get('/allusers', userAuth,isAdminAuthorized, allUsers)

// to get all reports 
router.get('/admin/reports',userAuth,isAdminAuthorized,getAllReports)

// to get report by id 
router.get('/admin/report',userAuth,isAdminAuthorized,getReportById)


// delete a user
router.delete("/deleteuser", userAuth, isAdminAuthorized, deleteUser);

// 
module.exports = router;