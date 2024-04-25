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