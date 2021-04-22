const express=require('express');
const app=express();
const adminRoute=require('./adminRoute');
const studentRoute=require('./studentRoute');

app.use('/admin',adminRoute);
app.use('/student',studentRoute);

module.exports=app;






