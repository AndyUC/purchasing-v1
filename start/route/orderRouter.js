const express = require('express')
const authMiddleware=require('../middleware/authentication')
const orderRouter = express.Router();
const {updateorder,createorder,getorder}= require('../controler/order')
orderRouter.route('/').post(createorder).get(authMiddleware,getorder)
orderRouter.route('/:id').patch(authMiddleware,updateorder)
module.exports = orderRouter;