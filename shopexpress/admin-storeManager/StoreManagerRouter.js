const router=require('express').Router();
const  StoreManagerSchema=require('./StoreManagerSchema');


router.get("/register",(req,res)=>{
    res.status(200).json("Hello Store manager");
});



module.exports=router;