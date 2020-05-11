const ProductSchema=require('../products/ProductSchema');
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
    res.status(200).json(data);
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

router.delete("/del",async (req,res) =>{
    console.log("Params",req.query);
    var delData = await CategoryInfo.findByIdAndRemove(req.query.id).then(e =>{
        ProductSchema.deleteMany({category:req.query.cname}).then(result=>{
            res.json({message:"Deleted sucessfully"})
        })
       
    })
})

module.exports = router;
