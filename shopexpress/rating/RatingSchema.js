const mongoose=require('mongoose');


const RatingSchema=mongoose.Schema({
    pid:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    uid:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    comment:{
        type:String,
        default:null
    }
});

module.exports=mongoose.model("RatingSchema",RatingSchema);