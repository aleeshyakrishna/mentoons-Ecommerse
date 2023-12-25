var express = require('express');
var router = express.Router();
const userController=require('../Controller/userController')

/* GET users listing. */
router.post('/signup',userController.registerUser);
router.post('/login',userController.loginUser)
router.post('/addProduct',userController.addProduct)
router.get('/getProduct',userController.getProduct)
router.post('/addToCart',userController.addToCart)
router.get('/getCart/:userId',userController.getCartProduct)
router.delete('/clearCart/:userId',userController.clearCart)

module.exports = router;
