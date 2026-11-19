const User = require("../model/user")
const bcrypt = require("bcryptjs") 
const { generateToken } = require("../utils/generateToken")


// auth controller means register and login
exports.registration = async(req , res) => {

    try{

        const {name ,email , password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        // check if user alredy exit or not

        const isUser = await User.findOne({email : email.trim().toLowerCase()})
        if(isUser){
            return res.status(409).json({message : "user already existed"})
        }

        //Hash password
         const hasPassword = await bcrypt.hash(password , 10)

        // create new user

       

        const newUser = await User.create({
            name : name,
            email : email.trim().toLowerCase(),
            password : hasPassword

        })

        return res.status(201).json({message : "Registration successfully" , 
            user: {
                id : newUser._id,
                name : newUser.name,
                email : newUser.email

            }
          
        })



    }catch(error){
        console.log("Error" , error)
        
        // if(error.code === 11000){              // duplicate error handling , ifnewuser try to login with another person email theythrow email alredy registerd duplicate error handling
        //     return res.status(409).json({message : "Email already registered"})
        // }

         return res.status(500).json({message : "Registration failed"})


    }

}


// login

exports.login = async(req , res) => {
    try{

        const{email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message : "All Fields Are Required"})
        }

        // find user in db

        const user = await User.findOne({
            email : email.trim().toLowerCase()
        })

        if(!user){
            return res.status(401).json({message : "Invalid email or password"})
        }

        // compare password

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(401).json({message : "Invalid email or password"})
        }

        //generate token ad set cookies

        const token = generateToken(user._id , res);
        return res.status(200).json({message : "Login successfully", 
            user: {
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            token : token
        })

    }catch(error){
        console.log("error" , error)
          return res.status(500).json({message : "Login failed"})


    }

    }


// logout

exports.logout = async(req , res) => {
    try{

        res.clearCookie("token");
        return res.status(200).json({
            success:true,
            message:"Logout successfully"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Logout failed"
        })
    }

}
