const mongoose=require('mongoose');

const studentSchema= new mongoose.Schema({
    id:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    phone:{
        type:String,
        trim:true,
        required:true,
    },
    address:{
        type:String,
        trim:true,
        required:true,
    },
    class:{
        type:String,
        ref:"Class",
        trim:true,
        required:true,
    },
    parent_name:{
        type:String,
        trim:true,
        required:true,
    },              
    dob:{
        type:Date,
        trim:true,
        required:true,
    }       
});

const Student = mongoose.model("Student",studentSchema);

module.exports = Student;