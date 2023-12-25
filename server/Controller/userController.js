const userHelper=require('../Helper/userHelper')


module.exports={
   registerUser: async (req, res) => {
    console.log('hhhhhhhhhh');
        try {
           
            const response = await userHelper.signup(req.body);
            console.log(response);

            if (response.emailExist) {
                res.json({message:'Email already exists'});
            } else if (response.usercreated) {
                const UserData=response.usercreated
                console.log(UserData,'register');
                const userId = response.usercreated._id;

                const token = await userHelper.createToken(userId.toString());

                res.json({status:true,message:"User registerd",UserData,token})
            } else {
                res.json({status:false,UserData})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    loginUser: async (req, res) => {
        try {
            const response = await userHelper.forlogin(req.body);
            if (response.login && response.userExist) {
                const userData=response.userExist
                const userId = response.userExist._id;
                const username = response.userExist.username;

                const token = await userHelper.createToken(userId.toString(), username);
                
                res.json({status:true,userData,token});
            } else {
                res.json({status:false})
            }
        } catch (error) {
            console.log('Internal Server Error');
            res.status(500).send('Internal Server Error');
        }
    },
    addProduct : async (req,res)=>{
       try {
         console.log(req.body);
         const response = await userHelper.addProduct(req.body)
         res.status(201).json({response,message:"product added successfully"})
       } catch (err){

       }
    },
    getProduct : async (req,res)=>{
        try {
           const response = await userHelper.getProduct() 
           if(response){
            res.status(201).json(response)
           } else {
             return {status: false, message : "product not found"}
           }
        } catch (error) {
            
        }
    },
    addToCart : async (req,res)=>{
        try {
          const response = await userHelper.addToCart(req.body)
          if(response){
            res.status(201).json(response)
          }else{
            res.status(401).json({message:'Somthing Went Wrong'})
          }

        } catch (error) {
            
        }
    },

    getCartProduct:async(req,res)=>{
        try {
            const response=await userHelper.getCartProduct(req.params.userId)
            res.json(response)
        } catch (error) {
            console.log(error);
        }
    },
    clearCart : async (req,res)=>{

        try {
           const response = await userHelper.clearCart(req.params.userId);
           if(response){
             res.status(201).json(response)
           }
        } catch (error) {
            
        }
    }
}