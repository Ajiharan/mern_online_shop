const router=require('express').Router();
const RatingSchema=require('./RatingSchema');


router.post('/add',async(req,res)=>{
    try{
        let saveData= await new RatingSchema({
            pid:req.body.pid,
            uid:req.body.uid,
            rating:req.body.rating
        });
    
        let result=await saveData.save();
        res.status(200).json(result);
    }catch(err){
        res.status(400).json(err);
    }
  
})







module.exports=router;
