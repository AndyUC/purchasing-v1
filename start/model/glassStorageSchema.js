const mongoose = require('mongoose');
const GlassStorageSchema = new mongoose.Schema(
   { 
    size39:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    },
    size40:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    },
    size41:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    },
    size42:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    }

   }
)
module.exports =mongoose.model("Glass",GlassStorageSchema)