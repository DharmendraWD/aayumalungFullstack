import { ok } from "assert";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";
import { verifyMail } from "../emailVerify/verifyMail.js";
import { Session } from "../models/sessionModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
const { username, email, password } = req.body;

// check if all fields are present
if (!username || !email || !password) {
  return res.status(400).json({ message: "All fields are required" });
}

// check existing user
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
}

// if everything fine create new user
const hashedPassword = await bcrypt.hash(password, 10);
const newUser = await User.create({
    username,
    email,
    password:hashedPassword
})

// verify maail 
// creating token 
const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
verifyMail(token, email)

newUser.token = token;
await newUser.save();

return res.status(201).json({ message: "User created successfully", 
    data: newUser
}
);


} catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const verification = async(req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized"});
        }


        const token = authHeader.split(" ")[1];
        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        }catch(e){
            if(e.name === "TokenExpiredError"){
                return res.status(401).json({message:"token expired try again", success:false});
            }
            
        }


        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({message:"user Not found"});
        }
        user.isVerified = true;
        user.token = null;
        await user.save();
        return res.status(200).json({message:"Email verified successfully", success:true});
        
    }catch{
return res.status(500).json({"message":"Invalid TOken", success:false});
    }
}


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email" });

    // remove old session if exists
    const session = await Session.findOne({ userId: user._id });
    if (session) await session.deleteOne();

    await Session.create({ userId: user._id });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    user.isLoggedIn = true;
    await user.save();

    //  Set cookies
     res.cookie('accessToken', accessToken, {
  httpOnly: true,       // prevents JS access
  secure: true,         // required for HTTPS
  sameSite: 'none',     // allows cross-site
  maxAge: 10 * 24 * 60 * 60 * 1000,
});
res.cookie('email', user.email, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 10 * 24 * 60 * 60 * 1000,
});
res.cookie('username', user.username, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 10 * 24 * 60 * 60 * 1000,
});

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    //   sameSite: 'lax',
    // });

    return res.status(200).json({
      message: `Login successful ${user.username}`,
      data: { refreshToken, accessToken, user },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const logoutUser = async (req, res) => {
  try {
    // 1. Get token from cookies OR Authorization header
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1];

      console.log(token)
    if (!token) {
      return res.status(401).json({ message: "No token found. Already logged out." });
    }

    // 2. Decode token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.id; // JWT payload { id: user._id }
console.log(userId)
    // 3. Delete sessions
    await Session.deleteMany({ userId });

    // 4. Update user status
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });

    // 5. Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("email");
    res.clearCookie("username");

    // 6. Return response
    return res.status(200).json({ message: "Logout successful" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
};



  // forgot pasword 
  export const forgotPassword = async (req, res) => {
    try {
const {email} = req.body;
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({message:"User does not exist", ok:false});
}

const otp = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, "0");
const expiry = new Date(Date.now() + 10 * 60 * 1000); // 5 minutes from now
user.otp = otp;
user.otpExpiry = expiry;
await user.save();

await sendOtpMail(email, otp);

return res.status(200).json({message:"OTP sent successfully", data: user, ok:true});
        
    } catch (error) {
        return res.status(500).json({ message: error.message + "while forgetting password", ok:false });
    }
  }

// verify otp 
  export const verifyOtp = async (req, res) => {
  try {
    const email = req.params.email;
const {otp} = req.body;
const user = await User.findOne({email});
if(!user){
    return res.status(400).json({message:"User does not exist", ok:false});
}

if(!user.otp || !user.otpExpiry){
    return res.status(400).json({message:"OTP not sent or already verified.", ok:false});
} 

if(user.otpExpiry < Date.now()){
    return res.status(400).json({message:"OTP expired", ok:false});
}


if(user.otp !== otp){
    return res.status(400).json({message:"Invalid OTP", ok:false});
}


// user.otp = null;
// user.otpExpiry = null;
await user.save();
return res.status(200).json({message:"OTP verified successfully", ok:true});

  } catch (error) {
    return res.status(500).json({ message: error.message + "while verifying otp." , ok:false});
  }
  }


// change passwor d
export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, oldPassword } = req.body;
    const { email } = req.params;

    //  Validate input
    if (!newPassword || !confirmPassword || !oldPassword) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match.", success: false });
    }

    //  Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found.", success: false });
    }

    //  Check old password validity
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      return res.status(400).json({ message: "Old password is incorrect.", success: false });
    }

    // Prevent reusing the same password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password.",
        success: false,
      });
    }

    // 5️Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully.", success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error." , success: false});
  }
};

// reset password 
export const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, otp } = req.body;
    const { email } = req.params;

    // 1 Validate input
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match.", success: false });
    }

    //  Find user
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(404).json({ message: "User not found. or otp expired", success: false });
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
user.otpExpiry = null;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully.", success: true });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error." , success: false});
  }
}

