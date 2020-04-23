const router=require('express').Router();
const AdminSchema=require('./AdminSchema');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.get('/login',(req,res)=>{
    AdminSchema.find().then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        res.status(400).json(err);
    })
});

router.post('/login',async(req,res)=>{

    AdminSchema.findOne({email:req.body.email}).then(async data=>{
        if(data){
            let validPass=await bcryptjs.compare(req.body.password,data.password);
            if(!validPass){
                return res.status(400).json("Invalid Password");
            }

            let UserToken=await jwt.sign({_id:data._id,email:data.email},"admin");
            res.header('auth_admin',UserToken).send(UserToken);

        }else{
            return res.status(400).json("Sorry Email is not exists");
        }

    }).catch(err=>{
        res.status(400).json(err);
    })
});


module.exports=router;