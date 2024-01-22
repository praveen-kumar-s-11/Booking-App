import hotel from "../models/hotels.js";
//create
export const createHotel =async(req,res,next) =>{
    const newHotel =new hotel(req.body)
    try{
        console.log("hello",req.body);
        
        const savedHotel=await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){    
        next(err)
    }
}
//update
export const updateHotel =async(req,res,next) =>{
    
    try{
        const updatededHotel=await hotel.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(updatededHotel)
    }catch(err){   
        next(err)
    }
}
//delete
export const deleteHotel =async(req,res,next) =>{
    
    try{
        await hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    }catch(err){    
        next(err)
    }
}
//get
export const getHotel =async(req,res,next) =>{
    
    try{
        const Hotel=await hotel.findById(req.params.id)
        res.status(200).json(Hotel)
    }catch(err){   
        next(err)
    }
}
//getall
export const getallHotel = async (req, res, next) => {
    const {max,min,...others}=req.query;
    console.log(others);
    try {
        console.log('Query Parameters:', req.query);
        const hotels = await hotel.find({cheapestPrice:{
            $gt:min||1 ,$lt:max||999
        }}).limit(req.query.limit);
        console.log('Result:', hotels);
        res.status(200).json(hotels);
    } catch (err) {
        console.error('Error:', err);
        next(err);
    }
};



export const countByCity =async(req,res,next) =>{
    const cities= req.query.cities.split(",")
    try{
        const list=await Promise.all(cities.map(city =>{
            return hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err){   
        next(err)
    }
}

export const countByType =async(req,res,next) =>{
    try{
        const hotelCount= await hotel.countDocuments({type:"hotel"})
        const apartmentCount= await hotel.countDocuments({type:"apartment"})
        const resortCount=await hotel.countDocuments({type:"resort"})
        const villaCount=await hotel.countDocuments({type:"villa"})
        const cabinCount=await hotel.countDocuments({type:"cabin"})
        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount},
            
        ])
    }catch(err){   
        next(err)
    }
}