const mongoose=require('mongoose');

const StoreManagerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    }
});

module.exports=mongoose.model("StoreManagerSchema",StoreManagerSchema);
