const mongoose=require('mongoose');


const OrderSchema=mongoose.Schema({
   
    uid:{
        type:String,
        required:true
    },

    cardlist :{
      type:Array,
      required:true
    },

    total:{
        type:Number,
        default:0
    },
    status:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model("OrderSchema",OrderSchema);
