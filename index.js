import express from 'express';
import connectionDB from './db/connection.js';
import userRouter from './src/models/users/user.routes.js';
import messageRouter from './src/models/messages/message.routes.js';

const app = express();
const port = 3000;


app.use(express.json());


app.use(userRouter);
app.use(messageRouter) ;


connectionDB();
export class AppError extends Error {
    constructor(message) {
        super(message);
       
    }
}

app.use('*',(req,res,next)=>{
    const err = new AppError(`invalid url`) ;
    next(err) ;
})
app.use((err, req, res, next) => {
    res.json({err : err.message}) ;
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Error handling middleware

