const express=require('express');
const {adminValidator, addNoticeValidator, defaultAdmin} = require('../validators/adminValidator');
const app=express();
const {adminAddOne,adminLogin, addNoticeController,ffchatIn, addClassController, addSubjectController
    , getAdminById, getAllAdmins}=require('../controllers/adminController');
const Admin = require('../models/Admin.model');
const { validateAdminToken, validateFacultyToken } = require('../services/adminService');


// app.get('/get/:id',(request,response)=>{console.log(request.params.id);
//                                         response.send("hai")});

app.post('/newone',validateAdminToken,adminValidator,adminAddOne);  //working

app.get('/getAll',getAllAdmins);    //working

app.post('/defaultAdmin',defaultAdmin,adminValidator,adminAddOne);  //working

app.post('/addnotice',validateAdminToken,addNoticeValidator,addNoticeController);   //working

app.post('/login',adminLogin);  //working

app.post('/ffchat',validateFacultyToken,ffchatIn)   //working

app.post('/addClass',validateAdminToken,addClassController);    //working

app.post('/addSubject',validateAdminToken,addSubjectController);    //working


module.exports=app;
