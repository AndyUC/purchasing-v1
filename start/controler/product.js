const {StatusCodes} = require('http-status-codes');
const BadrequestError = require('../middleware/badrequest');
const ChainStorageSchema = require('../model/chainStorageSchema');
const GlassStorageSchema = require('../model/glassStorageSchema');
const cloudinary = require('cloudinary').v2;


const ProductSchema = require('../model/productSchema');
const TieStorageSchema = require('../model/tieStorageSchema');
const WatchStorageSchema = require('../model/watchStorageSchema');
const fnsize= require('./storagefunc');





const createproduct = async (req,res)=>{
    const {productname,price,description,catalog}=req.body
    const fileData= req.file
    const imgpath = fileData?.path
    const filename = fileData?.filename
    if(price<=0){
      throw new BadrequestError('Price has to unsign')
    }
    const {sizeS,sizeM,sizeL,size39,size40,size41,size42}= req.body;
    const size={sizeS,sizeM,sizeL,size39,size40,size41,size42}
    const queryObject ={ productname, price, imgpath, description, catalog,filename };
    console.log(queryObject,size)
        const storage = await fnsize(catalog,size,filename)
        const storageid = storage._id;

      const products = await (await ProductSchema.create({...queryObject,storageid}));
        res.status(200).json(products)
     
} 

const getallproduct = async (req,res)=>{
  const {catalog,maxprice,minprice,sort} = req.query;
  const queryObject={}
  if(catalog){
    queryObject.catalog = catalog
  }
  
  if(minprice||maxprice){
    queryObject.price={}
    if(minprice){
    queryObject.price['$gte']= minprice}
    if(maxprice){
    queryObject.price['$lte'] = maxprice
    }
    if(minprice&&maxprice){
      if(maxprice&&minprice&&(Number(maxprice)<Number(minprice))){
        throw new BadrequestError('Max price has to more than min')
      }
    }
    }
    
  
    const products = await ProductSchema.find(queryObject).sort(sort)
     res.status(200).json(products)
 }
 

const getproduct = async (req,res)=>{
    const {id: productid}= req.params
    const product =await ProductSchema.findOne({_id:productid}).populate('storageid')
    if(!product){
        throw new NotfoundError(`No product with ID${productid}`);
    }
  
    res.status(201).json(product)
    }
 
 
const deleteproduct = async (req,res)=> {
    const {id: productid}= req.params
    const product = await ProductSchema.findOneAndDelete({_id:productid});  
    if(!product){
        throw new NotfoundError(`No product with ID${productid}`);
       
    }
    cloudinary.uploader.destroy(product.filename);
    res.status(201).json({product:null,status:'Success'})
}

const updateproduct = async (req,res)=>{
  const {id: productid}= req.params

  const {productname,price,description,catalog}=req.body;
  const fileData= req.file
  const {sizeS,sizeM,sizeL,size39,size40,size41,size42}= req.body;
  const size={sizeS,sizeM,sizeL,size39,size40,size41,size42};
  
  const queryObject={};
  if(productname){
    queryObject.productname=productname;
  }
  if(price){
    queryObject.price=price;
  }
  if(description){
    queryObject.description=description;
  }
  if(catalog){
    queryObject.catalog=catalog;
  }
  if(fileData){
    queryObject.imgpath=fileData.path
  }
  const oldproduct = await ProductSchema.findById(productid);

  const newstorage = await fnsize(catalog,size,fileData?.filename);
   
   queryObject.storageid = newstorage._id;
  console.log(queryObject)
  const product = await ProductSchema.findOneAndUpdate({_id:productid},queryObject,{returnOriginal: false})
  if(product){
    let oldstorage = {}
    switch(oldproduct.catalog){
      case 'Glass':
         oldstorage = await GlassStorageSchema.findByIdAndDelete(oldproduct.storageid)
        break;
      case 'Chain':
        oldstorage = await ChainStorageSchema.findByIdAndDelete(oldproduct.storageid)
        break;
      case 'Tie':
          oldstorage = await TieStorageSchema.findByIdAndDelete(oldproduct.storageid)
           break;
      case 'Watch':
         oldstorage = await WatchStorageSchema.findByIdAndDelete(oldproduct.storageid)
        break;
      default:
        break;
    }
     console.log(oldstorage)
     res.status(200).json(product)
  }                                    
  
  }

    
module.exports = {getallproduct,createproduct,getproduct,deleteproduct,updateproduct} 