const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { createUserPayload, attachCookiesToResponse} = require('../utils');

const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const emailExists = await User.findOne({email});
        if (emailExists){
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email already exists' });
        }
        const user = await User.create({ name, email, password });
        res.status(StatusCodes.CREATED).json({ user });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

const login = async (req, res) => {
        const {email, password} = req.body;

        if (!email || !password){
            throw new BadRequestError('Please provide an email and password')
        }
    
        const user = await User.findOne({email});
    
        if (!user){
            throw new UnauthenticatedError('Invalid Credentials')
        }
    
        const isPasswordCorrect = await user.comparePassword(password);
    
        if (!isPasswordCorrect){
            throw new UnauthenticatedError('Invalid Credentials')
        }
    
        const userPayload = createUserPayload(user);
        attachCookiesToResponse({ res, user: userPayload});
    
        res.status(StatusCodes.OK).json({ user: userPayload }); 

    
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })

    res.status(StatusCodes.OK).json({ message: 'User logged out'})
}

module.exports = {
    register,
    login,
    logout
};
