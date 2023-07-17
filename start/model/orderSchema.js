
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
  {
    orderName:{
      type:String,
      required:[true,'please insert your Name']
    },
    phoneNumber:{
      type: String,
      required:[true,'please insert your Phome Number'],
      match:[/^[0-9\-\+]{9,15}$/,'please provide valid Phone Number ']
    },
    address:{
      type:String,
      required:[true,'please insert your Address']
    },
    email:{
      type:String,
      required:[true,'please insert your Email'],
      match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
    },
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:'CartSchema'}],
    orderStatus:{
      type:String,
      enum:['packaging','shiping','completed'],
      default:'packaging'
    }
  },
  {timestamps:true}
)
module.exports = mongoose.model('OrderSchema',OrderSchema)