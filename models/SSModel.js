const mongoose= require('mongoose');

const ssschema =  mongoose.Schema({
    id1:{
        type:String,
        ref:'Student',
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
        msg:{type:String},
        created:{
            type:Date,
            default:Date.now
        },
        sender:{
            type:String,
            ref:'Student'
        }
    }]
});

const SS = new mongoose.model('SS',ssschema);

module.exports=SS;