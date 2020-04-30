const router=require('express').Router();
const  StoreManagerSchema=require('./StoreManagerSchema');
const AdminSchema=require('../admin/AdminSchema');
const UserSchema=require('../user/UserSchema');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');



// router.get("/register",(req,res)=>{
//     res.status(200).json("Hello Store manager");
// });

router.post('/register',async (req,res)=>{
    StoreManagerSchema.findOne({email:req.body.email}).then(async data=>{
       let admin_data=await AdminSchema.findOne({email:req.body.email});
       let user_data=await UserSchema.findOne({email:req.body.email});
        if(data || admin_data || user_data){
            return   res.status(400).json("Email Already Exists");
        }
       
        let hash=await bcryptjs.hash(req.body.password,10);
       
        const registerPost=new StoreManagerSchema({
            name:req.body.name,
            email:req.body.email,
            password:hash
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

router.get('/register',async(req,res)=>{
    StoreManagerSchema.find().select(['-password']).then(async data=>{
        res.status(200).json(data);
    }).catch(err=>{
        res.status(400).json(err);
    })
});

module.exports=router;