const User = require("../models/User");
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltLength = 10;

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

const createUser = async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) { return res.status(400).send({ message: 'Email already exists' }); }

    // hash the password
    const salt = await bcrypt.genSalt(saltLength);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        status: req.body.role == 'admin' || req.body.role == 'donator' ? 'active' : 'pending'
    });

    try {
        const savedUser = await user.save();

        // remove password
        delete savedUser._doc.password;

        return res.send({ user: savedUser, message: 'User successfully created' });
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports ={
    personalMe,
    getUsers,
    getUser,
    deleteUser,
    manageStatus,
    updateUser,
    createUser,
}