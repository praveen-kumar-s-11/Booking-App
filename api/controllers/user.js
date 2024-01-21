import user from "../models/users.js";

//update
export const updateUser =async(req,res,next) =>{
    
    try{
        const updatedUser=await user.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }catch(err){   
        next(err)
    }
}
//delete
export const deleteUser =async(req,res,next) =>{
    
    try{
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    }catch(err){    
        next(err)
    }
}
//get
export const getUser =async(req,res,next) =>{
    
    try{
        const User=await user.findById(req.params.id)
        res.status(200).json(User)
    }catch(err){   
        next(err)
    }
}
//getall
export const getallUser =async(req,res,next) =>{
    const failed=true
    try{
        const User=await user.find()
        res.status(200).json(User)
    }catch(err){   
        next(err)
    }
}