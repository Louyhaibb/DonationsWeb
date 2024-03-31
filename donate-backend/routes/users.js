const { personalMe, getUsers, getUser, deleteUser, manageStatus, updateUser } = require('../controllers/users.controller');
const verifyToken = require('../utils/verifyToken');

const router = require('express').Router();

router.get('/personal/me', verifyToken(['admin', 'donator', 'needy']), personalMe);
router.get('/', verifyToken(['admin']), getUsers);
router.get('/getUser/:id', verifyToken(['admin', 'needy']), getUser);
router.delete('/delete/:id', verifyToken(['admin', 'needy']), deleteUser);
router.put('/manageStatus/:id', verifyToken(['admin', 'needy']), manageStatus);
router.put('/update/:id', verifyToken(['admin', 'needy']), updateUser);

module.exports = router;