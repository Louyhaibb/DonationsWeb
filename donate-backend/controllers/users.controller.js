const router = require('express').Router();
const User = require("../models/User");
const verifyToken = require('../utils/verifyToken');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/profiles")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})

const personalMe = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v');

    return res.send({ user: user })
};

const getUsers = async (req, res) => {
    const roleFilter = req.query.role !== '' && typeof req.query.role !== 'undefined' ? { role: req.query.role } : {};
    const statusFilter = req.query.status !== '' && typeof req.query.status !== 'undefined' ? { status: req.query.status } : {};
    const searchQuery = typeof req.query.q !== 'undefined' ? req.query.q : '';
    const filterParams = {
        $and: [
            {
                $or: [
                    { firstName: { $regex: searchQuery, $options: 'i' } },
                    { lastName: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } },
                ],
            },
            roleFilter,
            statusFilter
        ],
    };
    const totalCount = await User.countDocuments({});
    const users = await User.find(filterParams).select('-password -__v');

    return res.send({
        totalCount,
        users,
        filteredCount: users.length,
    })
};

const getUser = async (req, res) => {

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Malformed user id');
    }

    const user = await User.findById(req.params.id).select('-password -__v');
    if (!user) {
        return res.status(400).send('user not found');
    }
    return res.send(user);
};

const deleteUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id });
    return res.send({ message: 'User successfully deleted!' });
};

const manageStatus = async (req, res) => {
    const updateValues = req.body;
    await User.findOneAndUpdate({ _id: req.params.id }, updateValues, {
        new: true,
    });
    
    return res.send({ message: 'User Status successfully updated' });
};

const updateUser = async (req, res) => {
    const updateValues = req.body;
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, updateValues, {
        new: true,
    }).select('-__v');
    return res.send({ updatedUser: updatedUser, message: 'User successfully updated' });
};

module.exports ={
    personalMe,
    getUsers,
    getUser,
    deleteUser,
    manageStatus,
    updateUser,
}