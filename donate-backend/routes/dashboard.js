const { getAdminDashboard } = require('../controllers/dashboard.controller');
const verifyToken = require('../utils/verifyToken');

const router = require('express').Router();

router.get('/admin-dashboard', verifyToken(['admin']), getAdminDashboard);

module.exports = router;