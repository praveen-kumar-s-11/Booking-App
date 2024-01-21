import express  from "express";
import Hotel from "../models/hotels.js";
import { createError } from "../utils/error.js";
import { countByCity,countByType, createHotel, deleteHotel, getHotel, getallHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifytokens.js";

const router = express();


//create
router.post("/",verifyAdmin, createHotel);

//update
router.put("/:id",verifyAdmin,updateHotel)

//Delete
router.delete("/:id",verifyAdmin,deleteHotel)

//get
router.get("/find/:id",getHotel)

//getAll
router.get("/",getallHotel)

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)

export default router;