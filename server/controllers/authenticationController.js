const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt')
const Achievements = require('../models/achievements')
const sendEmail = require('../utils/mail.service')
const passport = require('passport')
const sgMail = require('@sendgrid/mail');
TwitterStrategy = require('passport-twitter').Strategy; 
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.SERVER_URL + "/api/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    console.log('Twitter profile:', profile);
    // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body; // Use req.query to access query parameters

    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Find a user with the provided email
        console.log('Email:', email);
        const user = await User.findOne({ email });

        // If no user with the provided email is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If the email and password are correct, generate a JWT
        const token = jwtUtils.generateToken(user);

        // Respond with the user data (excluding the password) and the JWT
        res.json({ user: { ...user._doc, password: undefined }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const createNewUser = asyncHandler(async (req, res) => {
    const { email, password, displayName, profimage, backimage } = req.body;

    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check for duplicate email
        const duplicate = await User.findOne({ email }).lean().exec();

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate email' });
        }

        // Hash password
        const hashedPwd = await bcrypt.hash(password, 15); // salt rounds

        // Fetch all achievements from the database
        const achievements = await Achievements.find().lean().exec();

        // Create an array of achievements for the user
        const userAchievements = achievements.map(({ _id, crown, goal }) => ({
            id: _id,
            crown,
            goal,
        }));

        console.log(profimage, backimage)

        const userObject = { email, password: hashedPwd, achievements: userAchievements, displayName, profimage, backimage };

        // Create and store new user
        const user = await User.create(userObject);

        if (!user) {
            return res.status(400).json({ message: 'Invalid user data received' });
        }

        // Generate a JWT token for the newly registered user
        const token = jwtUtils.generateToken(user);

        // Respond with the JWT token in addition to the success message
        res.status(201).json({ user: { ...user._doc, password: undefined }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const loginSocial = asyncHandler(async (req, res) => {
    const { email, displayName, name, photoURL } = req.body; // Use req.query to access query parameters
    if (!email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Find a user with the provided email
        let newuser;
        const user = await User.findOne({ email });
        const userName = name ? name : displayName;
        // If no user with the provided email is found
        if (!user) {
            // Hash password
            const hashedPwd = await bcrypt.hash(userName, 15); // salt rounds

            // Fetch all achievements from the database
            const achievements = await Achievements.find().lean().exec();

            // Create an array of achievements for the user
            const userAchievements = achievements.map(({ _id, crown, goal }) => ({
                id: _id,
                crown,
                goal,
            }));

            const userObject = { email, password: hashedPwd, achievements: userAchievements, displayName: userName };

            // Create and store new user
            newuser = await User.create(userObject);
        }

        // If the email and password are correct, generate a JWT
        const token = jwtUtils.generateToken(user || newuser);

        // Respond with the user data (excluding the password) and the JWT
        res.json({ user: user | newuser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const twitterLogin = asyncHandler(async (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
});

const deleteUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If email and password are correct, delete the user
        await User.deleteOne({ _id: user._id });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (user) {
            // Send a basic email to the user
            const emailMessage = {
                to: user.email,
                from: 'support@aontechnology.io',
                subject: "Forgot your password? No problem!",
                text: `Hello ${user.name},\n\nYou've forgotten your password! No worries, click this link!`,
            };

            // Send the email to the user
            try {
                await sgMail.send(emailMessage);
                console.log(`Email sent successfully to ${user.email}`);
                return res.status(201).json({ message: `Welcome to Aonverse, ${user.email}! You have been added to AON Mailer. Please stand by for updates on the cool space launch since Apollo 11` });
            } catch (error) {
                console.error('Error sending email to the user:', error);
                return res.status(500).json({ message: 'Error sending email to the user', error });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Server Error', error });
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, confirmPassword, resetToken } = req.body;
    const decoded = jwtUtils.verifyToken(resetToken);
    const email = decoded?.email;

    if (!email || !password || !confirmPassword || !resetToken) {
        return res.status(400).json({ message: 'Email, password, confirm password, and reset token are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided confirm password with the provided password
        if (password !== confirmPassword) {
            return res.status(401).json({ message: 'Passwords do not match' });
        }

        // Verify the provided reset token
        const decoded = jwtUtils.verifyToken(resetToken);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid reset token' });
        }

        // Hash the new password
        const hashedpassword = await bcrypt.hash(password, 15); // salt rounds

        // Update the user's password
        user.password = hashedpassword;
        await user.save();

        res.status(200).json({ email: user.email, message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})

const changePassword = asyncHandler(async (req, res) => {
    const { email, currentPassword, password } = req.body;
    // Confirm data
    if (!email || !confirmPassword || !password) {
        return res.status(400).json({ message: 'Email, current password, and new password are required' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Hash the new password
        const hashedpassword = await bcrypt.hash(password, 15); // salt rounds

        // Update the user's password
        user.password = hashedpassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = {
    login,
    loginSocial,
    twitterLogin,
    createNewUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    changePassword
}