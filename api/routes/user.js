import express  from "express";
import { getUser,deleteUser,updateUser,getallUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken ,verifyUser} from "../utils/verifytokens.js";

const router =express();

//  router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello user,you're logged in")
//  })

//  router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
//    res.send("Hello user,you're logged in and you can delete")
// })
// router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
//    res.send("Hello Admin,you're logged in and you can delete")
// })



//update
router.put("/:id",verifyUser,updateUser)

//Delete
router.delete("/:id",verifyUser,deleteUser)

//get
router.get("/:id",verifyUser,getUser)

//getAll
router.get("/",verifyAdmin,getallUser)

export default router;