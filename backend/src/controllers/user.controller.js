import { ENV } from "../helpers/env.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
export const register =async(req ,res)=>{
    try {
        const {fullName, email, password}=req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(401).json({
                message:"User already exist please try with different email",

            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({
            fullName, 
            email,
            password:hashedPassword
        })

        const token = await jwt.sign({userId : newUser._id},ENV.TOKEN_SECRET)

        if(newUser.email===ENV.ADMIN){
           return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back admin ${newUser.fullName}`,
            admin:true,
            
            success: true
        })
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome  ${newUser.fullName}`,
            
            success: true
        })

    } catch (error) {
        console.log(`error from register backend, ${error}`)
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Please provide all the details"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Please use different credentials"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Please use different credentials"
      });
    }

    // Agar admin email hai, tabhi DB me admin true update karo
    if (user.email === ENV.ADMIN && !user.admin) {
      user.admin = true;
      await user.save();
    }

    const token = await jwt.sign({ userId: user._id }, ENV.TOKEN_SECRET);

    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict"
    });

    if (user.admin) {
      return res.status(200).json({
        message: `Welcome Back admin ${user.fullName}`,
        user
      });
    }

    return res.status(200).json({
      message: `Welcome back ${user.fullName}`
    });

  } catch (error) {
    console.log(`error from login backend, ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = async(req,res)=>{
   try {
    return res.clearCookie("token", {
    httpOnly: true,
    secure: true,        // agar HTTPS hai (Render/Vercel to hamesha hota hai)
    sameSite: "none",    // cross-site requests ke liye zaroori
  }).status(201).json({
	message:"LOgged out"
  });
   } catch (error) {
    console.log(`error from logout backend, ${error}`)
   }
}


export const getUser = async(req,res)=>{
    try {
        const userId= req.user;

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:"User does not exist"
            })
        }

        return res.status(201).json(user)
    } catch (error) {
        console.log(`error from getUser backend, ${error}`)
    }
}