import { ObjectId } from "bson";
import messageModel from "../../../db/models/message.model.js";
import { AppError } from "../../../index.js";
const asyncHandler = (fun)=>{
    return (req,res,next)=>{

        fun(req,res,next).catch((err)=>{
            next(err) ;
        })

    }
}
export const createMessage = asyncHandler(async (req, res, next) => {
   
        const { content, receiverId } = req.body;
        const message = await messageModel.create({ content, receiverId });
        
        res.status(200).json({ msg: 'done', message }); // Correct usage of res.status().json()
    
}) 


export const readMyMessages = asyncHandler( async(req,res,next)=>{
    

        const messages = await messageModel.find({receiverId : req.user.id}) ;
        if(!messages){
            const err = new AppError('there is no messages here yet ...') ;
            next(err) ;
        }
        res.json({msg : 'done' , messages}) ;
        
  
    
})


export const deleteMessages = asyncHandler(async(req,res,next)=>{
    
      const {id}  = req.params ;
      const message = await messageModel.findByIdAndDelete(id) ;
      if(!message){
        const err = new AppError('there  message is not exist ...') ;
        next(err) ;
      }
      
      res.json({msg : "done",message}) ;
  }) 
