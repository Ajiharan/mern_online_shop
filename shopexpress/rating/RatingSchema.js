const mongoose=require('mongoose');


const RatingSchema=mongoose.Schema({
    pid:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    uid:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        default:null
    }
});

module.exports=mongoose.model("RatingSchema",RatingSchema);