const express = require('express');
const router = express.Router();
const {
  registerStudent,
  registerParent,
  registerTeacher,
  registerAdmin,
  login
} = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
// Registration routes (admin only)
router.post('/register-student',protect,isAdmin,registerStudent);
router.post('/register-parent',protect,isAdmin,registerParent);
router.post('/register-teacher',protect,isAdmin,registerTeacher);
router.post('/register-admin',registerAdmin);
router.post('/login', login);

module.exports = router;
