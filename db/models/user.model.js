import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name : {
        type : String ,
        required : true 
    } ,
    email : {
        type : String ,
        required : true 
    },
    password : {
        type : String ,
        required : true
    } , 
    OTPconfirmation : {
        type : Boolean ,
        default : false ,
        required : true,
    }
}) ;


export const userModel = model('user' , userSchema) ;