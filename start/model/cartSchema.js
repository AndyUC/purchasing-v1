const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    productid:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'Please insert your Product'],
        ref: 'ProductSchema'
    },
    price:{
        type:Number,
        required:[true,'Please insert Price']
    },
    size:{
        type:String,
        enum:{
            values:['sizeS','sizeM','sizeL','size39','size40','size41','size42'],
            message:'{VALUE} is not size we have'
        },
        required:[true,'plese insert your Size']
    },
    quantity:{
        type:Number,
        required:[true,'please insert quantity'],
        validate:{
            validator:Number.isInteger,
            message:'{VALUE} is not an unsign integer value'
        }
    }
})
module.exports= mongoose.model('CartSchema',CartSchema);