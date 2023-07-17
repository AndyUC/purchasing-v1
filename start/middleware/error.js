const cloudinary = require('cloudinary').v2;

class CustomApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode;
    }
}
const createcustomerror = (msg,statusCode,filename)=>{
    if(filename){
        cloudinary.uploader.destroy(filename);
    }
    throw new CustomApiError(msg,statusCode||500);
}
module.exports = {createcustomerror,CustomApiError}