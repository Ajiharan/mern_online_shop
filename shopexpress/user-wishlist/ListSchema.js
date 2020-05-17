const mongoose=require('mongoose');

const ListSchema=mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    pid:{
        type:String,
        required:true
    }

});

module.exports=mongoose.model("ListSchema",ListSchema);