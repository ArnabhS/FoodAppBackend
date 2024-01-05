

const userModel = require('../models/userModel');

module.exports.getUser = async function getUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        if (user) {
            res.json(user);
        } else {
            return res.json({
                message: "User not found",
            });
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
}

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            Object.assign(user, dataToBeUpdated); // Use Object.assign to update user properties
            const updatedData = await user.save();
            res.json({
                message: "Data updated",
                data: updatedData,
            });
        } else {
            res.json({
                message: "User not found",
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            message: err.message,
        });
    }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: "User not found",
            });
        }
        res.json({
            message: "Data deleted",
        });
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
}

module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find();
        if (users) {
            res.json({
                message: 'Users retrieved',
                data: users,
            });
        }
    } catch (err) {
        res.json({
            message: err.message,
        });
    }
}
