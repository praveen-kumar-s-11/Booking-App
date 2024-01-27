import express  from "express";
import { createRoom,deleteRoom,getRoom,getallRoom,updateRoom, updateRoomAvalability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifytokens.js";

const router =express();


//create
router.post("/:hotelid",verifyAdmin, createRoom);

//update
router.put("/:id",verifyAdmin,updateRoom)
router.put("availability/:id",updateRoomAvalability)

//Delete
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

//get
router.get("/:id",getRoom)

//getAll
router.get("/",getallRoom)

 
export default router;