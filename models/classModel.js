const mongoose = require('mongoose');

const classschema = mongoose.Schema({
    class_id:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    teacher:{
        type:String,
        ref:"Admin",
        trim:true,
        required:true,
    }
});

const Class = new mongoose.model("Class",classschema);

module.exports=Class;