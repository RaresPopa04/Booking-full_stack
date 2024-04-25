import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
dotenv.config();
const app = express()


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    // You can specify multiple origins by separating them with commas:
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001, http://example.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Optional, if you're using cookies or sessions
    next();
  });

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Database");
    } catch (error) {
        throw error
}
}

mongoose.connection.on('disconnected',()=>{
    console.log("disconnected");
})

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/users",usersRoute)

 app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong"

    
    return res.status(500).json({
        success : false,
        status:status,
        message:message,
        stack:err.stack
    });
 })

app.listen(3000,()=>{
    connect();
    console.log("Connected")
})