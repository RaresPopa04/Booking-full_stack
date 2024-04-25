import User from "../models/User.js";

export const createUser = async (req,res,next)=>{
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save();     
        res.status(200).json(savedUser) 
    }   
    catch(err){
        next(err)
    }
}
export const deleteUser = async (req,res,next)=>{
    try {
        const User = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    }
    catch(err){
        next(err)
    }
}
export const getUsers = async (req,res,next)=>{
    try {
        const Users = await User.find()
        res.status(200).json(Users)
    }
    catch(err){
        next(err)
    }
}
export const getUser = async (req,res,next)=>{
    try {
        const User = await User.findById(req.params.id)
        res.status(200).json(User)
    }
    catch(err){
        next(err)
    }
}

export const editUser = async (req,res,next)=>{
    try{
        const User = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(User)
    }catch(err){
        next(err)
    }
}