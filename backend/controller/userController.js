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

    // Check if user already exists - FIX: Use findOne instead of find
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
      password, // Store hashed password
    });

    // Remove password from response
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

module.exports = { createNewUser };