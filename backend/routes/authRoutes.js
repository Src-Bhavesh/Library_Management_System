const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Model/userModel");
const authentication = require("../Middleware/authentication");

router.post('/register',async(req,res)=>{
  const {name,gender,email,password}=req.body;

  if(!name || !gender || !email || !password){
    return res.status(400).json({message : "Sari feild fill karo"});
  }

  const existinguser = await User.findOne({email});

  if(existinguser){
    return res.status(400).json({message:"Email already exist karti hai"});
  }

  const hashpass = await bcrypt.hash(password,10);

  const user = new User({
    name,
    gender,
    email,
    password:hashpass,
    role:"user"

  })

  await user.save();
  res.status(201).json({message: "User registered successfully ho gya"})

})

router.post("/login",async(req,res)=>{
  const{email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({message : "Enter karo Email or Password"})
  }

  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({message : "Invalid email or password"})
  }

  const pass = await bcrypt.compare(password , user.password);

  if(!pass){
    return res.status(401).json({message : "Invalid emailor password"});
  }

  const token = jwt.sign({
      userId: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({
    message: "Login successful",
    token
  });

})


router.get("/", authentication , async(req,res)=>{
  const user = await User.findById(req.user.userId).select("-password")
  if(!user){
    return res.status(404).json({message:"User nhi hai"});
  }
  res.json({user})
})

module.exports = router;