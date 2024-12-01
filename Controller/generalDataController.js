const GeneralData = require('../models/GeneralData');

// Update General Data
exports.updateGeneralData = async (req, res) => {
    try {
        const updates = req.body; // Get the updates from the request body
        const generalData = await GeneralData.findOne(); // Assuming there's only one document for general data

        if (!generalData) {
            return res.status(404).json({ message: 'General data not found' });
        }

        // Update only the fields that are present in the request body
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                generalData[key] = updates[key];
            }
        });

        await generalData.save(); // Save the updated document
        res.status(200).json(generalData); // Return the updated document
    } catch (error) {
        console.error("Error updating general data:", error);
        res.status(500).json({ error: 'Server error while updating general data' });
    }
};

// Get General Data
exports.getGeneralData = async (req, res) => {
    try {
        const generalData = await GeneralData.findOne(); // Assuming there's only one document for general data

        if (!generalData) {
            return res.status(404).json({ message: 'General data not found' });
        }

        res.status(200).json(generalData); // Return the general data
    } catch (error) {
        console.error("Error fetching general data:", error);
        res.status(500).json({ error: 'Server error while fetching general data' });
    }
};
