const router = require('express').Router();
const { getItems, createItem, itemImage, deleteItem, manageItemStatus, getItem, updateItem } = require('../controllers/item.controller');
const verifyToken = require('../utils/verifyToken');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/items")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})

router.get('/', verifyToken(['donator', 'needy']), getItems);
router.post('/create', verifyToken(['donator']), createItem);
router.post('/upload/image', upload.single('image'), verifyToken(['donator']), itemImage);
router.delete('/delete/:id', verifyToken(['donator']), deleteItem);
router.get('/getItem/:id', verifyToken(['donator', 'needy']), getItem);
router.put('/update/:id', verifyToken(['donator']), updateItem);

module.exports = router;