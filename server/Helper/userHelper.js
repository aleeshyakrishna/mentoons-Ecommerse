const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../model/userSchema')
const Product = require("../model/productSchema")
const Cart = require("../model/cartSchema")
const mongoose = require('mongoose');
module.exports={

    createToken: async (userId) => {

        const JWT_SECRET='d2365790aadbaef646d8825c53a3e3822447333cd0898f2d1df5854ffbaf8f9375d66c0156ed9a68f6432e84ea6de0d77424834ff57bedd55a4bd9b719b3fde3'
        if (JWT_SECRET) {
            const token = jwt.sign({ _id: userId}, JWT_SECRET, {
                expiresIn: '30d',
            });
            return token;
        } else {
            throw new Error('JWT TOKEN is not defined');
        }
    },

    signup: async (userdata) => {
        console.log(userdata,"{}{}");
        try {
            const emailExist = await User.findOne({ email: userdata.email });
            if (emailExist) {
                return { emailExist: true };
            }
            const password = await bcrypt.hash(userdata.password, 10);
            const user = new User({
                username: userdata.username,
                email: userdata.email,
                phone: userdata.phone,
                password: password,
            });

            const usercreated = await user.save();
            return { existinguser: false, password: true, usercreated };
        } catch (error) {
            console.error(error);
            throw new Error('Error in signup process.');
        }
    },

    forlogin: async (loginData) => {
        try {
            let userExist = await User.findOne({ email: loginData.email });
            if (!userExist) {
                return { login: false };
            } else {
                let checkPassword = await bcrypt.compare(loginData.password, userExist.password);
                if (checkPassword) {
                    return { login: true, userExist };
                } else {
                    return { login: false };
                }
            }
        } catch (error) {
            console.log('Internal Server Error');
            throw new Error('Internal Server Error');
        }
    },

 addProduct : async (productData)=>{

    try {
      const response = await Product.create(productData)
      console.log(response,"pppp");
      return response;
    } catch (err) {
      console.log(err);
    }
 },
 getProduct : async ()=>{
    try {
        const response = await Product.find({})
        console.log(response,"get product responser");
        return response
    } catch (error) {
        
    }
 },
 addToCart: async (cartData) => {

    try {
      const existingCart = await Cart.findOne({ userId: cartData.userId });
  
      if (!existingCart) {
        console.log("oooooooooooooo");
  
        const data = {
          userId: cartData.userId,
          products: [{
            productId:cartData.productId,
            quantity:1
        }],
        };
  
        const newCart = await Cart.create(data);
        console.log(newCart, "cart added success");
      } else {
        const checkUpdateCart = await existingCart.products.find((product)=>product.productId === cartData.productId)
        console.log(checkUpdateCart,"============");
        if(checkUpdateCart){
            const incrementQuantity = await Cart.findOneAndUpdate(
                {
                  userId: cartData.userId,
                  'products.productId': cartData.productId,
                },
                { $inc: { 'products.$.quantity': 1 } },
                { new: true }
              );
         console.log(incrementQuantity);
        }else{
            const updateCart = await Cart.findOneAndUpdate(
                { userId: cartData.userId },
                { $push: { products:{ productId:cartData.productId,quantity:1 }} },
                { new: true }
              );
        }
      return {status:true,message:"Item Added to Cart"}
      }
    } catch (error) {
      console.error(error);
    }
  },

//   getCartProduct: async (userId) => {
//     console.log(userId, ")()()()()(");
//     try {
//       const cart = await Cart.aggregate([
//         {
//           $match: { userId: userId },
//         },
//         {
//           $lookup: {
//             from: 'products',
//             localField: 'products.productId',
//             foreignField: '_id',
//             as: 'productDetails',
//           },
//         },
//         // Optionally, you can project only the necessary fields
//         {
//           $project: {
//             _id: 1,
//             userId: 1,
//             productDetails: 1,
//           },
//         },
//       ]);

//       console.log(cart,"oooooooo");
//       // The 'cart' variable now contains the aggregated data with product details nested within the products array
//     } catch (error) {
//       console.error(error);
//     }
// }

 getCartProduct : async (userId) => {
    try {
        // Find the cart based on userId
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            // Handle case where cart is not found for the given userId
            return [];
        }

        // Extract product details using productIds from the cart
        const productDetails = await Promise.all(cart.products.map(async (cartProduct) => {
            const product = await Product.findById(cartProduct.productId);

            if (product) {
                return {
                    productId: product._id,
                    productName: product.productName,
                    category: product.category,
                    productPrice: product.productPrice,
                    productImage: product.productImage,
                    quantity: cartProduct.quantity
                };
            }

            // Handle case where product is not found for the given productId
            return null;
        }));

        // Filter out null values (products not found) and return the result
        return productDetails.filter(product => product !== null);
    } catch (error) {
        console.error(error);
        throw error; // Propagate the error to the calling function or handle it appropriately
    }
},
clearCart: async (userId) => {
    console.log(userId, "pppppppppp");
    try {
        const response = await Cart.updateOne(
            { userId: userId },
            { $set: { products: [] } }
        );
        return response;
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}

  

}