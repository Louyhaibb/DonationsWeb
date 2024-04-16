const Item = require("../models/Item");
const ItemRequest = require("../models/ItemRequest");
const User = require("../models/User")

const getAdminDashboard = async (req, res) => {
    try {
        const users = await User.countDocuments({});
        const donations = await Item.countDocuments({ status: { $ne: 'deleted' } });
        const requestedDonations = await ItemRequest.countDocuments({ status: 'request' });
        const approvedDonations = await ItemRequest.countDocuments({ status: 'approved' });

        res.status(200).send({ users, donations, requestedDonations, approvedDonations });
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    getAdminDashboard,
}