const mongoose = require('mongoose');

const notify= mongoose.Schema({
    notification_no:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
    },
    message:{
        type:String,
        required:true,
        trim:true,
    },
});

const Notice= mongoose.model("Notice",notify);

module.exports=Notice;