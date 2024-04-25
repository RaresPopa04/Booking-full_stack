import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"

export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push: {rooms:savedRoom._id}
            })
        } catch (error) {
            next(error)
        }

        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async (req,res,next)=>{
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(req.params.hotelId, {
                $pull:{rooms: req.params.id}
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("Deleted")
    }
    catch(err){
        next(err)
    }
}
export const getRooms = async (req,res,next)=>{
    try {
        const Rooms = await Room.find()
        res.status(200).json(Rooms)
    }
    catch(err){
        next(err)
    }
}
export const getRoom = async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }
    catch(err){
        next(err)
    }
}

export const editRoom = async (req,res,next)=>{
    try{
        const room = await Room.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}