const router=require('express').Router();
const WishSchema=require('./ListSchema');

router.post('/add',async(req,res)=>{
    const wishdata=new WishSchema({
        uid:req.body.uid,
        pid:req.body.pid
    });
    wishdata.save().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    })

});

module.exports=router;