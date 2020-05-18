const router=require('express').Router();
const CartSchema=require('./CartSchema');



router.get('/view/:id',(req,res)=>{
    CartSchema.find({uid:req.params.id}).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(400).json(err);
    })
})


router.post('/add',async (req,res)=>{
    let postData=await new CartSchema({
        uid:req.body.uid,
        pid:req.body.pid,
        count:req.body.count,
        price:req.body.price,
        imageUrl:req.body.imageUrl
    });

    postData.save().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    })

});


router.delete('/delete/:id',(req,res)=>{
    CartSchema.deleteOne({_id:req.params.id}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    })
});

router.put('/update',(req,res)=>{
    CartSchema.updateOne({_id:req.body.id},{$set:{
        count:req.body.count,
        price:req.body.price
    }}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    })
});




module.exports=router;
