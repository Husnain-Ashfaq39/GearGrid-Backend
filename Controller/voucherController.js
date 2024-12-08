const Vouchers = require('../models/Vouchers');

// Create a new voucher
const createVoucher = async (req, res) => {
    try {
        const { code, discount } = req.body;
        const newVoucher = new Vouchers({ code, discount });
        await newVoucher.save();
        res.status(201).json(newVoucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a voucher by code
const getVoucherByCode = async (req, res) => {
    try {
        const voucher = await Vouchers.findOne({ code: req.params.code });
        if (!voucher) return res.status(404).json({ message: 'Voucher not found' });
        res.json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all vouchers
const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Vouchers.find();
        res.json(vouchers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a voucher by ID
const deleteVoucher = async (req, res) => {
    try {
        const result = await Vouchers.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Voucher not found' });
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a voucher by ID
const updateVoucher = async (req, res) => {
    try {
        const { code, discount } = req.body;
        const updatedVoucher = await Vouchers.findByIdAndUpdate(
            req.params.id,
            { code, discount },
            { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!updatedVoucher) return res.status(404).json({ message: 'Voucher not found' });
        res.json(updatedVoucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createVoucher, getVoucherByCode, getAllVouchers, deleteVoucher, updateVoucher }; 