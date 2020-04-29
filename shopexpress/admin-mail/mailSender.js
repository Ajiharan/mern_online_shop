const mailer=require('nodemailer');
const {Hello}=require("./HelloTemplate");
const {Thanks}=require('./InfoTemplate');
let data_error="";
let data_res="";
// console.log(Hello("sd"));
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

const sendEmail=(to,name,type)=>{
    const smtpTransport=mailer.createTransport({
        service:"gmail",
      
        auth:{
            user:'mydummy1243@gmail.com',
            pass:'Dummy0000t%'
        }
    });
    const mail=getEmailData(to,name,type);
    console.log(mail);

    smtpTransport.sendMail(mail,(error,response)=>{
        data_res=response;
        data_error=error;
        if(error){
            console.log("MyError",error);
        }else{
            console.log("Mail sent Successfully");
           
        }
      
    });
   

    smtpTransport.close();
    // console.log(smtpTransport);
  
  
}

module.exports={sendEmail};