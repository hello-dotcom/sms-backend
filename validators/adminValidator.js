const { getAll } = require("../services/adminService");



const adminValidator = async (request,response,next)=>{
    const {id,name,address,phone,email,qualification,subject,role,password}=request.body;
    const phoneregex=/^[1-9][0-9]{9}$/;
    const emailregex=/^([a-z-9A-Z\.-]+)@([a-z0-9A-Z-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
    const passwordregex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+()]).{8,20}$/;
    if(name.trim()===""||id.trim()===""||address.trim()===""||phone.trim()==""||email.trim()===""||
    qualification.trim()===""||subject.trim()===""||role.trim()===""||password.trim()==="")
    {
        response.status(400).send({message:"fields can't be empry"});
    }
    else if(id.startsWith("Fac")==false || id.length!=7)
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
    else{
        next();
    }
}
const addNoticeValidator= (request,response,next)=>{
    const {message}=request.body;
    if(message==="")
    {
        response.status(400).json({message:"message can't be empty"});
    }
    else{
        next();
    }
}
const defaultAdmin = async(request,response,next)=>{
    const output = await getAll();
    if(output.length==0)
        next();
    else    
        response.status(400).json({message:"sorry"});
}



module.exports={adminValidator,addNoticeValidator,defaultAdmin};