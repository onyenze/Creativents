const {
    registration,
    verifyEmail,
    resendEmailVerification,
    logIn,
    signOut,
    allLoginUsers,
    changePassword,
    forgotPassword,
    resetPassword,
    allUsers,
    updateUsers,
    deleteUser,
    createAdmin,
    allAdminUsers,
    makeAdmin,
    makeSuperAdmin
} = require('../controllers/userController')
const {
    userAuth,
    isAdminAuthorized,
    isSuperAdminAuthorized,
    loginAuth
} = require('../middlewares/authMiddleware')


const express = require('express');
const router = express.Router();



// Major Routes for Normal USERS
router.post('/signup', registration)  // checked
router.put('/verify/:id/:token', verifyEmail) // checked
router.put('/re-verify', resendEmailVerification) // checked
router.post('/login', logIn) //checked
router.put('/logout/:id',  loginAuth, signOut) // checked
router.put('/changepassword/:id', loginAuth,changePassword) // checked
router.post('/changepassword/:id/:token', resetPassword) // checked
router.post('/forgotpassword', forgotPassword) // checked


// Major Routes for ADMIN USERS routes
router.post('/:id/updateusers/:userId', userAuth, loginAuth, isAdminAuthorized, updateUsers)
router.delete('/:id/deleteUsers/:userId', userAuth, loginAuth, isSuperAdminAuthorized, deleteUser)


// Major Routes for SUPER ADMIN routes
router.get('/allusers/:id', userAuth, loginAuth, isSuperAdminAuthorized, allUsers)
router.get('/loginusers/:id', userAuth, loginAuth, isSuperAdminAuthorized, allLoginUsers)
router.post('/createAdmin/:id', userAuth, loginAuth, isSuperAdminAuthorized, createAdmin);
router.get('/allAdminUsers/:id', userAuth, loginAuth, isSuperAdminAuthorized, allAdminUsers);
router.post('/:id/makeAdmin/:userId', userAuth, loginAuth, isSuperAdminAuthorized, makeAdmin);
router.post('/:id/makeSuperAdmin/:userId', userAuth, loginAuth, isSuperAdminAuthorized, makeSuperAdmin);



module.exports = router;

