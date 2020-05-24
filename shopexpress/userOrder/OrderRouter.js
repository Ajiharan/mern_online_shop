const router=require('express').Router();
const OrderSchema=require('./OrderSchema');
const mongoose=require('mongoose');


router.post('/add',async(req,res)=>{
    try{
        let orderData=await new OrderSchema({
            uid:req.body.uid,
            cardlist : req.body.cardlist,
            total:req.body.total
        });
    
        let saveData=await orderData.save();
        res.status(200).json(saveData);
    }catch(err){
        res.status(400).json(err);
    }
   
});

router.get('/getOrdersData',async(req,res) =>{
    var findData = await OrderSchema.find().limit(15);
    res.json(findData);
})


router.get('/get/:uid',async(req,res)=>{
    try{
        let resData=await OrderSchema.find({uid:req.params.uid});
        res.status(200).json(resData);
    }catch(err){
        res.status(400).json(err);
    }
});

router.put('/update/:id',async(req,res)=>{
    try{
        let UpdateData=await OrderSchema.updateOne({_id:req.params.id},{$set:{status:true}});
        res.status(200).json(UpdateData);

    }catch(err){
        res.status(400).json(err);
    }
})

module.exports=router;
