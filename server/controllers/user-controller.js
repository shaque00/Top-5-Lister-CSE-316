const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                userName: loggindUser.userName
            }
        }).send();
    })
}

loginUser = async (req, res) => {
    console.log("In usercontroller for the login function");
    try {
        const { email, password, userName} = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({  errorMessage: "Wrong email or password." });
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser){
            return res
                .status(400)
                .json({  errorMessage: "Wrong email or password." });
        }

        const existingUser2 = await User.findOne({ userName: userName });

        if (!existingUser2){
            return res
                .status(400)
                .json({  errorMessage: "Wrong email or password." });
        }

        console.log("Foumd a user");

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordCorrect){
            return res
                .status(401)
                .json({  errorMessage: "Wrong email or password." });
        }

        console.log("Passsword matched");

        console.log(existingUser);

        const token = auth.signToken(existingUser);

        console.log("Checks have passed");

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                userName: existingUser.userName
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

registerUser = async (req, res) => {
    console.log("Registering a neww users");
    try {
        const { firstName, lastName, email, password, passwordVerify, userName } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify || !userName) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("About to check password field");
        if (password.length < 8) {
            console.log("Checking for lenngth");
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const existingUser2 = await User.findOne({ userName: userName });
        if (existingUser2) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this user name address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, passwordHash, userName
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                userName: savedUser.userName
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser
}