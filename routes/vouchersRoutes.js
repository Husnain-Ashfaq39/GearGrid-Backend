const express = require('express');
const { createVoucher, getVoucherByCode, getAllVouchers, deleteVoucher, updateVoucher } = require('../Controller/voucherController');

const router = express.Router();

// Route to create a new voucher
router.post('/', createVoucher);

// Route to get a discount by voucher code
router.get('/:code', getVoucherByCode);

// Route to get all vouchers
router.get('/', getAllVouchers);

// Route to delete a voucher by ID
router.delete('/:id', deleteVoucher);

// Route to update a voucher by ID
router.put('/:id', updateVoucher);

module.exports = router; 
