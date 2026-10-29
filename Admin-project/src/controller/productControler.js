const Product  = require("../models/productModel")

// craete product

exports.createProduct = async(req , res) => {

    try{

        const{name , price , description , category , stock }= req.body

        if(!name || !price ||  !description || !category || !stock){
            return res.status(400).json({
                success : false,
                message: "All Fields Are Required"
            })
        }

const product = await Product.create({
    name ,
    price,
    description,
    category,
    stock
});

return res.status(201).json({
    success:true,
    message : "Product Added Successfully" , product
})

    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({
            success:false,
            message: "something went wrong"
        })
    }

}

// get all product

exports.getAllProducts = async(req , res) => {

    try{
        const products = await Product.find();

        return res.status(200).json({
            sucess:true,
            message : "Product Fetched Successfully",
            totalProducts : products.length , products
        });

    }catch(error){
         console.log("Error" , error)
        return res.status(500).json({
            success:false,
            message: "something went wrong"
        })

    }

}

// get singleproduct

exports.getSingleProduct = async(req , res) => {

    try{
        const id = req.params.id;

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message : "Product not found "
            })
        }

        return res.status(200).json({
            success:true,
            message : "product Fetched Successfully" , product
        })

    }catch(error){

          console.log("Error" , error)
        return res.status(500).json({
            success:false,
            message: "something went wrong"
        })

    }

}

//update product

exports.updateProduct = async(req , res) => {

    try{

        const id = req.params.id;

        const {name , price , description , category , stock} = req.body

        const product = await Product.findByIdAndUpdate(id, {
            name,
            price,
            description,
            category,
            stock
        },

        {new : true , runValidators : true}
    
    )

    if(!product){
        return res.status(404).json({
            success:false,
            message : "product not found"
        })
    }

    return res.status(200).json({
        success:true,
        message : "Product Updated Successfully" , product
    })

    }catch(error){

         console.log("Error" , error)
        return res.status(500).json({
            success:false,
            message: "something went wrong"
        })

    }

}

// delete product

exports.deleteProduct = async( req , res) => {

    try{

        const id = req.params.id;

        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({
                success:false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success:true,
            message : "Product deleted successfully"
        })

    }catch(error){

         console.log("Error" , error)
        return res.status(500).json({
            success:false,
            message: "something went wrong"
        })

    }

}