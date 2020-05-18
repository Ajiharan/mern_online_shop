const router=require('express').Router();
const ListSchema=require('./ListSchema');
const ProductSchema=require('../products/ProductSchema');

router.post('/add',async(req,res)=>{

    let isExists=await ListSchema.findOne({uid:req.body.uid,
        pid:req.body.pid});
    
    if(isExists){
        res.status(400).json("Already added in wishlist");
    }else{
        let wishdata=new ListSchema({
            uid:req.body.uid,
            pid:req.body.pid
        });
        wishdata.save().then(result=>{
            res.status(200).json(result);
        }).catch(err=>{
            res.status(400).json(err);
        })
    
    }
   
});

router.delete('/delete',(req,res)=>{
    ListSchema.deleteOne({pid:req.query.pid,uid:req.query.uid}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(400).json(err);
    })
});


router.get('/view/:id',async(req,res)=>{
    let tempData=[];
    ListSchema.find({uid:req.params.id}).then(async result=>{

         tempData= result.map( async e=>{       
            return await ProductSchema.findOne({_id:e.pid});
        }); 
        let myresult=await Promise.all(tempData);          
        console.log(myresult);
        return res.status(200).json(myresult);
    }).catch(err=>{
        res.status(400).json(err);
    });
 
 });

module.exports=router;