import Hotel from "../models/Hotel.js";

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body)
    console.log(req.user)

    try {
        const savedHotel = await newHotel.save();     
        res.status(200).json(savedHotel) 
    }   
    catch(err){
        next(err)
    }
}
export const deleteHotel = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted")
    }
    catch(err){
        next(err)
    }
}
export const getHotels = async (req,res,next)=>{
    const {min,max,limit, ...others} = req.query
    try {
        const hotels = await Hotel.find({
            cheapestPrice:{$gte:min || 1,$lte:max|| 100000},
            ...others
        }).limit(limit)
        res.status(200).json(hotels)
    }
    catch(err){
        next(err)
    }
}
export const getHotel = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }
    catch(err){
        next(err)
    }
}

export const editHotel = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async(req,res,next)=>{
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const apartmentCount =await  Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})
    try {
        
        res.status(200).json([
            {
                type:"hotel",
                count:hotelCount
            },
            {
                type:"apartment",
                count:apartmentCount
            },
            {
                type:"resort",
                count:resortCount
            },
            {
                type:"villa",
                count:villaCount
            },
            {
                type:"cabin",
                count:cabinCount
            },

        ])
    } catch (error) {
        next(error)
    }
}