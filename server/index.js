const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('uploads'))

const productrouter = require('./router/productrouter')
const userrouter = require('./router/userrouter')
const cartrouter = require('./router/cartrouter')

app.use('/addproduct', productrouter)
app.use('/userreg', userrouter)
app.use('/cart', cartrouter)

// Create admin user on server start
const { createAdminUser } = require('./control/admincontrol')
createAdminUser()

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})