import { Router } from "express";
import { confirmEmail, signIn, signUp } from "./user.controller.js";
import { validation } from "../../../middlewares/validation.js";
import { signInValidation, signUpValidation } from "./user.validation.js";


const router = Router() ;

router.post('/signUp',validation(signUpValidation),signUp) ;

router.get('/confirmEmail/:token',confirmEmail) ;

router.post('/signIn',validation(signInValidation),signIn) ;

export default router ;
