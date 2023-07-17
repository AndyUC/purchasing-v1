const { StatusCodes } = require('http-status-codes')
const BadrequestError = require('./badrequest')
const {CustomApiError} = require('./error')
const NotfoundError = require('./notfound')
const cloudinary = require('cloudinary').v2;


const errorhandlerMiddleware  = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message||'something wrong here'
    }
    if(err instanceof CustomApiError||err instanceof NotfoundError){
        return res.status(err.status||500).json({msg: err.message})    
    }
    if(err.name==='ValidationError'){
        const mss = err.message.split(' ');
        console.log(mss)
        if(mss[1]==='ProductSchema'){
            const fileData = req.file;
            if(fileData){
                cloudinary.uploader.destroy(filename);
            }
        }
        const newmsg= err.message.split('validation failed:')
        customError.msg= newmsg[1]
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.name==='CastError'){
        customError.statusCode = StatusCodes.BAD_REQUEST,
        customError.msg = 'no job with ID: '+ err.value
    }
    console.log(err)
    return res.status(customError.statusCode).json({msg:customError.msg})

}

module.exports= errorhandlerMiddleware 