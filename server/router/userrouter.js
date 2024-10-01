const express=require('express')
const userrouter=express.Router()
const {user_registration,display,login}=require('../control/usercontrol')
const adminAuth = require('../control/adminauth')

userrouter.route('/user_reg').post(user_registration)
userrouter.route('/login'). post(login)
userrouter.route('/user_display'). get(display,adminAuth)


module.exports=userrouter