const User = require('../model/userSchema');
const {StatusCodes}= require('http-status-codes')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const BadrequestError = require('../middleware/badrequest');
const UnauthenticatedError = require('../middleware/unauthenticated');

const login = async (req,res) => {
    const {username, password} = req.body;
    if(!username||!password){
        throw new BadrequestError('please insert username and password')
    }
    const user = await User.findOne({username});
    if(!user){
        throw new UnauthenticatedError(`Invalid credentials`)
    }
   
    const ispasswordMatch = await user.comparePassword(password)
    if(!ispasswordMatch){
       throw new UnauthenticatedError(`Invalid credentials`)
    }
    const token =user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:username},token});
}

module.exports= login