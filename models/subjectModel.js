const mongoose = require('mongoose');

const subjectschema = mongoose.Schema({
    class_id:{
        type:String,
        ref:"Class",
        trim:true,
        required:true,
    },
    subject_id:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    subject_name:{
        type:String,
        trim:true,
        required:true,
    }
});

subjectschema.index({class_id:1,subject_id:1},{unique:true});

const Subject = new mongoose.model("Subject",subjectschema);

module.exports= Subject;