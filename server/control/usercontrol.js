const main = require('../model/database');
main().catch(err => console.log(err));
const usermodel = require('../model/usermodel');
const bcrypt=require('bcrypt')
const salt=10;
const jwt=require ('jsonwebtoken')

const user_registration = async (req, res) => {
   // bcrypt.hash(req.body.password,salt,function(err,hashpassword){
        
    // })
    const { username, email, password, confirmpassword, mobilenumber } = req.body;
    const record = await usermodel.find({ email: email });
    
    if (record.length > 0) {
        return res.status(400).json("Email already existing");
    }
    
    if (password !== confirmpassword) {
        return res.status(400).json("Passwords do not match");
    }
    
    try {
        const hashedPassword=await bcrypt.hash(password,salt)
        await usermodel.create({ username, email, password:hashedPassword, mobilenumber });
        res.status(201).json("User Registered Successfully");
    } catch (err) {
        res.status(500).json("Error registering user: " + err.message);
    }
};

const display = async (req, res) => {
    try {
        const record = await usermodel.find();
        res.json(record);
    } catch (err) {
        res.status(500).json("Error retrieving users: " + err.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });
    
    try {
        const user = await usermodel.findOne({ email: email });
        console.log('Found user:', user);
        
        if (!user) {
            return res.status(400).json("Email not found");
        }
        
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json("Incorrect password");
        }

        const token = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin
        }, 'shoe', {expiresIn: '1hr'})
        console.log(token)

        res.status(200).json({
            message: "Login successful",
            userid: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json("Error during login: " + err.message);
    }
};

module.exports = { user_registration, display, login };
