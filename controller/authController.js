const express = require('express')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = 'aslfhlasfhlsfhlsafhasflhas'

//sign up
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj)
        if (user) {
            return res.json({
                message: "user signed up",
                data: user
            })
        }
        else {
            res.json({
                message: "error while siging up"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//log in user
module.exports.login = async function login(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                //bcrypt -> compare
                if (user.password == data.password) {

                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid }, JWT_KEY);

                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: 'User logged in',
                        userDetails: data
                    })
                }
            }
            else {
                return res.json({
                    message: "wrong credentials"
                })
            }
        }
        else {
            return res.json({
                message: "please enter the email"
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

//isAuthorised-> to check the users role

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next()
        }
        else {
            res.json({
                message: "operation not allowed"
            })
        }
    }
}

// protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                console.log('paylod token', payload)
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role)
                console.log(req.id)
                next();
            }
            else {
                return res.json({
                    message: "please log in"
                })
            }
        }
        else {
            return res.json({
                message: "operation not allowed"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

//forget password    
module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        if (user) {
            const user = await userModel.findOne({ email: email });
            // create resetToken is used to create new token
            const resetToken = user.createResetToken();
            // http://abc.com/resetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //send email to user
            //nodemailer
        }
        else {
            return res.json({
                message: "please signup"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

// reset password

module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmpassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            // reset password handler will update users password in db
            user.resetPasswordHandler(password, confirmpassword);
            await user.save()
            res.json({
                message: "user password changed succesfully, log in again"
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}