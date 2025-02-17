const User=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


exports.register=async(req,res)=>{
   try{
       const{name, email,password}=req.body;
       const hashedPassword=await bcrypt.hash(password,10);
       const newUser=new User({
           name , email , password:hashedPassword
       })
       await newUser.save();
       res.status(201).json({message:"User registered successfully."});
   }
   catch(error){
       res.status(500).json({message:"Server error!"});
   }
}



exports.login=async(req,res)=>{
   try{
       const{email,password}=req.body;
       const user=await User.findOne({email});
       if(!user){
           res.status(400).json({message:"OOPs! User not found!"});
       }
       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch){
           return res.status(400).json({message:"Invalid credentials"});
       }
       const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'5h'});
       res.json({token});
   }
   catch(error){
       res.status(500).json({message:"Server Error!"}); 
   }
}