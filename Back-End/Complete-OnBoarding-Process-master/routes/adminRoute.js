const express = require("express");
const router = express.Router();
const {
  signupAdmin,
  blockUser,
  unblockUser,
  getAllBlockedUsers,
} = require("../controllers/adminController");
const { isAdminAuthorized, userAuth } = require("../middlewares/authMiddleware");

// these routes are the admin privilages
router.post("/signup-admin", signupAdmin);
// router.put("/upgrade-to-admin", userAuth, isAdmin, upgradeUserToAdmin);
router.put("/blockuser", userAuth, isAdminAuthorized, blockUser);
router.put("/unblockuser", userAuth, isAdminAuthorized, unblockUser);
router.get("/get-blocked", userAuth, isAdminAuthorized, getAllBlockedUsers);
module.exports = router;