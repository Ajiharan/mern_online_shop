const mongoose=require('mongoose');

const CartSchema=mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    pid:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }

});


module.exports=mongoose.model("CartSchema",CartSchema);


