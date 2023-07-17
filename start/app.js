require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express');

const app = express();
const connectdb = require('./data/connectdb');
const errorhandlerMiddleware = require('./middleware/errorhandler');
const authrouter = require('./route/authRouter');
const orderRouter = require('./route/orderRouter');
const productRouter = require('./route/productapi');

app.use(cors())
app.use(express.json())
app.use('/api/v1/products',productRouter)
app.use('/api/v1/order',orderRouter);
app.use('/api/v1/auth',authrouter)
app.use(errorhandlerMiddleware);




console.log(process.env.MONGO_URI)
const start = async()=>{
  try {
    console.log(process.env.PORT)
    await connectdb(process.env.MONGO_URI) ;
       app.listen(process.env.PORT||3000) 
  } catch (error) {
    console.log(error)
  }
}
start()