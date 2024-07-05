import nodemailer from 'nodemailer';


export const sendEmail = async(to,subject,html)=>{


    const transporter = nodemailer.createTransport({
        service :"gmail",
        auth: {
            user: "hazemsaber142@gmail.com",
            pass: "wombgbppdrjddkxi",
        },
    })
    
    
    const info = await transporter.sendMail({
        from: "hazemsaber142@gmail.com",
        to:to?to:"",
        subject : subject ? subject : "",
        html : html ? html : "", 
    })

    console.log(info);
    if(info.accepted.length){
        return true;
    }else{
        return false ;
    }




}

