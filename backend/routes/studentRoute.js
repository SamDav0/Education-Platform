const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/authController');
const {
    getAllStudents
} = require('../controllers/studentController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
// Registration routes (admin only)
router.get('/',protect,isAdmin,getAllStudents);

module.exports = router;
