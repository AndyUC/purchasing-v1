const mongoose = require('mongoose');
const WatchStorageSchema = new mongoose.Schema(
   { 
    size39:{
        type:Number,
        require:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    },
    size40:{
        type:Number,
        require:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
        
    },
    size41:{
        type:Number,
        require:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
        
    },
    size42:{
        type:Number,
        require:[true,'please insert Number'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
        
    }

   }
)

module.exports =mongoose.model("Watch",WatchStorageSchema)