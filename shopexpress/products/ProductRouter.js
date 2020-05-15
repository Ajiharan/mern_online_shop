const router=require('express').Router();
const ProductInfo=require('./ProductSchema');

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


router.get("/view_home",async(req,res) =>{
    var findData = await ProductInfo.find().limit(12);
    res.json(findData);
})


router.get('/getAll',async (req,res)=>{
     ProductInfo.aggregate([
        {"$group" : {_id:{name:"$category"}, count:{$sum:1}}},
     ]).then(result=>{
        res.json(result);
     });           
});

router.get('/getByCategory/:name',async (req,res)=>{
    ProductInfo.find({category:req.params.name}).then(result=>{
       res.json(result);
    });           
});

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
