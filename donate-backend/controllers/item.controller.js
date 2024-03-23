const Item = require("../models/Item");
const mongoose = require('mongoose');

const getItems = async (req, res) => {
    const filterQuery = {
        $or: [
            { createBy: req.user._id },
            { requestBy: req.user._id }
        ],
        status: { $ne: 'deleted' }
    };

    try {
        const items = await Item.find(filterQuery)
            .populate({
                path: 'createBy'
            })
            .populate({
                path: 'requestBy'
            })
            .select("-__v");

        return res.send({ status: 'success', items: items });
    } catch (err) {
        return res.status(400).send(err);
    }
};

const createItem = async (req, res) => {
    const item = new Item({
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        gender: req.body.gender,
        size: req.body.size ? req.body.size : '',
        color: req.body.color ? req.body.color : '',
        image: req.body.image ? req.body.image : '',
        status: '',
        createBy: req.user._id
    });

    try {
        const savedItem = await item.save();

        return res.send({ user: savedItem, message: 'Item successfully created' });
    } catch (err) {
        return res.status(400).send(err);
    }
}

const updateItem = async (req, res) => {
    const updateValues = req.body;
    try {
        await Item.findOneAndUpdate({ _id: req.params.id }, updateValues, {
            new: true,
        });

        return res.send({ status: 'success', message: 'Item successfully updated' });
    } catch (err) {
        return res.status(500).send({ status: 'error', message: err.toString() })
    }
}

const itemImage = async (req, res) => {
    const imageUri = process.env.SERVER_URL + '/' + req.file.path.replace(/\\/g, '/').replace('public/', '');

    return res.send({ imageUri })
};

const deleteItem = async (req, res) => {
    try {
        await Item.findOneAndUpdate({ _id: req.params.id }, { status: 'deleted' }, {
            new: true,
        });

        return res.send({ status: 'success', message: 'Item successfully deleted' });
    } catch (err) {
        return res.status(500).send({ status: 'error', message: err.toString() })
    }
}

const manageItemStatus = async (req, res) => {
    const updateValues = req.body;
    try {
        await Item.findOneAndUpdate({ _id: req.params.id }, updateValues, {
            new: true,
        });
        return res.send({ status: 'success', message: 'Item Status successfully updated' });
    } catch(error) {
        return res.status(500).send({ status: 'error', message: error.toString() })
    }
};

const getItem = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Malformed Item id');
    }

    const item = await Item.findById(req.params.id).populate('createBy').populate('requestBy').select('-__v');
    if (!item) {
        return res.status(400).send('item not found');
    }
    return res.send(item);
};


module.exports = {
    getItems,
    createItem,
    itemImage,
    deleteItem,
    manageItemStatus,
    getItem,
    updateItem,
}