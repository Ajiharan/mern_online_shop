const mongoose=require('mongoose');
const PaymentSchema=mongoose.Schema({
    uid : {
        type:String,
        required:true
    },

    total : {
        type :String,
        required :true
    },

    cardOwner:{
        type:String,
        default:null
        
    },

    cardNumber:{
        type:String,
        default:null
       
    },

    expiryMonth:{
        type:Number,
        default:null
        
    },

    expiryYear:{
        type:Number,
        default:null
        
    },

    cvv :{
        type:Number,
        default:null
        
    }

});
module.exports=mongoose.model('PaymentSchema',PaymentSchema);
