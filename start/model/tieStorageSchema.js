const mongoose = require('mongoose');
const TieStorageSchema = new mongoose.Schema(
   { 
    sizeS:{
        type:Number,
        required:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
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
    }

   }
)

module.exports =mongoose.model("Tie",TieStorageSchema)