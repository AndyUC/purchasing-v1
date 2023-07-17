
const WatchStorageSchema = require('../model/watchStorageSchema');
const TieStorageSchema = require('../model/tieStorageSchema');
const GlassStorageSchema = require('../model/glassStorageSchema');
const ChainStorageSchema = require('../model/chainStorageSchema');
const { json } = require('express');
const BadrequestError = require('../middleware/badrequest');
const { createcustomerror } = require('../middleware/error');
const { StatusCodes } = require('http-status-codes');

const fnsize= async (catalog,size,filename)=>{
const {sizeS,sizeM,sizeL,size39,size40,size41,size42}=size;
if(catalog==='Glass'){
  sizeandqty={
    sizeS:sizeS,
    sizeM:sizeM,
    sizeL:sizeL,
    }
  if(sizeS>=0&&sizeM>=0&&sizeL>=0){
    try{
      return await GlassStorageSchema.create({...sizeandqty});
    }catch(error){
      return createcustomerror(error,StatusCodes.BAD_REQUEST,filename)
    };
  }else{
     return createcustomerror('size quantity has to Unsign',StatusCodes.BAD_REQUEST,filename)
  }
 
}else{
  if(catalog==="Chain"){
    
    sizeandqty={
      sizeS:sizeS,
      sizeM:sizeM,
      sizeL:sizeL,
      }
      if(sizeS>=0&&sizeM>=0&&sizeL>=0){
        try{
          return await ChainStorageSchema.create(sizeandqty)
       }catch(error){
         return createcustomerror(error,StatusCodes.BAD_REQUEST,filename)
       }
      }else{
        return createcustomerror('size quantity has to Unsign',StatusCodes.BAD_REQUEST,filename)
        
      }
      
  }else{
    if(catalog==='Tie'){
      sizeandqty={
        size39:size39,
        size40:size40,
        size41:size41,
        size42:size42,
        }
        if(size39>=0&&size40>=0&&size41>=0&&size42>=0){
          try{
            return await TieStorageSchema.create({...sizeandqty})           
         }catch(error){
           return createcustomerror(error,StatusCodes.BAD_REQUEST,filename)
           
         };
        }else{
           return createcustomerror('size quantity has to Unsign',StatusCodes.BAD_REQUEST,filename)
        }
        
    }else{
      if(catalog==='Watch'){
        sizeandqty={
          size39:size39,
          size40:size40,
          size41:size41,
          size42:size42,
          }
          if(size39>=0&&size40>=0&&size41>=0&&size42>=0){
            try{
              return await WatchStorageSchema.create({...sizeandqty})           
           }catch(error){ 
            return createcustomerror(error,StatusCodes.BAD_REQUEST,filename) 
           };
          }else{
             return createcustomerror('size quantity has to Unsign',StatusCodes.BAD_REQUEST,filename)
          }
          
      }else{
        return createcustomerror('Please insert valid Catalog',StatusCodes.BAD_REQUEST,filename)
      }
    }
  }
}
}


module.exports= fnsize;