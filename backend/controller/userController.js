const USER = require("../model/user");
  
const createNewUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Please enter a valid email" 
      });
    }

    // Validate username length
    if (userName.length < 3 || userName.length > 20) {
      return res.status(400).json({ 
        success: false,
        message: "Username must be 3-20 characters" 
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters" 
      });
    }

    // Check if user already exists 
    const existUser = await USER.findOne({ email });
    if (existUser) {
      return res.status(409).json({ 
        success: false,
        message: "User already exists with this email" 
      });
    }

    
    // Create new user
    const newUser = await USER.create({
      userName,
      email,
      password, 
    });

    
    const userResponse = {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    };

    return res.status(201).json({ 
      success: true,
      message: "User created successfully", 
      user: userResponse 
    });

  } catch (error) {
    console.error("Error in createNewUserController:", error);
    return res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later.",
      error: error.message 
    });
  }
};

const loginController=async(req,res)=>{
  try {
    const{identifier,password}=req.body;

    if(!identifier || !password){
      return res.status(400).json({message:"Username/Email and password are required"})
    }
const isEmail=identifier.includes('@');

const user=await USER.findOne(isEmail?{email:identifier}:{userName:identifier});

if(!user){
  return res.json(401).json({message:"Invalid credemtials"})
}
const isMatch =await user.comparePassword(password)
if(!isMatch){
  return res.json(401).json({message:"Invalid password"})
}

res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email
      }
    });

  } catch (error) {
    
  }
}

module.exports = { createNewUser,loginController };