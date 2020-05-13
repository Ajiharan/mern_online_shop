const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
       
    },
    email:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true,
        
    },
    imageUrl:{
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/fir-store-react.appspot.com/o/images%2F3451446.jpg?alt=media&token=b06c346c-528e-4eb3-9aa0-cde8ceeca175"
    }
});

module.exports=mongoose.model('UserSchema',UserSchema);