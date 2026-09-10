import userModel from "../models/User.Models.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/NodeMailer.js";


const GenerateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    //send cookies
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return token
}


// const GenerateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET)
// }


const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        //check is user exists 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = GenerateToken(user._id, res)

            return res.send({
                success: true,
                message: "User logged in successfully",
                name: user.name,
                email: user.email,
                token: token
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Invalid credentials",
            })
        }
    } catch (error) {
        console.log('Error in RegisterUser: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check for exisiting user
        const existUser = await userModel.findOne({ email })
        if (existUser) {
            return res.status(404).json({ success: false, message: "User already exists" })
        }

        //check for valid email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        //check for password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //save in database
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        //create token for authentic user
        const token = GenerateToken(user._id, res)

        const MailOption = {
            from: 'danishicp99@gmail.com',
            to: email,
            subject: `Welcome to Danish Khan's Website, ${name}!`,
            text: `Dear ${name}, welcome to my website! How can I help you today? Best wishes.`,
            // html: WELCOME_MAIL_TEMPLATE.replace('{{username}}', username)
        };

        await transporter.sendMail(MailOption)
        console.log(`email sent successfully ${email}`)

        return res.send({
            success: true,
            message: "User registered successfully",
            name: user.name,
            email: user.email,
            token: token
        })

    } catch (error) {
        console.log('Error in RegisterUser: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const LogoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.status(200).json({ success: true, message: "loggedOut sucessfully" })
    } catch (error) {
        console.log('Error in RegisterUser: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(200).json({ success: true, message: "admin login successfully", token })
        } else {
            return res.status(404).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log('Error in AdminLogin: ', error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


//verification and otp controllers
const sendverfiyOtp = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isAccountVerified) {
            return res.status(401).json({ success: false, message: "Account Already verify !!" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `Verify Your Email !`,
            text: `Dear <h3 style = "color:red;"> ${user.name}<h3>,
        
        your email verification OTP is : .
        OTP: <span style="color: #4CAF50; padding:10px">${otp}</span>
        please verify account with in 24h Thank You 
       Please do not share this OTP with anyone for security reasons !!
        
        Best regards,  
        Danish Khan`

        }

        await transporter.sendMail(mailoptions);
        res.status(201).json({ success: true, message: "OTP send" })

    } catch (error) {
        console.log('error in verifying otp controller', error.message);
        return res.status(500).json({ success: false, message: "internal server Error" })
    }
}


const verfiyEmail = async (req, res) => {
    const userId = req.user._id;
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: "details missing" })
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({ success: false, message: "User Not found !" })
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({ success: false, message: "invalid otp !" })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: "otp expired" })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save()

        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `Congratulations! Your Account is Verified`,
            text: `Hello ${user.name},
        
        We are excited to inform you that your account has been successfully verified! 
        You can now enjoy full access to all the features and services of our platform.
        
        If you have any questions or need assistance, please don’t hesitate to contact us.
                        
   
        
        Best regards,  
        Danish Khan`

        }

        await transporter.sendMail(mailoptions)

        return res.status(200).json({ success: true, message: "Account verification success ." })

    } catch (error) {
        console.log('error in verifying email controller', error.message);
        return res.status(500).json({ success: false, message: "internal server Error" })
    }
}

const SendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ Success: false, message: "email is required !" })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ Success: false, message: "user not found !" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        console.log(otp)

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save()

        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `password Reset OTP !`,
            text: `Dear <h3 style = "color:red;"> ${user.name}<h3>,
        
       your password reset otp is : .
        OTP: <span style="color: #4CAF50; padding:10px">${otp}</span>
        please use otp with in 15 min use this otp for resting your password
       Please do not share this OTP with anyone for security reasons !!
        
        Best regards,  
        Danish Khan`

        }
        await transporter.sendMail(mailoptions)
        return res.json({ success: true, message: "password reset otp is send" })

    } catch (error) {
        console.log('error in password reset controller', error.message);
        return res.status(500).json({ success: false, message: "internal server Error" })
    }
}


const resetPassword = async (req, res) => {
    const { email, otp, newpassword } = req.body
    if (!email || !otp || !newpassword) {
        return res.json({ success: false, message: "email otp password confirmpassword are required !" })
    }

    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user not found" })
        }
        if (user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: "invalid otp" })
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "otp expired" })
        }

        const HashNewPassword = await bcrypt.hash(newpassword, 10);
        user.password = HashNewPassword;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0

        await user.save();

        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: `password reset success !`,
            text: `Dear <h3 style = "color:red;"> ${user.name}<h3>,
            Your password is reset successfully 
        if is this you ignore this message : .
        your new password is don't worry this is encrypted smile :) => ${user.password}</span> 
        if any issue sent message on this !!
        
        Best regards,  
        Danish Khan`

        }

        await transporter.sendMail(mailoptions);

       return res.json({ success: true, message: "password reset" })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

const GetUserData = async (req, res) => {
    try {
        const  userId  = req.user._id;

        if (!userId) {
            return res.json({ success: false, message: "User ID Not Found !" })
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User Not Found !" })
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        console.log("error in getUserData", error.message);
        return res.json({ success: false, message: "internal server Error" })
    }
}



export { LoginUser, RegisterUser, LogoutUser, AdminLogin, sendverfiyOtp, verfiyEmail, SendResetOtp , resetPassword , GetUserData}