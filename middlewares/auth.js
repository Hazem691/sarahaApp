import jwt from "jsonwebtoken";
import { userModel } from "../db/models/user.model.js";



export const auth = ()=>{
    return async (req,res,next)=>{
           const {token} = req.headers ;
           if(!token){
               res.json({msg : "Token is not exist ..."}) ;
           }
           const decoded = jwt.verify(token , 'loginToken') ;
           if(!decoded?.email){
              res.json({msg : "Invalid payload ..."});
           }
           const user = await userModel.findOne({email : decoded.email});
           if(!user){
            res.json({msg : "user is not found"}) ;
           }
           req.user = user ;
           next() ;        
    }
}