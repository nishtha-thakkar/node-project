const Cart= require("../model/cartModel");
const Order = require("../model/orderModel")
const Product = require("../model/product")
const User = require("../model/user")
const mongoose = require("mongoose") // order save , stck , deduction , cart clear mte


// exports.placeOrder = async(req , res) => {

//     try{

//         const userId = req.userId;

//         const{shippingAddress} = req.body;

//         // check shipping address

//         if(typeof shippingAddress !== "string" || !shippingAddress.trim()){
//             return res.status(400).json({message : "Shipping Address is required"})
//         }

//         // find user in cart

//     const cart = await Cart.findOne({user : userId})

//     if(!cart || cart.items.length === 0){
//         return res.status(400).json({message : "Cart is empty"})
//     }

//     let totalAmount = 0;
//     const orderItems = [];

//     // check products and calculate total

//     for(const item of cart.items){
//         const product = await Product.findById(item.product);

//         if(!product){
//             return res.status(404).json({message : "Product not found"})
//         }

//         if(item.quantity > product.stock){
//             return res.status(400).json({message : `Insufficient stock for ${product.name}`})
//         }

//         orderItems.push({
//             product : product._id,
//             quantity:item.quantity,
//             price:product.price
//         })

//         totalAmount += product.price * item.quantity;
//     }

//     // save order

//     const order = await Order.create({
//         user : userId,
//         items:orderItems,
//         totalAmount,
//         shippingAddress:shippingAddress.trim(),
//         status: "Pending"
//     })

//     return res.status(201).json({message : "Order Placed Successfully" , order})


// }catch(error){
//         console.log("Error" , error)

//         return res.status(500).json({message : "Failed to place order"})
//     }

// }



exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const userId = req.userId;
    const { shippingAddress } = req.body;

    if (
      typeof shippingAddress !== "string" ||
      !shippingAddress.trim()
    ) {
      return res.status(400).json({
        message: "Shipping address is required"
      });
    }

    let order;

    await session.withTransaction(async () => {

      // 1. Find user cart
      const cart = await Cart.findOne({
        user: userId
      }).session(session);

      if (!cart || cart.items.length === 0) {
        const error = new Error("Cart is empty");
        error.statusCode = 400;
        throw error;
      }

      let totalAmount = 0;
      const orderItems = [];

      // 2. Check and reduce product stock
      for (const item of cart.items) {

        const product = await Product.findById(
          item.product
        ).session(session);

        if (!product) {
          const error = new Error("Product not found");
          error.statusCode = 404;
          throw error;
        }

        if (
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
        ) {
          const error = new Error("Invalid cart quantity");
          error.statusCode = 400;
          throw error;
        }

        // Atomic stock deduction
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: product._id,
            stock: { $gte: item.quantity }
          },
          {
            $inc: { stock: -item.quantity }
          },
          {
            new: true,
            session
          }
        );

        if (!updatedProduct) {
          const error = new Error(
            `Insufficient stock for ${product.name}`
          );
          error.statusCode = 400;
          throw error;
        }

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price
        });

        totalAmount += product.price * item.quantity;
      }

      // 3. Create order
      const orders = await Order.create(
        [{
          user: userId,
          items: orderItems,
          totalAmount,
          shippingAddress: shippingAddress.trim(),
          status: "Pending"
        }],
        { session }
      );

      order = orders[0];

      // 4. Clear cart
      cart.items = [];
      await cart.save({ session });

    });

    return res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("Place Order Error:", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : "Failed to place order"
    });

  } finally {
    await session.endSession();
  }
};



exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      user: userId
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders fetched successfully",
      totalOrders: orders.length,
      orders
    });

  } catch (error) {
    console.log("Get My Orders Error:", error);

    return res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};

//req.userId — Login થયેલા User ની ID લે છે.
// Order.find({ user: userId }) — ફક્ત એ User ના Orders શોધે છે.
// .populate("items.product") — Product ની Details બતાવે છે.
// .sort({ createdAt: -1 }) — નવા Orders પહેલાં બતાવે છે.
// totalOrders — User ના કુલ Orders બતાવે છે.


// get all order

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All orders fetched successfully",
      totalOrders: orders.length,
      orders
    });

  } catch (error) {
    console.log("Get All Orders Error:", error);

    return res.status(500).json({
      message: "Failed to fetch all orders"
    });
  }
};

// Order.find() — MongoDB માંથી બધા Users ના Orders લાવશે.
// .populate("user", "name email") — Order કરનાર User ની Details લાવશે.
// .populate("items.product") — Order માં રહેલી Products ની Details લાવશે.
// .sort({ createdAt: -1 }) — નવા Orders પહેલાં બતાવશે.
// orders.length — કુલ Orders ગણશે.



// update order

// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     // Check valid order status
//     const allowedStatuses = [
//       "Pending",
//       "Confirmed",
//       "Shipped",
//       "Delivered",
//       "Cancelled"
//     ];

//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({
//         message: "Invalid order status"
//       });
//     }

//     // Check valid MongoDB order ID
//     if (!mongoose.isValidObjectId(orderId)) {
//       return res.status(400).json({
//         message: "Invalid order ID"
//       });
//     }

//     // Find order in database
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({
//         message: "Order not found"
//       });
//     }

//     // Update order status
//     order.status = status;

//     // Save updated order
//     await order.save();

//     return res.status(200).json({
//       message: "Order status updated successfully",
//       order
//     });

//   } catch (error) {
//     console.log("Update Order Status Error:", error);

//     return res.status(500).json({
//       message: "Failed to update order status"
//     });
//   }
// };



exports.updateOrderStatus = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID"
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status"
      });
    }

    let updatedOrder;

    await session.withTransaction(async () => {
      const order = await Order.findById(orderId)
        .session(session);  // to connect query with transaction

      if (!order) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
      }

      // Cancelled order cannot be updated again
      if (order.status === "Cancelled") {
        const error = new Error(
          "Cancelled order cannot be updated"
        );
        error.statusCode = 400;
        throw error;
      }

      // Delivered order cannot be cancelled
      if (
        order.status === "Delivered" &&
        status === "Cancelled"
      ) {
        const error = new Error(
          "Delivered order cannot be cancelled"
        );
        error.statusCode = 400;
        throw error;
      }

      const validTransitions = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Shipped", "Cancelled"],
  Shipped: ["Delivered", "Cancelled"],
  Delivered: [],
  Cancelled: []
};

const nextStatuses = validTransitions[order.status];

if (!nextStatuses || !nextStatuses.includes(status)) {
  const error = new Error(
    `Cannot change order status from ${order.status} to ${status}`
  );
  error.statusCode = 400;
  throw error;
}

      // Restore stock when cancelling order
      if (status === "Cancelled") {
        for (const item of order.items) {
          const result = await Product.updateOne(
            { _id: item.product },
            {
              $inc: { stock: item.quantity }
            },
            { session }
          );

          if (result.matchedCount !== 1) {
            throw new Error(
              "Cannot restore stock: product not found"
            );
          }
        }
      }

      order.status = status;
      await order.save({ session });

      updatedOrder = order;
    });

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.log("Update Order Status Error:", error);

    return res.status(error.statusCode || 500).json({
      message: error.statusCode
        ? error.message
        : "Failed to update order status"
    });

  } finally {
    await session.endSession();
  }
};


//get a single product

exports.getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID"
      });
    }

    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // Only admin or order owner can view
    // if (
    //   req.user.role !== "admin" &&
    //   order.user._id.toString() !== req.userId.toString()
    // ) {
    //   return res.status(403).json({
    //     message: "Access denied"
    //   });
    // }

    const currentUser = await User.findById(req.userId);

    if(!currentUser){
        return res.status(401).json({message : "User not found"})
    }

    if(currentUser.role !== "admin" && order.user._id.toString() !== req.userId.toString()){
        return res.status(403).json({message : "Access denied"})
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to fetch order"
    });
  }
};