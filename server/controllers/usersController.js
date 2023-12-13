const User = require('../models/User')
const Tags = require('../models/tags')
const Post = require('../models/posts')
const Join = require('../models/joinlist')
const Career = require('../models/career')
const Comment = require('../models/comments')
const Achievements = require('../models/achievements')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const axios = require('axios')
const AWS = require('aws-sdk');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

const getTagById = asyncHandler(async (req, res) => {
    const tagName = req.params.tag.toLowerCase(); // get the tag name from the request parameters

    // Find the tag by name
    console.log(tagName)
    const tag = await Tags.findOne({ tag: tagName }).lean();
    console.log(tag)

    if (!tag) {
        return res.status(400).json({ message: 'Tag not found' });
    }

    res.json({ tagId: tag._id });
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { email, password, displayName, slug } = req.body

    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // Fetch all achievements from the database
    const achievements = await Achievements.find().lean().exec();

    // Create an array of achievements for the user
    const userAchievements = achievements.map(({ _id, crown, goal }) => ({
        id: _id,
        crown,
        goal,
    }));

    const userObject = { email, "password": hashedPwd, displayName, slug, achievements: userAchievements, profileImage: "/images/2cc849b35837ccb7f4c968159b626a24", backImage: "/images/062a789423f6fe6e937f568ac9b73f76" }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${email} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})


//add user to maillist 
const createNewMailer = asyncHandler(async (req, res) => {
    const { email, name } = req.body

    // Confirm data
    if (!email || !name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    const userObject = { email, name }

    // Create and store new user 
    const user = await Join.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `Welcome ${email} you have been added to AON Mailer. Please stand by for updates on the cool space launch since Apollo 11` })
    } else {
        res.status(400).json({ message: 'Invalid user data received, Please check provided information for errors.' })
    }
})

const createCareerCandidate = asyncHandler(async (req, res) => {
    const { email, name, title, salary, comment, resume } = req.body

    // Confirm data
    if (!email || !name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    const userObject = { email, name, title, salary, comment, resume }

    // Create and store new user 
    const user = await Career.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `Welcome ${email} you have been added to AON Career Pool. Please stand by for updates on the cool space launch since Apollo 11` })
    } else {
        res.status(400).json({ message: 'Invalid user data received, Please check provided information for errors.' })
    }
})


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, title } = req.body

    // Confirm data 
    if (!id || !title) {
        return res.status(400).json({ message: 'Both id and title fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.title = title
    user._id = id

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.displayName} updated` })
})

const updateDisplayname = asyncHandler(async (req, res) => {
    const { id, displayName, slug, displayTut } = req.body

    // Confirm data 
    if (!id || !displayName) {
        return res.status(400).json({ message: "Both id and displayname fields are required" });
    }

    const existingUser = await User.findOne({ displayName }).exec();
    if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({ message: "Displayname already in use, please enter a different one" });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Update posts with old displayName to new displayName
    await Post.updateMany({ slug: slug }, { user: displayName });

    user.displayName = displayName;
    user._id = id;
    user.displayTut = displayTut;

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.displayName} updated` });
});

const updateBio = asyncHandler(async (req, res) => {
    const { id, bio, bioTut } = req.body

    // Confirm data 
    if (!id || !bio) {
        return res.status(400).json({ message: 'Both id and bio fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.bio = bio
    user.bioTut = bioTut

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.bio} updated` })
})

const updatePostTut = asyncHandler(async (req, res) => {
    const { id, postTut } = req.body

    // Confirm data 
    if (!id) {
        return res.status(400).json({ message: 'Both id and bio fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.postTut = postTut

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.postTut} updated` })
})

const updateProfpic = asyncHandler(async (req, res) => {
    const { id, profImageTut } = req.body

    // Confirm data 
    if (!id) {
        return res.status(400).json({ message: 'Both id and img fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.profImageTut = profImageTut;

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.profileImage} updated` })
});

const updateBackgroundpic = asyncHandler(async (req, res) => {
    const { id, backImage, backImageTut } = req.body
    console.log("this is firing")

    // Confirm data 
    if (!id) {
        return res.status(400).json({ message: 'Both id and img fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    user.backImage = backImage;
    user.backImageTut = backImageTut;

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.backImage} updated` })
});

const updateFollowing = asyncHandler(async (req, res) => {
    const { id, slug } = req.body;

    // Confirm data
    if (!id || !slug) {
        return res.status(400).json({ message: "Both id and slug fields are required" });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    console.log('a')
    console.log(user)
    user._id = id;

    user.following.push(slug);
    console.log('b')
    console.log(slug)
    console.log('c')

    const updatedUser = await user.save();

    const otherId = slug

    // Find the otheruser by slug and update their followers
    const otheruser = await User.findOne({ slug: otherId }).exec()
    console.log(otheruser)

    if (otheruser) {
        otheruser.followers.push(id);
        await otheruser.save();
    }

    res.json({ following: updatedUser.following, message: `${updatedUser.following} updated` });
});

const updateUnfollowing = asyncHandler(async (req, res) => {
    const { id, removeSlug } = req.body

    // Confirm data 
    if (!id || !removeSlug) {
        return res.status(400).json({ message: "Both id and slug fields are required" });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user._id = id;

    console.log(removeSlug)
    const index = user.following.findIndex(slug => slug === removeSlug);
    if (index !== -1) {
        user.following.splice(index, 1);
        await user.save()
    }

    const otheruser = await User.findOne({ slug: removeSlug }).exec();

    const otherindex = otheruser.followers.findIndex(slug => slug === id);
    if (otherindex !== -1) {
        otheruser.followers.splice(otherindex, 1);
        await otheruser.save();
    }

    res.json({ following: user.following });
});
const updateSupporting = asyncHandler(async (req, res) => {
    const { id, slug } = req.body;
    if (!id || !slug) {
        return res.status(400).json({ message: "Both id and slug fields are required" });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user._id = id;
    user.supporting.push(slug);
    console.log(slug)
    const updatedUser = await user.save();
    const otherId = slug
    // Find the otheruser by slug and update their followers
    const otheruser = await User.findOne({ slug: otherId }).exec()
    if (otheruser) {
        otheruser.supporters.push(id);
        await otheruser.save();
    }
    res.json({ supporting: updatedUser.supporting, message: `${updatedUser.supporting} updated` });
});
const updateUnsupporting = asyncHandler(async (req, res) => {
    const { id, removeSlug } = req.body

    // Confirm data 
    if (!id || !removeSlug) {
        return res.status(400).json({ message: "Both id and slug fields are required" });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user._id = id;
    const index = user.supporting.findIndex(slug => slug === removeSlug);
    if (index !== -1) {
        user.supporting.splice(index, 1);
        await user.save()
    }

    const otheruser = await User.findOne({ slug: removeSlug }).exec();
    const otherindex = otheruser.supporters.findIndex(slug => slug === id);
    if (otherindex !== -1) {
        otheruser.supporters.splice(otherindex, 1);
        await otheruser.save();
    }

    res.json({ supporting: user.supporting });
});


const updateCreateTagFollowing = asyncHandler(async (req, res) => {
    const { id, tagFollowing } = req.body

    // Confirm data 
    if (!id || !tagFollowing) {
        return res.status(400).json({ message: "Both id and tagFollowing fields are required and tagFollowing must be an array" });
    }

    // Does the user exist to update?
    const user = await User.findOne({ slug: id }).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    // Add new tags only if they don't already exist
    tagFollowing.forEach((newTag) => {
        if (
            !user.tagFollowing.some(
                (existingTag) => existingTag.tag === newTag.tag
            )
        ) {
            user.tagFollowing.push(newTag);
        }
    });

    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.tagFollowing.length} tags following updated` });
});
const removeTagsFromUser = asyncHandler(async (req, res) => {
    const { id, tagsToRemove } = req.body;

    // Confirm data
    if (!id || !tagsToRemove || !Array.isArray(tagsToRemove)) {
        return res.status(400).json({ message: "Both id and tagsToRemove fields are required, and tagsToRemove must be an array" });
    }

    // Does the user exist to update?
    const user = await User.findOne({ slug: id }).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    user.tagFollowing = user.tagFollowing.filter(existingTag => !tagsToRemove.some(tagToRemove => tagToRemove.tagId === existingTag.tagId));

    const updatedUser = await user.save();

    res.json({ message: updatedUser });
});

const tutcomplete = asyncHandler(async (req, res) => {
    const { id, tutcomplete, tutview } = req.body

    // Confirm data 
    if (!id) {
        return res.status(400).json({ message: 'Both id and tutcomplete fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    if (tutcomplete) {
        user.tutcomplete = tutcomplete;
        user.tutview = false;
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.tutcomplete} updated` })
});

const updateStars = asyncHandler(async (req, res) => {
    const { id, stars } = req.body

    // Confirm data 
    if (!id) {
        return res.status(400).json({ message: 'Both id and tutcomplete fields are required' })
    }

    // Does the user exist to update?
    const user = await User.findOne({ slug: id }).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    if (stars) {
        user.stars = stars
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.stars} updated` })

})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const comment = await Comment.findOne({ user: id }).lean().exec()
    if (comment) {
        return res.status(400).json({ message: 'User has assigned comments' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.displayName} with ID ${result._id} deleted`

    res.json(reply)
})

// Configure AWS credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();

const updateQrcode = asyncHandler(async (req, res) => {
    const { id, data } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Both id and tutcomplete fields are required' });
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // If the user is found, log "Found!"
    console.log('Found!');

    // Build the QR code URL
    const qrCodeUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent('https://aonverse.com')}&size=200x200&margin=6&color=04d9ff`;

    try {
        // Send a GET request to the QR code URL
        const response = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });

        // Upload the QR code image to S3 bucket
        const uploadParams = {
            Bucket: 'aonverse',
            Key: `qr-codes${data}.png`, // Specify the file name
            Body: response.data,
            ContentType: 'image/png' // Adjust the content type based on your image format
        };

        await s3.upload(uploadParams).promise();

        // Log the QR code URL
        console.log(qrCodeUrl);

        // Store the key in the user's qrcode field
        user.qrcode = `/images/qr-codes${data}.png`;
        await user.save();

        // Handle the response as needed, you might want to save it, send it to the client, etc.
        return res.json({ message: 'QR code image uploaded to S3', user });
    } catch (error) {
        console.error('Error creating QR code:', error);
        return res.status(500).json({ message: 'Error creating QR code' });
    }
});

module.exports = {
    getAllUsers,
    getTagById,
    createNewUser,
    updateUser,
    updateDisplayname,
    updateBio,
    updatePostTut,
    updateProfpic,
    updateBackgroundpic,
    updateFollowing,
    updateUnfollowing,
    updateQrcode,
    updateCreateTagFollowing,
    removeTagsFromUser,
    tutcomplete,
    updateStars,
    deleteUser,
    createNewMailer,
    createCareerCandidate,
    updateSupporting,
    updateUnsupporting
}