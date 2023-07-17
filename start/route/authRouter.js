const express = require('express')
const authrouter = express.Router();
const login= require('../controler/auth')
authrouter.post('/login',login)
module.exports = authrouter