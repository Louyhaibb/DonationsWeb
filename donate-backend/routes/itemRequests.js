const { createItemRequest, getNeedyItemRequests, getDonatorItemRequests, manageItemRequestStatus } = require('../controllers/itemRequest.controller');
const verifyToken = require('../utils/verifyToken');

const router = require('express').Router();

router.get('/needy-itemRequests', verifyToken(['needy']), getNeedyItemRequests);
router.get('/donator-itemRequests', verifyToken(['donator']), getDonatorItemRequests);
router.post('/create', verifyToken(['needy']), createItemRequest);
router.put('/manageStatus/:id', verifyToken(['donator']), manageItemRequestStatus);

module.exports = router;