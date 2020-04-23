const router=require('express').Router();
const UserSchema=require('./UserSchema');
const AdminSchema=require('../admin/AdminSchema');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');


router.get('/register',(req,res)=>{
    UserSchema.find().then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        res.status(400).json(err);
    })
    
});

router.post('/register',async (req,res)=>{
    UserSchema.findOne({email:req.body.email}).then(async data=>{
       let admin_data=await AdminSchema.findOne({email:req.body.email});
        if(data || admin_data){
            return   res.status(400).json("Email Already Exists");
        }
       
        let hash=await bcryptjs.hash(req.body.password,10);
       
        const registerPost=new UserSchema({
            name:req.body.name,
            email:req.body.email,
            password:hash,
        });

        registerPost.save().then(regData=>{

            res.status(200).json(regData);

        }).catch(regerr=>{
            res.status(400).json(err);
        })

    }).catch(err=>{
         res.status(500).json(err);
    })

});

router.post('/login',async(req,res)=>{

    UserSchema.findOne({email:req.body.email}).then(async data=>{
        if(data){
            let validPass=await bcryptjs.compare(req.body.password,data.password);
            if(!validPass){
                return res.status(400).json("Invalid Password");
            }

            let UserToken=await jwt.sign({_id:data._id,email:data.email},"react");
            res.header('auth',UserToken).send(UserToken);

        }else{
            return res.status(400).json("Sorry Email is not exists");
        }

    }).catch(err=>{
        res.status(400).json(err);
    })
});

router.get('/getUser',(req,res,next)=>{
    var token=req.header('auth');
    req.token=token;
    next();

},(req,res)=>{

    jwt.verify(req.token,'react',(err,data)=>{
        if(err){
            console.log(err);
            res.sendStatus(403);//forbidden
        }else{
            UserSchema.findOne({email:jwt.decode(req.token).email}).select(['-password']).then(resdata=>{
                res.status(200).json(resdata);
            }).catch(err=>{
                res.status(400).json(err);
            })
        }
            
    });
});



module.exports=router;
