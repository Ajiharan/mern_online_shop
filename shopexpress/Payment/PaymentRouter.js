const router=require('express').Router();
const PaymentInfo=require('./PaymentSchema');

router.get("/",(req,res) =>{
    res.json("I am from payment router file");
})

router.post("/add",async(req,res) =>{
    var data = new PaymentInfo({
        uid : req.body.uid,
        total:req.body.total,
        cardOwner : req.body.cardOwner,
        cardNumber: req.body.cardNumber,
        expiryMonth:req.body.expiryMonth,
        expiryYear:req.body.expiryYear,
        cvv:req.body.cvv
    });

    await data.save().then(data=>{

        res.status(200).json(data);

    }).catch(err=>{
        res.status(400).json(err);
    })
});

router.get("/view",async(req,res) =>{
    var findData = await PaymentInfo.find().limit(15);
    res.json(findData);
})


module.exports = router;
