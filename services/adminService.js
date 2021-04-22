const bcrypt=require('bcrypt');
const Admin = require('../models/Admin.model');
const jwt=require('jsonwebtoken');
const Notice= require('../models/notificationModel');
const SS=require('../models/SSModel');
const FF = require('../models/FFModel');
const Class = require('../models/classModel');
const Subject = require('../models/subjectModel');
const { findStudent } = require('./studentService');
const addNewOne=async (request)=>
{
    const {id,name,phone,email,address,password,qualification,subject,role}=request.body;
    const hashpassword=await bcrypt.hash(password,10);
    const alreadyExist=await findAdmin(id);
    console.log(alreadyExist);
    
    if(alreadyExist!==null)
        return -2;
    
    
    const item=new Admin({
        id:id,
        name:name,
        phone:phone,
        email:email,
        address:address,
        password:hashpassword,
        qualification:qualification,
        subject:subject,
        role:role,
    })
    let insert= await item.save()
    .then(result=>{return result})
    .catch(error=>{return -1});
    return insert;
}

const findAdmin=async (id)=>{
    return await Admin.findOne({id:id});

}
const comparePasswords=async (password1,password2)=>{
    return await bcrypt.compare(password1,password2);
}
const generateToken= async(payload)=>{
        return await jwt.sign(payload,"NaaSchoolDuniya",{expiresIn:60*60});
}

const addNoticeService = async (request)=>{
    const output= await  Notice.find({}).sort({notification_no:-1}).limit(1);
    let noticenumber;
    if(output.length==0)
        noticenumber=1;
    else
    {
        noticenumber = Number(output[0].notification_no)+1;
    }
    let newNotice = new Notice ({
        notification_no:noticenumber,
        message:request.body.message,
    });
    let insert= await newNotice.save()
    .then((result)=>{
        console.log(result);
        return result;
    })
    .catch((error)=>{
        console.log(error);
        return -1});  
    return insert;
}

const checkAndInsertFfChat=async (request)=>{
    try
    {
        let testid1= await Admin.findOne({id:request.body.id1});
        let testid2= await Admin.findOne({id:request.body.id2});
        if(testid1==null || testid2==null)
            return -1;
         let output=await FF.findOne({id1:request.body.id1,id2:request.body.id2});
        if(output!=null)
        {
            let insert= await FF.updateOne({id1:request.body.id1,id2:request.body.id2},{$push:{message:{
                msg:request.body.message,
                created:request.body.created,
                sender:request.body.sender,
            }}});
            console.log(insert);
            return insert;
        }
        if(output==null)
            output=await FF.findOne({id1:request.body.id2,id2:request.body.id1});
        if(output!=null)
        {
            let insert= await FF.updateOne({id1:request.body.id2,id2:request.body.id1},{$push:{message:{
                msg:request.body.message,
                created:request.body.created,   
                sender:request.body.sender,
            }}});
            console.log(insert);
            return insert;
        }
        else{
            let newone=new FF({
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
const addClassService = async (cls,id)=>{
    if(await Class.find()==[])
        Class.createIndex({class_id:1},{unique:true});
    let object = new Class({
        class_id:cls,
        teacher:id,
    });
    return await object.save()
    .then(res=>res)
    .catch(err=>{console.log(err);
        return null});
}
const addSubjectService = async (request)=>{
    const output = await Subject.find();
    if(output==[])
        Subject.createIndex({class_id:1,subject_id:1},{unique:true});
    let test1= await Class.findOne({class_id:request.body.class});
    if(test1==null)
        return -1;
    const object = new Subject ({
        class_id:request.body.class,
        subject_id:request.body.subject_id,
        subject_name:request.body.subject_name,
    });
    return await object.save()
    .then(res=>res)
    .catch(err=>null);
}
const getClassByclass = async (cls)=>{
    return await Class.findOne({class:cls});
}


const validateAdminToken = async (request,response,next)=>{
    console.log(request.headers.authorization.split(" ")[1]);
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
    let obj = await findAdmin(object.id);
    if(obj==null)
        response.send(400).json({message:"This call is not accessible to you"});
    else    
    {
        console.log(obj);
        if(obj.role=="Admin")
            next();
        else    
            response.send(400).json({message:"This call is not accessible to you"});
    }
}
const validateFacultyToken = async (request,response,next)=>{
    const object = await jwt.verify(request.headers.authorization.split(" ")[1],"NaaSchoolDuniya",(err,payload)=>{
        if(err)
        {
            response.status(400).json({message:"invalid token"});
            console.log(err);
            return -1;
        }
        else    
            return payload
    });
    if(object==-1)
        return;
    let obj = await findAdmin(object.id);
    if(obj==null)
        response.send(400).json({message:"This call is not accessible to you"});
    else    
    {
        if(obj.role=="Faculty"||obj.role=="Admin")
            next();
        else    
            response.send(400).json({message:"This call is not accessible to you"});
    }
}
const tokenValidattionForSfChat = async(request,response,next)=>{
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
    let obj = await findAdmin(object.id);
    let obj1= await findStudent(object.id);
    if(obj==null && obj1==null)
        response.send(400).json({message:"This call is not accessible to you"});
    else    
    {
        if((obj==null && obj1!=null) || (obj!=null && (obj.role=="Faculty" || obj.role=="Admin") && obj1==null))
            next();
        else    
            response.send(400).json({message:"This call is not accessible to you"});
    }
}
const getAll = async()=>{
    return await Admin.find();
}

module.exports={addNewOne,
                findAdmin,
                comparePasswords,
                generateToken,
                addNoticeService,
                checkAndInsertFfChat,
                addClassService,
                addSubjectService,
                getClassByclass,
                validateAdminToken,
                validateFacultyToken,
                tokenValidattionForSfChat,
                getAll
            };