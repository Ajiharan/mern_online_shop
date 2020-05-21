const router=require('express').Router();
const RatingSchema=require('./RatingSchema');
const mongoose=require('mongoose');

router.post('/add',async(req,res)=>{
    try{
        let isExists=await RatingSchema.findOne({pid:req.body.pid,uid:req.body.uid});
        if(isExists){
            res.status(400).json("Your rating already exists..");
        }else{
            let saveData= await new RatingSchema({
                pid:req.body.pid,
                uid:req.body.uid,
                rating:req.body.rating
            });
        
            let result=await saveData.save();
            res.status(200).json("Thank you for your rating...");
        }
     
    }catch(err){
        res.status(400).json(err);
    }
  
}); 

router.get('/getAverage/:id',(req,res)=>{
    RatingSchema.aggregate([
        {
            $match:{
                pid:mongoose.Types.ObjectId(req.params.id)
            }
        },
        
        {
            $group:{
               _id:null,
               count: { $sum: 1 },
               totalAverage:{
                $avg: "$rating"
               } 
            }
        }
    ]).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    });
});

router.get('/getUserRate',async(req,res)=>{
    try{
        console.log("params",req.query);
        let userRatingData=await RatingSchema.findOne({uid:req.query.uid,pid:req.query.pid});
        res.status(200).json(userRatingData);
    }catch(err){
        res.status(400).json(err);
    }
    
})







module.exports=router;
