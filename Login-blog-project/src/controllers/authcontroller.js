const User = require("../model/user")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")

// registration

exports.registration = async(req , res) => {

    try{

        const {name , email , password} = req.body 
        if(!name || !email ||!password){
            return res.status(400).json({message : "All Fields Are Required"})
        }

        const extUser = await User.findOne({email}).select("+password")

        if(extUser){

            return res.status(409).json({message : "user already registered"})
        }

        const hasPass = await bcrypt.hash(password , 10);

        const newUser = await User.create({
            name,
            email,
            password : hasPass
        })

        return res.status(201).json({message : "Registration done " , newUser})

    }catch(error){
        console.log("error" , error)
        return res.status(500).json({message : "something went wrong on registration"})

    }

}

// login

exports.login = async(req , res) => {
    try{
        const { email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "All Fields Are Required"})
        }

        const user = await User.findOne({
            email : email.trim().toLowerCase()
        }).select("+password")

        if(!user){
            return res.status(401).json({message : "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare( password , user.password)

        if(!isMatch){
            return res.status(401).json({message : "Invalid email or password"})
        }

        const token = generateToken(user._id , res);

        return res.status(200).json({message : "Login successfully" , 
            token , 
            user:{
                id : user._id,
                name : user.name,
                email : user.email
        }})

    }catch(error){
        console.log("Error" , error);
        return res.status(500).json({message : "something went wrong on login"})
    }

}

//logout

exports.logOut = async(req , res) => {
    res.clearCookie("token" , {
        httpOnly:true,
        secure:false
    });

    return res.status(200).json({
        success:true,
        message : "LogOut successfully"})

}

// first we need to make middleware that we verify jwt token and then we will get req.user.id 
// now we will make user profile that usr can see their profile after login

exports.getProfile = async(req , res) => {

    try{

        const user = await User.findById(req.user.id).select("-password")
        
        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        return res.status(200).json({
            success : true,
            user,
            message : "user found successfully"})

    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "something went wrong"})
    }

}
            