const express = require("express")
const app=express()
const router=require('./routes')
const mongoose= require('mongoose');

let db;
const initialize= async()=>{
    db = await mongoose.connect('mongodb://localhost/Dummy',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{console.log("database connected")})
    .catch(err=>{console.log(err);
    process.exit(1)});

    
    app.listen(3000);
}
initialize();
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/',router)



module.exports=app;

