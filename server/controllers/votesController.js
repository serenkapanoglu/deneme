const Votes = require('../models/votes.js')
const Voiting = require('../models/voiting.js')
const User = require('../models/User')
const asyncHandler = require('express-async-handler');
const { use } = require('../routes/userRoutes.js');

const getAllVotes = asyncHandler(async (req, res) => {
    try {
        const votes = await Votes.find();

        if (!votes?.length) {
            return res.status(400).json({ message: 'No voiting found' });
        }

        res.json(votes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching voiting' });
    }
});


const getVotesById = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming id is passed in the request parameters

    try {
        const votes = await Votes.findById(id);

        if (!votes.length) {
            return res.status(400).json({ message: 'No votes found' });
        }

        res.json(votes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching votes' });
    }
});


const getUserVotesById = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming id is passed in the request parameters

    try {
        const votes = await Votes.find({ user_id: id });

        if (!votes.length) {
            return res.status(400).json({ message: 'No votes found' });
        }

        res.json(votes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching votes' });
    }
});

const createVotes = asyncHandler(async (req, res) => {/// This is to actually vote on a vote that is already created.
    try {
        const { user_id, voiting_id, star, option } = req.body;

        if (!user_id || !voiting_id || !star || !option) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const voteObject = { user_id, voiting_id, star, option };
        const voiting = await Voiting.findById(voiting_id);
        if (!voiting) {
            return res.status(404).json({ message: 'Voiting not found' });
        }
        if (option === voiting.option1) {
            const total = voiting.ratingsOption1 + star
            voiting.ratingsOption1 = parseInt(total);
        } else if (option === voiting.option2) {
            const total = voiting.ratingsOption2 + star
            voiting.ratingsOption2 = parseInt(total);
        }
        await voiting.save();
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ message: 'Voiting not found' });
        }
        const starupdate = user.stars - star
        user.stars = starupdate
        const userUpdate = await user.save();
        const votes = await Votes.create(voteObject);
        res.status(201).json({
            message: votes,
            stars: userUpdate.stars
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating voiting' });
    }
});

const deleteVotes = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Votes ID is required' });
    }

    try {
        const deletedVote = await Votes.findByIdAndRemove(id);
        if (!deletedVote) {
            return res.status(404).json({ message: 'Votes not found' });
        }

        res.json({ message: 'Votes deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting Votes' });
    }
});

module.exports = {
    getAllVotes,
    createVotes,
    deleteVotes,
    getVotesById
}

