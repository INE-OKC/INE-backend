const user = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
    try{
        const users = await user.find();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error});
    }
};

module.exports = {
    getAllUsers
};
