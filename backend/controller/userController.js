const USER = require("../model/user");

const createNewUser=async(req,res)=>{
try {
  const{userName,email,password}=req.body;

  if(!userName || !email || !password){
    return res.status(400).json({message:"All fields are required"})

  }
  const existUser=await USER.find({email});
  if(existUser){
        return res.status(409).json({message:"User Already Exists"})
  }
  const newUser=await USER.create({
    userName,
    email,
    password,
  })
return res.status(201).json({message:"User Created successfully"})

} catch (error) {
  return res.status(500).json({message:"Error in createNewUserController",error})
}
}
module.exports={createNewUser}