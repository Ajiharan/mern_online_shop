const mongoose=require('mongoose');

const CartSchema=mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    pid:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    count:{
        type:Number,
        default:1
    }

});


module.exports=mongoose.model("CartSchema",CartSchema);


