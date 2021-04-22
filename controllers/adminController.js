const Admin = require('../models/Admin.model');
const Class = require('../models/classModel');
const Subject = require('../models/subjectModel');
const {addNewOne,findAdmin,comparePasswords,generateToken,validateToken, addNoticeService,checkAndInsertFfChat,
        addClassService,
        getClassByclass,
        addSubjectService,
        getAll}= require('../services/adminService');

const adminAddOne=async (request,response)=>{
    const output= await addNewOne(request);
    if(output!=-1 && output!=-2)
    {
        response.status(200).send({message:"sucessfully added"});
    }
    else if(output==-2)
    {
        response.status(400).json({message:"Account already exist on this id"});
    }
    else    
        response.status(400).send({message:"something went wrong"});
}
const adminLogin=async(request,response)=>{
    const output=await findAdmin(request.body.id);
    if(output!==null)
    {
        if(await comparePasswords(request.body.password,output.password))
        {
            const token=await generateToken({id:request.body.id});
            response.status(200).json({message:"login successful",token:token});
        }
        else    
            response.status(400).json({message:"invalid login"});
    } 
    else{
        response.status(400).json({message:"account doesn't exist"});
    }
}
const addNoticeController= async (request,response)=>
{
    const output= await addNoticeService(request);
    console.log(output);
    if(output!=-1)
    {
        response.status(200).json({message:"notice added successfully"});
    }
    else{
        response.status(400).json({message:"Something went wrong, please try again"});
    }
}
const ffchatIn= async(request,response)=>{
    
    const output=await checkAndInsertFfChat(request);
    if(output==null || output==undefined)
        response.status(400).json({message:"some thing went wrong"});
    else if(output==-1)
        response.status(400).json({message:"is are incorrect"});
    else
        response.status(200).json({message:"message sent successfully"});
}
const addClassController = async (request,response)=>{
    const output = await findAdmin(request.body.teacher);
    if(output==null)
    {
        response.status(400).json({message:"teacher id is incorrect"});
        return ;
    }
    const insert = await addClassService(request.body.class,request.body.teacher);
    if(insert==null)
        response.status(400).json({message:"some thing went wrong"});
    else    
        response.status(200).json({message:"class and teacher added successfully"});
}

const addSubjectController = async (request,response)=>{
    const output= await addSubjectService(request);
    if(output==-1)
        response.stats(400).json({message:"class is incorrect"});
    else if(output==null)
        response.status(400).json({message:"some thing went wrong"});
    else
        response.status(200).json({message:"subject added"});
}

const getAdminById= async (request,response)=>{
    console.log(request.params.id);
    const output = await findAdmin(request.params.id);
    console.log(output);
    if(output==null)
        response.status(400).json({message:"id is not valid"});
    else    
        response.status(200).json({data:output});
}
const getAllAdmins =async(request,response)=>{
    const output = await getAll();
    if(output)
        response.status(200).json({data:output});
    else    
        response.status(400).json({message:"some thing went wrong"});
}


module.exports={adminAddOne,adminLogin,addNoticeController,ffchatIn,addClassController,
    addSubjectController,getAdminById,getAllAdmins};