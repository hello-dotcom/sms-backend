const  bcrypt= require('bcrypt');
const Student= require('../models/studentModel');
const SS=require('../models/SSModel');
const SF = require('../models/SFModel');
const Admin = require('../models/Admin.model');
const jwt = require('jsonwebtoken');

const addNewStudent=async (request)=>{
    const check = await Student.find();
    if(check==[])
        Student.createIndexes({id:1},{unique:true});
    const {id,name,password,address,email,phone,parent_name,dob}= request.body;
    const cls=request.body.class;
    const hashedPassword=await bcrypt.hash(password,10);
    const output=await findStudent(id);
    if(output!==null)
        return -2;
    let newone= new Student({
        id:id,
        name:name,
        password:hashedPassword,
        address:address,
        email:email,
        phone:phone,
        parent_name:parent_name,
        dob:dob,
        class:cls,
    });
    let insert = await newone.save()
    .then(output=>{return output})
    .catch(error=>{return -1});
    return insert;
}
const findStudent=async (id)=>{
    return await Student.findOne({id:id});
}

const checkAndInsertSsChat=async (request)=>{
    if(await SS.find()==[])
        SS.createIndex({id1:1,id2:1},{unique:true});
    try
    {
        let testid1= await findStudent(request.body.id1);
        let testid2= await findStudent(request.body.id2);
        if(testid1==null || testid2==null)
            return -1;
        let output=await SS.findOne({id1:request.body.id1,id2:request.body.id2});
        if(output!=null)
        {
            let insert= await SS.updateOne({id1:request.body.id1,id2:request.body.id2},{$push:{message:{
                msg:request.body.message,
                created:request.body.created,
                sender:request.body.sender,
            }}});
            console.log(insert);
            return insert;
        }
        if(output==null)
            output=await SS.findOne({id1:request.body.id2,id2:request.body.id1});
        if(output!=null)
        {
            let insert= await SS.updateOne({id1:request.body.id2,id2:request.body.id1},{$push:{message:{
                msg:request.body.message,
                created:request.body.created,
                sender:request.body.sender,
            }}});
            console.log(insert);
            return insert;
        }
        else{
            let newone=new SS({
                id1:request.body.id1,
                id2:request.body.id2,
                message:{
                    msg:request.body.message,
                    created:request.body.created,
                    sender:request.body.sender,
                }
            });
            await newone.save()
            .then((result)=>
            {
                console.log(result);
                return result})
            .catch(err=>{
                console.log(err);
                return null;
            });

            return newone;
        }
    }
    catch(Error)
    {
        return -1;
    }
}
const getAllStudents=async(request)=>{
    const output=await Student.find();
    return output;
}
//sfservice
const sfService= async (request)=>{
    if(await SF.find()==[])
        SF.createIndex({id1:1,id2:1},{unique:true});
    try
    {
        let testid2= await findStudent(request.body.id2);
        let testid1= await Admin.findOne({id:request.body.id1});
        if(testid1===null || testid2===null)
            return -1;
        const output=await SF.findOne({id1:request.body.id1,id2:request.body.id2});
        if(output!=null)
        {
            let updated = await SF.updateOne({id1:request.body.id1,id2:request.body.id2},
                {$push:{message:{
                    msg:request.body.message,
                    created:request.body.created,
                    sender:request.body.sender,
                }}}).then((result)=>result)
                .catch(error=>-1);
            if(updated==-1)
                return null;
            else    
                return updated;
        }
        else{
            let insert = new SF({
                id1:request.body.id1,
                id2:request.body.id2,
                message:{
                    msg:request.body.message,
                    created:request.body.created,
                    sender:request.body.sender,
                }
            });
            let returned= await insert.save()
            .then(result=>result)
            .catch(err=>null);

            return returned;
        }
    }
    catch(Error)
    {
        return -1;
    }
}
const validateStudentToken = async(request,response,next)=>{
    const object = await jwt.verify(request.headers.authorization.split(" ")[1],"NaaSchoolDuniya",(err,payload)=>{
        if(err)
        {
            response.status(400).json({message:"invalid token"});
            return -1;
        }
        else    
            return payload
    });
    if(object==-1)
        return;
    let obj = await findStudent(object.id);
    if(obj==null)
        response.send(400).json({message:"This call is not accessible to you"});
    else    
    {
        if(obj!=null)
            next();
        else    
            response.send(400).json({message:"This call is not accessible to you"});
    }
}

module.exports={findStudent,addNewStudent,checkAndInsertSsChat,getAllStudents,sfService,validateStudentToken};