const express = require('express');
const router = express.Router();


const {getAllUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController');
const { login, registerUser } = require('../controllers/authController');

// auth middleware
const { auth, checkIsOwner } = require("../middlewares/jwt")


// User Route
router.get('/', (req, res) => {
    res.send('Hello World');
});


//auth
router.post('/login',login);
router.post('/register',registerUser);

//router for get all users
router.get('/users',getAllUsers);

//crud
router.get('/users/:id', auth, getUserById);
router.delete('/users/:id', auth, checkIsOwner, deleteUser);
router.put('/users/:id', auth, checkIsOwner, updateUser);




module.exports = router;