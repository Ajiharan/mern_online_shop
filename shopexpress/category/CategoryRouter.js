const router=require('express').Router();
const CategoryInfo=require('./CategorySchema');

router.get("/",(req,res) =>{
    res.json("I am from category router file");
})

router.post("/add",async(req,res) =>{
    var data = new CategoryInfo({
           name : req.body.name
        });

    await data.save();
    res.json(data);
})

router.get("/view",async(req,res) =>{
    var findData = await CategoryInfo.find();
    res.json(findData);
})



router.put("/update",async (req,res) =>{
    var update = await CategoryInfo.update({_id:req.body._id},{$set:{
            name : req.body.name
        }});

    res.json(update);
})

router.delete("/del/:id",async (req,res) =>{
    var delData = await CategoryInfo.findByIdAndRemove(req.params.id).then(e =>{
        res.json({message:"Deleted sucessfully"})
    })
})

module.exports = router;
