const { login, register, adminLogin } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.post('/admin/login', adminLogin);

module.exports = router;