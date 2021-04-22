const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    id:{
        type:String,
        ref:"Student",
        trim:true,
        required:true,
    },
    class_id:{
        type:String,
        ref:"Class",
        trim:true,
        required:true,
    },
    subject_id:{
        type:String,
        ref:"Subject",
        trim:true,
        required:true,
    },
    fa1:{type:Number,required:true},
    fa2:{type:Number,required:true},
    fa3:{type:Number,required:true},
    fa4:{type:Number,required:true},
    qa:{type:Number,required:true},
    ha:{type:Number,required:true},
    final:{type:Number,required:true},
});

const Result = mongoose("Result",resultSchema);

module.exports=Result;