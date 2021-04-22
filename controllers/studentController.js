const { addNewStudent, findStudent, checkAndInsertSsChat, getAllStudents, sfService } = require("../services/studentService")
const {comparePasswords,generateToken}=require('../services/adminService')


const studentAddOne=async (request,response)=>{
    const output=await addNewStudent(request);
    if(output==-2)
        response.status(400).json({message:"account already exists"});
    else if(output==-1)
        response.status(400).json({message:"something went wrong"});
    else    
        response.status(200).json({message:"successfully created account"});
}
const studentLogin = async (request,response)=>{
    const output= await findStudent(request.body.id);
    if(output!==null)
    {
        if(await comparePasswords(request.body.password,output.password))
        {
            const token=await generateToken({id:request.body.id});
            response.status(200).json({message:"login successful",token:token});
        }
        else    
            response.status(400).json({message:"invalid password"});
    }
    else    
        response.status(400).json({message:"invalid id"});
}
const sschatIn= async(request,response)=>{
    const output=await checkAndInsertSsChat(request);
    if(output==null)
        response.status(400).json({message:"something went wrong"});
    else if(output==-1)
        response.status(400).json({message:"ids are invalid"});
    else    
        response.status(200).json({message:"message sent"});
}
const getAllStudentsController= async (request,response)=>{
    const output= await getAllStudents(request);
    if(output!=null || output!=undefined)
        response.status(200).json({data:output});
    else    
        response.status(400).json({message:"there is some problem ",data:[]});
}

const sfController = async (request,response)=>{
    const output = await sfService(request);
    if(output==null)
        response.status(400).json({message:"something went wrong"});
    else if(output==-1)
        response.status(400).json({message:"ids are invalid"});
    else    
        response.status(200).json({message:"message sent"});
}
const findStudentById= async (request,response)=>{
    const output = await findStudent(request.params.id);
    if(output==null)
        response.status(400).json({message:"id is not valid"});
    else    
        response.status(200).json({data:output});
}

module.exports={studentAddOne,studentLogin,sschatIn,getAllStudentsController,sfController,findStudentById};