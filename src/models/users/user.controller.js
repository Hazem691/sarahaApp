import bcrypt from "bcrypt";
import { userModel } from "../../../db/models/user.model.js";
import { sendEmail } from "../../services/sendEmail.js";
import jwt from "jsonwebtoken";
import { decode } from "punycode";
import { AppError } from "../../../index.js";
const asyncHandler = (fun)=>{
    return (req,res,next)=>{

        fun(req,res,next).catch((err)=>{
            next(err) ;
        })

    }
}
export const signUp = asyncHandler(async (req, res, next) => {
   
    const { name, email, password } = req.body;
    const userExit = await userModel.findOne({email});
    if(userExit){
        const error = new AppError("email is already exist..") ;
        next(error) ;
    }
    else{
    const hashpassword = bcrypt.hashSync(password,8) ;
    const user = await userModel.create({name,email,password:hashpassword}) ;
    const token = jwt.sign({email},"confirmEmail") ;
    const link = `http://localhost:3000/confirmEmail/${token}` ;
    const checkEmail = await sendEmail(email, "OTP" , `<a href = '${link}'>Confirm Email</a>`)
    if(!checkEmail){
        res.json({msg : "Not verified email"})
    }
    res.json({msg : "done",user}); 
    }


}) ;


export const signIn = asyncHandler(async(req,res,next)=>{
    const {email ,password} = req.body ;
    const user = await userModel.findOne({email});
    if(!user){
       const err = new AppError('user Is not exist you should signUp first') ;
       next(err) ;
    }
    const match = bcrypt.compareSync(password , user.password) ;
    if(!match){
        const err = new AppError('Wrong password you should write correct password ..') ;
        next(err) ;
    }
    else{
       const token = jwt.sign({email,password},"loginToken") ;
       res.json({msg : "done" , token}) ;
    }
}
)



export const confirmEmail = asyncHandler(async(req,res,next)=>{
    
    const { token } = req.params;
    
    // Verify the token
    const decoded = jwt.verify(token, "confirmEmail");
    
    if (!decoded?.email) {
        
        const err = new AppError('invalid payload') ;
        next(err) ;
    }

    // Find and update the user
    const user = await userModel.findOneAndUpdate(
        { email: decoded.email, OTPconfirmation: false },
        { OTPconfirmation: true },
        { new: true }
    );

    if (!user) {
        const err = new AppError('user is not found') ;
        next(err) ;
       
    }

    res.status(200).json({ msg: "Email confirmed successfully" });

}
) 