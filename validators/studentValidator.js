const Class = require('../models/classModel')



const studentValidator = async (request,response,next)=>{
    const {id,name,address,phone,email,password,dob,parent_name}=request.body;
    const cls=request.body.class;
    const phoneregex=/^[1-9][0-9]{9}$/;
    const emailregex=/^([a-z-9A-Z\.-]+)@([a-z0-9A-Z-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
    const passwordregex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+()]).{8,20}$/;
    if(name.trim()===""||id.trim()===""||address.trim()===""||phone.trim()==""||email.trim()===""||
    dob.trim()===""||parent_name.trim()===""||cls.trim()===""||password.trim()==="")
    {
        response.status(400).send({message:"fields can't be empry"});
    }
    else if(id.startsWith("S")==false || id.length!=7)
    {
        response.status(401);
        response.send({message:"wrong id"});
    }
    else if(!phoneregex.test(phone))
    {
        response.status(400).send({message:"phone number not valid"});
    }
    else if(!emailregex.test(email))
    {
        response.status(400).send({message:"email is not valid"});
    }
    else if(!passwordregex.test(password))
    {
        response.status(400).send({message:"password must have a small,cap alphabet,number,special character and min length8"});
    }
    else if(await Class.findOne({class_id:cls})==null)
    {
        response.status(400).send({message:"student can't join in that class, (no class found)"});
    }
    else{
        next();
    }
}

module.exports={studentValidator};