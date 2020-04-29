const mailer=require('nodemailer');
const {Hello}=require("./HelloTemplate");
const {Thanks}=require('./InfoTemplate');
const express=require('express');
const router=express.Router();

router.post('/sender',async(req,res)=>{
   
        const smtpTransport=await mailer.createTransport({
            service:"gmail",
          
            auth:{
                user:'mydummy1243@gmail.com',
                pass:'dummy'
            }
        });
        
       
    const getEmailData=(to,name,template)=>{

        let data=null;
    
        switch(template){
            case "hello":
                data={
                    from: "Baskaran Ajiharan <mydummy1243@gmail.com>",
                    to:to,
                    subject:`Hello${name}`,
                    html:Hello(name)
                }
                break;
            case "thanks":
                data={
                    from: "Baskaran Ajiharan <mydummy1243@gmail.com>",
                    to:to,
                    subject:`Thanks${name}`,
                    html:Thanks(name)
                }
                break;
            default:
                data;
                
        }
    
        return data;
    
    }
    const mail=await getEmailData(req.body.tomail,req.body.message,"hello");
        
    
        smtpTransport.sendMail(mail,(error,response)=>{
          
            if(error){
                console.log("MyError",error);
                res.status(400).json("Mail is not sent");
            }else{
                console.log("Mail sent Successfully");
                res.status(200).json("Mail sent Successfully")
            }
          
        });

    smtpTransport.close();   
    
});

module.exports=router;





