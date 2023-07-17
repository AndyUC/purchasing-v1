const OrderSchema = require("../model/orderSchema");
const ProductSchema = require("../model/productSchema");
const CartSchema= require('../model/cartSchema');
const ChainStorageSchema = require("../model/chainStorageSchema");
const TieStorageSchema = require("../model/tieStorageSchema");
const GlassStorageSchema = require("../model/glassStorageSchema");
const WatchStorageSchema = require("../model/watchStorageSchema");
const BadrequestError = require("../middleware/badrequest");
const NotfoundError= require('../middleware/notfound');
const { StatusCodes } = require("http-status-codes");

const createorder = async (req,res)=>{
    const {orderName,phoneNumber,address,email,cartdata}= req.body;
    const queryObject = {orderName,phoneNumber,address,email};
  
    if(Array.isArray(cartdata)){
        let cartProducts=[];
        let cart =[];
        for(let i=0;i<cartdata.length;i++){
            let {productid,size,quantity}= cartdata[i];
            let product = await ProductSchema.findById(productid).populate('storageid');
            if(!product){
                throw new NotfoundError(`No product with ID${productid}`);
            }
            else{
                if(product.storageid===null){
                    throw new BadrequestError('some thing wrong with this Item')
                }
                if(quantity<=product.storageid[size]){ 
                    const price = product.price
                    let currentCart = await CartSchema.create({productid,size,quantity});
                    cart.push(currentCart._id);
                    cartProducts.push({productid,price,size,quantity});
                }else{
                 throw new BadrequestError('this product ('+product._id+') has not enough')
                }
            }
        }
        const order = await (await OrderSchema.create({...queryObject,cart:cart})).populate('cart');
        for(let i=0;i<cartProducts.length;i++){
            const product = await ProductSchema.findById(cartProducts[i].productid)
            const newstorage = await product.orderHandle(cartProducts[i].size,cartProducts[i].quantity)
         res.status(StatusCodes.OK).json(order)
        }}
    else{
        throw new BadrequestError('Cartdata had to Array')
    }
}   
const getorder = async (req,res)=>{
    const {orderStatus}= req.query 
    if(orderStatus){
        const orders = await OrderSchema.find({orderStatus:orderStatus}).populate('cart')
        return res.status(200).json({orders})
    }
    const orders = await OrderSchema.find().populate('cart')
    res.status(200).json({orders})
}
const updateorder = async(req,res)=>{
    const {id:orderid} = req.params;
    const {status} = req.body;
    const order= await OrderSchema.findByIdAndUpdate(orderid,{orderStatus:status},{returnOriginal:false}).populate('cart');
    res.status(200).json({order})
}
module.exports ={createorder,getorder,updateorder} 