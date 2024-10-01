const express = require('express')
const { addToCart, getCartItems, removeFromCart, updateQuantity ,createCheckoutSession,verifyPayment} = require('../control/cartcontrol')

const cartrouter = express.Router()

cartrouter.route('/addtocart').post(addToCart)
cartrouter.route('/getcart/:userId').get(getCartItems)
cartrouter.route('/removefromcart/:userId/:productId').delete(removeFromCart)
cartrouter.route('/updatequantity/:userId/:productId').put(updateQuantity)
cartrouter.route('/create-checkout-session/:userId').post(createCheckoutSession);
cartrouter.route('/verify-payment/:sessionId').get(verifyPayment);



module.exports = cartrouter