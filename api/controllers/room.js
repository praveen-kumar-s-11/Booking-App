import Hotel from "../models/hotels.js"
import Room from "../models/rooms.js"
import {createError} from "../utils/error.js"

export const createRoom = async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push :{rooms:savedRoom._id}
            })
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}


//update
export const updateRoom =async(req,res,next) =>{
    
    try{
        const updatededRoom=await Room.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(updatededRoom)
    }catch(err){   
        next(err)
    }
}
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const roomId = req.params.id;

    try {
        console.log('Deleting room:', roomId);
        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: roomId },
            });

            console.log('Room deleted successfully.');
            res.status(200).json({ message: 'Room has been deleted' });
        } catch (err) {
            console.error('Error updating hotel:', err);
            next(err);
        }
    } catch (err) {
        console.error('Error deleting room:', err);
        next(err);
    }
};

//get
export const getRoom =async(req,res,next) =>{
    
    try{
        const room=await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch(err){   
        next(err) 
    }
}
//getall
export const getallRoom =async(req,res,next) =>{
    const failed=true
    try{
        const room=await Room.find()
        res.status(200).json(room)
    }catch(err){   
        next(err)
    }
}