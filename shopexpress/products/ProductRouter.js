const router=require('express').Router();
const ProductInfo=require('./ProductSchema');
const WishlistSchema=require('../user-wishlist/ListSchema');
const CartSchema=require('../user-cart/CartSchema');
const RateSchema=require('../rating/RatingSchema');
router.get("/",(req,res) =>{
    res.json("I am from product router file");
})

router.post("/add",async(req,res) =>{
    var data = new ProductInfo({
        name : req.body.name,
        category: req.body.category,
        price:req.body.price,
        count:req.body.count,
        imageUrl:req.body.imageUrl
    });

    await data.save().then(data=>{

        res.status(200).json(data);

    }).catch(err=>{
        res.status(400).json(err);
    })
})

router.get("/view",async(req,res) =>{
    var findData = await ProductInfo.find().limit(15);
    res.json(findData);
})


router.get("/view_home",async(req,res) =>{
    var findData = await ProductInfo.find();
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

router.get('/getProduct/:id',async (req,res)=>{
    ProductInfo.findById(req.params.id).then(result=>{
        res.json(result);
    });
});

router.put("/update",async (req,res) =>{
    var update = await ProductInfo.update({_id:req.body._id},{$set:{
            name : req.body.name,
            category: req.body.category,
            price:req.body.price,
            count:req.body.count,
            imageUrl:req.body.imageUrl
        }});

    res.json(update);
})

router.put("/updateRate",async (req,res) =>{
    try{
        var update = await ProductInfo.update({_id:req.body.id},{$set:{
            Rating:req.body.rating
         }});
        res.status(200).json(update);
    }catch(err){
        res.status(400).json(err);
    }
    
})


router.delete("/del/:id",async (req,res) =>{
    try{
         ProductInfo.findByIdAndRemove(req.params.id).then(async e =>{
           await WishlistSchema.deleteMany({pid:req.params.id});
           await CartSchema.deleteMany({pid:req.params.id});
           await RateSchema.deleteMany({pid:req.params.id});
           res.status(200).json({message:"Deleted sucessfully"})
        });
    }catch(err){
        res.status(400).json(err)
    }
    
})



module.exports = router;
