const express=require('express');
const app=express();
const mongoose=require('mongoose');
const morgan=require('morgan');
const cors=require('cors');
mongoose.set('useNewUrlParser',true );
mongoose.set('useUnifiedTopology',true );
require('dotenv/config');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


app.get('/',(req,res)=>{
    res.status(200).json("Hi Thanusa");
});

app.listen(3000,(err)=>{
    if(err)
        throw err;
    console.log("Server started in 3000");
});

mongoose.connect(process.env.DB_CONNECTION,(err)=>{
    if(err)
        throw err;
    console.log("Database connected Successfully");
})


