const express=require('express');

const app=express();

const {studentValidator}=require('../validators/studentValidator')

const {studentAddOne, studentLogin, sschatIn, getAllStudentsController, sfController, findStudentById}=require('../controllers/studentController');
const { validateAdminToken, tokenValidattionForSfChat } = require('../services/adminService');
const { validateStudentToken } = require('../services/studentService');


app.post('/newone',validateAdminToken,studentValidator,studentAddOne);      //working

app.post('/login',studentLogin);    //working

app.post('/sschat',validateStudentToken,sschatIn)   //working

app.get('/getAll',getAllStudentsController)     //working

app.post('/sfchat',tokenValidattionForSfChat,sfController);     //working

// app.get('/:id',findStudentById); 

module.exports=app;