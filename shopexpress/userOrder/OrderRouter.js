const router=require('express').Router();
const OrderSchema=require('./OrderSchema');
const mongoose=require('mongoose');


router.post('/add',async(req,res)=>{
    try{
        let orderData=await new OrderSchema({
            uid:req.body.uid,
            total:req.body.total
        });
    
        let saveData=await orderData.save();
        res.status(200).json(saveData);
    }catch(err){
        res.status(400).json(err);
    }
   
});


router.get('/get/:uid',async(req,res)=>{
    try{
        let resData=await OrderSchema.find({uid:req.params.uid});
        res.status(200).json(resData);
    }catch(err){
        res.status(400).json(err)
    }
});

module.exports=router;