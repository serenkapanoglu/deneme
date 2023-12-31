const express = require('express')
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const Post = require("../models/posts");
const User = require("../models/User");
//s3 related code for images
const { uploadFile, getFileStream } = require('../s3')
const { processBacgroudImage } = require('../imageProcessor');

const upload = multer({ dest: "uploads/" });

function roundToNearestTen(num) {
    return Math.round(num);
}

const uploadImage = async (req, res) => {
    const { profipic, id, slug } = req.body;
    try {
        // Find the user by {slug: id}
        const user = await User.findById(id);

        if (!user) {
            return res.send({ Status: "error", data: "User not found" });
        }

        // Update the profimage field with the profipic being passed in
        user.profimage = profipic;
        await user.save();

        // Retrieve all posts created by the user
        const posts = await Post.find({ slug: slug });

        // Loop through the posts and update the profileImage field
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            post.profileImage = profipic;
            await post.save();
        }

        res.send({ Status: "ok" });
    } catch (error) {
        res.send({ Status: "error", data: error });
    }
}

const backupImage = async (req, res) => {
    const { backprofimage, id } = req.body;
    try {
        // Find the user by {slug: id}
        const user = await User.findById(id);

        if (!user) {
            return res.send({ Status: "error", data: "User not found" });
        }

        // Update the profimage field with the backprofimage being passed in
        user.backimage = backprofimage;
        await user.save();

        res.send({ Status: "ok" });
    } catch (error) {
        res.send({ Status: "error", data: error });
    }
}

const createImage = async (req, res) => {
    const file = req.file;
    
    // Assuming you have an S3 upload function named uploadFile
    const result = await uploadFile(file.path, file);
    
    // Assuming you have a function to unlink the local file
    await unlinkFile(file.path);
    
    res.send({ imagePath: `/images/${result.Key}` });
};


const getImageByKey = (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
}

const getImage = async (req, res) => {
    const id = req.query.id;
    try {
        // Find the user by {slug: id}
        const user = await User.findOne({ id });

        if (!user) {
            return res.send({ Status: "error", data: "User not found" });
        }

        // Retrieve the profimage field from the user document
        const data = { image: user.profimage };

        res.send({ Status: "ok", data: data });
    } catch (error) {
        res.send({ Status: "error", data: error });
    }
};

module.exports = imagesRoutes = (app) => {
    app.post("/api/upload-image", uploadImage);
    app.post("/api/upload-backimage", backupImage);
    app.post('/api/images', upload.single('image'), createImage);
    app.get('/api/images/:key', getImageByKey);
    app.get("/api/get-image", getImage);
};
