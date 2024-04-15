const Item = require("../models/Item");
const ItemRequest = require("../models/ItemRequest");
const { ObjectId } = require('mongodb');

const createItemRequest = async (req, res) => {

    const existCheck = await ItemRequest.findOne({ item: new ObjectId(req.body.itemId), requestBy: req.user._id });
    if (existCheck) { return res.status(400).send({ message: 'You have already requested.' }); }
    const itemRequest = new ItemRequest({
        item: req.body.itemId,
        status: 'request',
        requestBy: req.user._id
    });

    try {
        const savedItemRequest = await itemRequest.save();

        return res.send({ itemRequest: savedItemRequest, message: 'Item Request successfully created' });
    } catch (err) {
        return res.status(400).send(err);
    }
}

const getNeedyItemRequests = async (req, res) => {
    const filterQuery = { requestBy: req.user._id };

    try {
        const itemRequests = await ItemRequest.find(filterQuery)
            .populate({
                path: 'item'
            })
            .populate({
                path: 'requestBy'
            })
            .select("-__v");

        return res.send({ status: 'success', itemRequests: itemRequests });
    } catch (err) {
        return res.status(400).send(err);
    }
};

const getDonatorItemRequests = async (req, res) => {
    try {
        const itemRequests = await ItemRequest.aggregate([
            {
                $match: { status: 'request' }
            },
            {
                $lookup: {
                    from: 'items',
                    localField: 'item',
                    foreignField: '_id',
                    as: 'item'
                }
            },
            {
                $match: { 'item.createBy': new ObjectId(req.user._id) }
            }
        ]);

        return res.send({ status: 'success', itemRequests: itemRequests });
    } catch (err) {
        return res.status(400).send(err);
    }
};

const manageItemRequestStatus = async (req, res) => {
    const updateValues = req.body;
    try {
        const itemRequest = await ItemRequest.findOneAndUpdate({ _id: req.params.id }, updateValues, {
            new: true,
        });

        if (updateValues.status == 'approved') {
            await Item.findOneAndUpdate({ _id: itemRequest.item }, updateValues, {
                new: true,
            });
        }
        return res.send({ status: 'success', message: 'Item Request Status successfully changed' });
    } catch(error) {
        return res.status(500).send({ status: 'error', message: error.toString() })
    }
}

module.exports = {
    createItemRequest,
    getNeedyItemRequests,
    getDonatorItemRequests,
    manageItemRequestStatus,
}