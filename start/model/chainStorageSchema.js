const mongoose = require('mongoose');
const productSchema = require('./productSchema');
const ChainStorageSchema = new mongoose.Schema(
   { 
    sizeS:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an integer value'
        }
    },
    sizeM:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    },
    sizeL:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    },
    }
)
 
module.exports =mongoose.model("Chain",ChainStorageSchema)