const Product = require("../model/product")
const cloudinary = require("../config/cloudinary")
const {Readable} = require("stream")
// add product

exports.addProduct = async(req , res) => {

    try{
        const{name, price, description, category, stock} = req.body

        if(!name|| price == null || !category){
            return res.status(400).json({message : "Name , price , category are required"})
        }

        // upload img to cloudinary

        const uploadImage = () => {
            return new Promise((resolve , reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    folder: "giva-products",
                    resource_type: "image"
                },
                (error ,result) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(result)
                    }
                }
            
            );

            Readable.from(req.file.buffer).pipe(stream); // use of rradable : multer mathi maleli img necloud sudhi mokavamate thai che
            }) // req.file.buffer - multer dwara memory ma rakheli img no data
            //  Readable.from - img nadata read kri sakai eva stream ma ferve che
            //pipe(stream - img data cloudinary naupload stream ma mokle che
        };

        const result = await uploadImage();

        // save product with cloudiary img url


        const product = await Product.create({
            name,
            price,
            description,
            category,
            image: result.secure_url,
            stock

        })

        return res.status(201).json({message : "product added successfully"  , product})



    }catch(error){
        console.log("Error" , error)
        return  res.status(500).json({message : "something went wrong"})
    }

}


// get all product

exports.getProduct = async(req , res) => {

    try{
        const products = await Product.find(); // to bring product frommongodb
        return res.status(200).json({message : "product fetched successfully" , totalProducts : products.length, products:products})
        // products.length - how much products length 

    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "Error fetching products"}) 

    }


}

//get single product by id

exports.getProductById = async(req , res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message : "product not found"})
        }

        return res.status(200).json({message : "Product fetched successfully" , product:product})

    }catch(error){
         console.log("Error" , error)
        return res.status(500).json({message : "failed to fetched product"})

    }

}



// update product

exports.updateProduct = async(req ,res) => {
    try{

        const id = req.params.id;

        const{name , price , description , category , stock} = req.body

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name , price , description , category , stock
            }, {new : true , runValidators:true}
        )

        if(!product){
            return res.status(404).json({message : "Products not found"})
        }

        return res.status(200).json({message : "product updated successfully" , product})

}catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "error to updatating product"})

    }

}

//delete product

exports.deleteProduct = async(req , res) => {

    try{

        const id = req.params.id;

        const product  = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message : "Product not found"})
        }

        return res.status(200).json({message : "Product deleted successfully"})

    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "error to deleting product"})

    }

}

// search products by name

exports.searchProduct = async(req , res) => {

    try{

        const{search} = req.query;

        if(!search || !search.trim()){
            return res.status(400).json({message : "please enter a product name"})
        }

        const products = await Product.find({
            name:{
                // regex and option use for search product in mongodb
                $regex : search.trim(),  // regular expression it use for tosearch pattern and text 
                // if we have silver ring and gild ring customer search ring they provided both
                $options : "i"  // i means case insensitive means customer find in small or capital words  both no different 
           // product will show with capital and small letter
            }

        })

        return res.status(200).json({mesage : "product fetched successfully" , 
            totalProducts : products.length,
            products:products
        })

    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "error to seraching product"})

    }

}

// filter products by category and price

exports.filterProducts = async(req , res) => {
    
    try{

        const{category , minPrice , maxPrice} = req.query;

        const filter = {};

        if(category){
            filter.category = category
        }

        if(minPrice){
            filter.price = {
                ...filter.price,
                $gte: Number(minPrice)  // grater than equal to // 1000 thi vadhu
                        }
                    }

        if(maxPrice){
            filter.price = {
                ...filter.price, // spread operatot previous condition jalvi rkhe che
                $lte: Number(maxPrice)  // less than or equal to// 5000 or less 5000
            }
        }

        const products = await Product.find(filter);

        return res.status(200).json({
            message : "product filtered successfully",
            totalProducts : products.length,
            products
        })

    }catch(error){
        console.log("Error" , error)
         return res.status(500).json({message : "error to  Filtering product"})

    }

}



