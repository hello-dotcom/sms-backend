const express= require('express')

const mongoose= require('mongoose')

const adminSchema= mongoose.Schema({
    id:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:8
    },
    name:{
        type : String,
        trim: true,
        required: true,
        minlength:1,
    },
    qualification:{
        type : String,
        trim: true,
        required: true,
        minlength:1,
    },
    subject:{
        type : String,
        trim: true,
        required: true,
        minlength:1,
    },
    phone:{
        type : String,
        trim: true,
        required: true,
        minlength:10,
    },
    email:{
        type : String,
        trim: true,
        required: true,
    },
    address:{
        type : String,
        trim: true,
        required: true,
        minlength:1,
    },
    role:{
        type : String,
        trim: true,
        required: true,
        minlength:1,
    }
});

adminSchema.index({id:1},{unique:true});

const Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;