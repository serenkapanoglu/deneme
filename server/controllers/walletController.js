
const Wallet = require('../models/wallet.js')
const asyncHandler = require('express-async-handler');


const getAllWallet = asyncHandler(async (req, res) => {
    try {
        const wallet = await Wallet.find();

        if (!wallet?.length) {
            return res.status(400).json({ message: 'No wallet found' });
        }

        res.json(wallet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching wallet' });
    }
});
const createWallet = asyncHandler(async (req, res) => {
    try {
        const { userId, currency, amount } = req.body;

        if (!userId || !currency || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const walletObject = { userId, currency, amount };

        const wallet = await Wallet.create(walletObject);
        res.status(201).json({
            message: wallet,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating wallet' });
    }
});

const updateWallet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'Wallet ID is required' });
    }
    try {
        const { userId, currency, amount } = req.body;

        if (!userId || !currency || !amount) {
            return res.status(400).json({ message: 'value are required' });
        }
        const wallet = await Wallet.findById(id);

        if (!wallet) {
            return res.status(404).json({ message: 'wallet not found' });
        }
        wallet.userId = userId
        wallet.currency = currency
        wallet.amount = amount
        const walletupdate = await wallet.save();

        res.json({ message: walletupdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating wallet' });
    }
});



const deleteWallet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'wallet ID is required' });
    }
    try {
        const deletedWallet = await Wallet.findByIdAndRemove(id);
        if (!deletedWallet) {
            return res.status(404).json({ message: 'wallet not found' });
        }
        res.json({ message: 'wallet deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting wallet' });
    }
});
module.exports = {
    getAllWallet,
    createWallet,
    deleteWallet,
    updateWallet
}
