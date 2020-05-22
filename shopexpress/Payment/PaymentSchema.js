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
        required:true
    },

    cardNumber:{
        type:String,
        required:true
    },

    expiryMonth:{
        type:Number,
        required:true
    },

    expiryYear:{
        type:Number,
        required:true
    },

    cvv :{
        type:Number,
        required:true
    }

});
module.exports=mongoose.model('PaymentSchema',PaymentSchema);
