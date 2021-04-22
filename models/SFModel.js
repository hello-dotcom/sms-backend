const mongoose = require('mongoose');

const sfschema = mongoose.Schema({
    id1:{
        type:String,
        ref:'Admin',
        trim:true,
        required:true,
    },
    id2:{
        type:String,
        ref:'Student',
        trim:true,
        required:true,
    },
    message:[{
        msg:{type:String,trim:true},
        created:{type:Date,default:new Date()},
        sender:{type:String,trim:true,required:true},
    }]
});

sfschema.index({id1:1,id2:true},{unique:true});

const SF = new mongoose.model("SF",sfschema);

module.exports=SF;