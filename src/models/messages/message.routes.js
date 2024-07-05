import { Router } from "express";
import { createMessage, deleteMessages, readMyMessages } from "./message.controller.js";
import { auth } from "../../../middlewares/auth.js";
import { validation } from "../../../middlewares/validation.js";
import { createMessageValidation } from "./message.validation.js";



const router = Router() ;

router.post('/createMessage',validation(createMessageValidation),auth(),createMessage) ;
router.get('/readMyMessages',auth(),readMyMessages) ;
router.delete('/deleteMessages/:id',auth(),deleteMessages) ;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhemVtc2FiZXI2MDBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE3MjAxNjg0MTh9.fwGXDQMVVDPuJ3tiqbkOHl8dhMVmzohzVlVjpwL4OIc

export default router ;