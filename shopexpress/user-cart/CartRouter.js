const router=require('express').Router();
const CartSchema=require('./CartSchema');
const ProductSchema=require('../products/ProductSchema');

// router.get('/view/:id',async (req,res)=>{
//     CartSchema.find({uid:req.params.id}).then(async result=>{
//         tempData= result.map( async e=>{       
//            let ProductData= await ProductSchema.findOne({_id:e.pid})     
//             return {... await ProductData,cartcount:e.count};      
//         }); 
//         let myresult=await Promise.all(tempData);          
//         console.log(myresult);
//         res.status(200).json(myresult);
//     }).catch(err=>{
//         res.status(400).json(err);
//     })
// })

router.get('/total/:id',(req,res)=>{
    CartSchema.aggregate([{$match:{
        uid:req.params.id
        }},
        {
            $group:{
                _id:null,
                "TotalCount":{
                    $sum:"$count"
                }
            }
        }
    ]).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(200).json(err);
    });
});


router.get('/view/:id',async (req,res)=>{
  CartSchema.aggregate([{$match:{
      uid:req.params.id
  }},
    { "$lookup":
        {
          from:ProductSchema.collection.name,
          localField: "pid",
          foreignField: "_id",
            as: "cartDetails"
        }
      }

  ]).then(myresult=>{
    res.status(200).json(myresult);
  }).catch(err=>{
    res.status(400).json(err);
  })
})


router.post('/add',async (req,res)=>{
    
    let isExists=await CartSchema.findOne({ uid:req.body.uid,pid:req.body.pid});

    if(isExists){
        res.status(400).json("Already added");
    }else{
        let postData=await new CartSchema({
            uid:req.body.uid,
            pid:req.body.pid          
        });
    
        postData.save().then(result=>{
            res.status(200).json(result);
        }).catch(err=>{
            res.status(400).json(err);
        })
    }
  
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
        count:req.body.count     
    }}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    })
});




module.exports=router;
