const mongoose = require('mongoose');
const ChainStorageSchema = require('./chainStorageSchema');
const TieStorageSchema =require('./tieStorageSchema');
const WatchStorageSchema =require('./watchStorageSchema');
const GlassStorageSchema =require('./glassStorageSchema');

const ProductSchema = new mongoose.Schema({
    productname:{
        type: String,
        required:[true,'Please provide your Product Name'],
        maxlength:30
    },
    imgpath:{
        type: String,
        required:[true,'Please provide Image']
    },
    filename:{
        type:String,
    },
    description:{
        type: String,
        required:[true,'Please provide Description'],
        
    },
    price:{
        type: Number,
        required:[true,'Please provide price'],
        validate:{
            validator:Number.isFinite,
            message:'{VALUE} is not an number'
        }
    },
    catalog:{
      type: String,
      enum:['Chain', 'Glass','Tie','Watch'],
      required:true,
       message: '{VALUE} is not support'
      },
      storageid:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'please insert Storage'],
        refPath:'catalog'
        } 
      
    }
)

ProductSchema.methods.orderHandle = async function (size,quantity) {
    switch(this.catalog){
        case 'Chain':
        return await ChainStorageSchema.findByIdAndUpdate(this.storageid,{$inc:{[size]:-quantity}},{returnOriginal:false})
        break;
        case 'Tie':
            return await TieStorageSchema.findByIdAndUpdate(this.storageid,{$inc:{[size]:-quantity}},{returnOriginal:false})
        break;
        case 'Glass':
            return await GlassStorageSchema.findByIdAndUpdate(this.storageid,{$inc:{[size]:-quantity}},{returnOriginal:false})
        break;
        case 'Watch':
            return await WatchStorageSchema.findByIdAndUpdate(this.storageid,{$inc:{[size]:-quantity}},{returnOriginal:false})
        break;
        default:
        break;
        }
}

module.exports =mongoose.model("ProductSchema",ProductSchema)