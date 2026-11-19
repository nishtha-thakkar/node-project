const Cart = require("../model/cartModel");
const Product = require("../model/product")

exports.addToCart = async(req , res) => {
    try{

        const userId = req.userId;

        const{productId , quantity =1} = req.body

        if(!productId || !Number.isInteger(quantity) || quantity <1){
            return res.status(400).json({message : "Valid productId and quantity arerequired"})
        }

        const product = await Product.findById(productId); // to search product in database throgh id

        if(!product){
            return res.status(404).json({message : "Product not found"})
        }

        let cart = await Cart.findOne({user : userId});  // check if user cart is already in mongodb or not

        if(!cart){  // if cart not so make newcart
            cart = new Cart({
                user : userId,
                items : []
            });
        }

        const existingitems = cart.items.find((item) => item.product.toString() === productId)  // if product is alredy in cart or not

        const newQuantity = existingitems ? existingitems.quantity + quantity : quantity;  // if wehave 3 ring in cart andcustomer add new ring so inc in quantity

        if(newQuantity >product.stock){
            return res.status(400).json({message : "Insufficient Stock"})
        }

        if(existingitems){   // if product is in our cart so inc quantity ot not push in cart
            existingitems.quantity = newQuantity;
        }else{
            cart.items.push({
                product : productId,
                quantity
            })
        }

        await cart.save();  // to save cart in mongodb

        return res.status(200).json({message : "Product added to cart successfully" , cart})

    }catch(error){
        console.log("Error" , error)
        return res.status(500).json({message : "Failed to add product to cart"})

    }

} 

//get cart

exports.getCart = async(req , res) => {

    try{

        const userId = req.userId;

        const cart = await Cart.findOne({user : userId})
                        .populate("items.product"); // product nu name , price , image , details lavse

       if(!cart){
        return res.status(200).json({message : "Cart is empty" , items : []})
       }
       
       return res.status(200).json({message : "cart fetched successfully" , cart})

                           

    }catch(error){

         console.log("Error" , error)
        return res.status(500).json({message : "Failed to fetch product in cart"})


    }

}

//remove cart

exports.removeFromCart = async( req , res) => {

    try{

        const userId = req.userId;

        const{productId} = req.body

        if(!productId){
            return res.status(400).json({message : "ProductId is required"})
}

const cart = await Cart.findOne({ user : userId})

if(!cart){
    return res.status(404).json({message : "Cart not found"})
}

const itemExists = cart.items.some((item) => item.product.toString() === productId)

if(!itemExists){
    return res.status(404).json({message : "product not found"})
}

cart.items = cart.items.filter((item) => item.product.toString() !== productId)

await cart.save();

return res.status(200).json({message : "Product removed successfully" , cart})

    }catch(error){

        console.log("Error" , error)

         return res.status(500).json({message : "Failed to remove product in cart"})

    }

}

// update cart quantity like 2 to 3 or 3 to 2

exports.updateCartQuantity = async( req , res) =>{

    try{

        const userId = req.userId;

        const {productId , quantity} = req.body

        if(!productId || !Number.isInteger(quantity) || quantity < 1){
            return res.status(400).json({message : "Valid productId and quantity are required" })
        }

        const cart = await Cart.findOne({user : userId});

        if(!cart){
            return res.status(404).json({message : "cart not found"})
        }

        const item = cart.items.find((item) => item.product.toString() === productId)

        if(!item){
            return res.status(404).json({message : "product not found in cart"})
        }

        // user quantity product krta vadhre product add na kri ske likering -15 che toh ee 20 add na kri ske

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({message : "Product not found"})
        }

        if(quantity > product.stock){
            return res.status(400).json({message : `Only ${product.stock} items available in stock`})
        }

        item.quantity = quantity;

        await cart.save();

        return res.status(200).json({message : "Cart Quantity Updated Successfully", cart})

    }catch(error){
        console.log("Error" , error)

         return res.status(500).json({message : "Failed to inc and dec quantity in cart"})
    }

}