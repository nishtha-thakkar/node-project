const Admin = require("../models/isAdmin")
const Product = require("../models/productModel")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")

exports.registerAdmin = async(req , res) => {

    try{

        const { name , email ,password} = req.body

        if(!name || !email ||!password ){
            return res.status(400).json({message : "All Fields Are Required"})
        }

        if(password.lenth <8){
            return res.status(400).json({message : "password must be at least 8 characters"})
        }

        const existingAdmin = await Admin.findOne({email : email.toLowerCase()});

        if(existingAdmin){
            return res.status(409).json({message : "Admin already exists"});
        }

        const hashPassword= await bcrypt.hash(password , 10)

        const admin = await Admin.create({
            name,
            email,
            password:hashPassword
        });

        return res.status(200).json({
            success:true,
            message : "Admin Registered Successfully" , 

            admin:{
                id:admin._id,
                name:admin.name,
                email:admin.email
            }
        })

    }catch(error){
        console.log("Error" , error)
         return res.status(500).json({
            success : false,
            message: "Registration failed"})
    }

}

// login

exports.loginAdmin = async(req , res) => {

    try{

    const {email , password} = req.body

    if(!email || !password){
    return res.status(400).json({message : "All Fields Are Required"})
    }

    const user = await Admin.findOne({
        email : email.trim().toLowerCase()
    }).select("+password")

    if(!user){
        return res.status(401).json({message : "Invalid email or Password"})
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
            return res.status(401).json({message : "Invalid email or password"})
        }

        const token = generateToken(user._id , res );

        return res.status(200).json({message : "Login Successfully" , 
            token,
            user: {
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
 }catch(error){

      console.log("Error" , error)
         return res.status(500).json({
            success : false,
            message: "Registration failed"})
 }

 }

 //logout

 exports.logOut = async(req , res) => {
    res.clearCookie("token" , {
        httpOnly:true,
        secure:false
    })

    return res.status(200).json({
        success:true,
        message : "LogOut successfully"})

 }

 // get profile

 exports.getProfile = async( req , res) => {

    try{

        const user = await Admin.findById(req.user.id).select("-password")

        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        return res.status(200).json({
            success:true,
            user,
            message : "user found succesfully"
        })

    }catch(error){
         console.log("Error" , error)
         return res.status(500).json({
            success : false,
            message: "Registration failed"})
    }

 }

 //admin dashboard


exports.getDashboard = async(req , res) => {

    try{

        const totalProducts = await Product.countDocuments();

        const totalAdmins = await Admin.countDocuments();

        const products = await Product.find();

        let totalStock = 0;
        let totalInventoryValue = 0;

        products.forEach((product) => {
           totalStock += product.stock;
           totalInventoryValue += product.price * product.stock

})

return res.status(200).json({
    success:true,
    message: "Dashboard data fetched successfully",
    dashboard:{
        totalProducts,
        totalAdmins,
        totalStock,
        totalInventoryValue




    }
});



    }catch(error){
         
        console.log("Error" , error)
         return res.status(500).json({
            success : false,
            message: "Registration failed"})


    }

}


