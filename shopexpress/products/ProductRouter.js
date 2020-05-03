const router=require('express').Router();
const ProductInfo=require('./ProductSchema');
const multer = require('multer');

router.get("/",(req,res) =>{
    res.json("I am from product router file");
})

router.post("/add",async(req,res) =>{
    var data = new ProductInfo({
        name : req.body.name,
        category: req.body.category,
        price:req.body.price,
        imageUrl:req.body.imageUrl
    });

    await data.save();
    res.json(data);
})

router.get("/view",async(req,res) =>{
    var findData = await ProductInfo.find();
    res.json(findData);
})

router.put("/update",async (req,res) =>{
    var update = await ProductInfo.update({_id:req.body._id},{$set:{
            name : req.body.name,
            category: req.body.category,
            price:req.body.price,
            imageUrl:req.body.imageUrl
        }});

    res.json(update);
})

router.delete("/del/:id",async (req,res) =>{
    var delData = await ProductInfo.findByIdAndRemove(req.params.id).then(e =>{
        res.json({message:"Deleted sucessfully"})
    })
})

module.exports = router;