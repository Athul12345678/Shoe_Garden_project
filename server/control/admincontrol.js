const UserModel = require('../model/usermodel');
const bcrypt = require('bcrypt');

async function createAdminUser() {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'adminpassword123';
    const salt = 10;

    try {
        const existingAdmin = await UserModel.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        const adminUser = new UserModel({
            username: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            mobilenumber: '1234567890',
            isAdmin: true
        });

        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

module.exports = { createAdminUser };