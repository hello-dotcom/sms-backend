const mongoose = require('mongoose');


const ffschema = mongoose.Schema({
    id1:{
        type:String,
        ref:"Admin",
        trim:true,
        required:true,    
    },
    id2:{
        type:String,
        ref:"Admin",
        trim:true,
        required:true,
    },
    message:[{
        msg:{type:String,trim:true,required:true,},
        created:{type:Date,default:new Date()},
        sender:{type:String,ref:"Admin",},
    }]
});

ffschema.index({id1:1,id2:1},{unique:true});

const FF = new mongoose.model("FF",ffschema);

module.exports=FF;