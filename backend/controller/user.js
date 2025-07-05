const User = require("../model/userSchema.js")
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const passport=require("passport");
async function signup(req, res) {
    // console.log("register sucessfully")
    try {
        let { username, email, password } = req.body;
        let user = await User.findOne({ username: username });

        if (user) {
            // console.log(user);
            return res.json({
                success: false,
                message: "user already exists"
            })
        }
        let userWithEmail = await User.findOne({ email: email })
        if (userWithEmail) {
            return res.json({
                success: false,
                message: "email already exists"
            })
        }
        if (email === "" || username === "" || password === "") {
            return res.json({
                success: false,
                message: "Please fill the form !"
            })
        }
        const hashpass = await bcrypt.hash(password, 12);
        let newUser = new User({ email, username, password: hashpass,role:"user" });
        await newUser.save()
        return res.status(200).json({
            success: true,
            message: "Account created sucessfully"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function Login(req, res) {
    try {
        let { username, password } = req.body;
        let user = await User.findOne({ username: username });
        // console.log(username, password)
        if (username === "" || password === "") {
            return res.json({
                success: false,
                message: "Please fill the form !"
            })
        }
        if (!user) {
            return res.json({
                success: false,
                message: "user donot exists"
            })
        }

        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return res.json({
                success: false,
                message: "incorrect password ! please try again"
            })
        }
        const token = jwt.sign({
            id: user._id, role: user.role, email: user.email,username:user.username
        }, 'secret_key', { expiresIn: "10m" });
        // res.cookie('token', token, { httpOnly: true, secure: true }).json({
        //     success: true,
        //     message: "sucessfully logged in",
        //     user: {
        //         email: user.email,
        //         role: user.role,
        //         id: user._id,
        //         username:user.username,
        //     }
        // })
        res.status(200).json({
            success: true,
            message: "sucessfully logged in",
            token,
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                username:user.username,
            }
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


function logout(req,res){
    res.clearCookie("token").json({
        success:true,
        message:"Suceffuly logged out"
    })
}





// const authMiddleware = (req, res, next) => {
//     const token = req.cookies?.token; // Safe check for cookies
//     // console.log("Token:", token);

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Unauthorized User"
//         });
//     }

//     try {
//         let decoded = jwt.verify(token, 'secret_key'); // Use verify instead of decode
//         req.user = decoded;
//         next();
//     } catch (err) {
//         console.error("JWT Error:", err.message);
//         return res.status(401).json({
//             success: false,
//             message: "Invalid Token"
//         });
//     }
// };

const authMiddleware = (req, res, next) => {
    // const token = req.cookies?.token; // Safe check for cookies
    // console.log("Token:", token);
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        });
    }

    try {
        let decoded = jwt.verify(token, 'secret_key'); // Use verify instead of decode
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};


module.exports = { signup, Login ,logout,authMiddleware};