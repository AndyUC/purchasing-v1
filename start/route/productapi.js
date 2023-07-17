const express = require('express')
const authMiddleware=require('../middleware/authentication')
const uploadImage = require('../middleware/cloudinary')
const productRouter = express.Router();
const {getallproduct,getproduct,createproduct,deleteproduct,updateproduct}= require('../controler/product')
productRouter.route('/').post(authMiddleware,uploadImage.single('images'),createproduct).get(getallproduct)
productRouter.route('/:id').get(getproduct).delete(authMiddleware,deleteproduct).patch(authMiddleware,uploadImage.single('images'),updateproduct)
module.exports = productRouter;