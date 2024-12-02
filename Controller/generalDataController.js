const GeneralData = require('../models/GeneralData');

// Update General Data
exports.updateGeneralData = async (req, res) => {
    try {
        const updates = req.body; // Get the updates from the request body

        // Try to find the existing general data document
        let generalData = await GeneralData.findOne(); 

        // If no document is found, create the general data with default values
        if (!generalData) {
            const dummyData = {
                logo: "",
                facebook: "https://www.facebook.com",
                twitter: "https://www.twitter.com",
                instagram: "https://www.instagram.com",
                linkedin: "https://www.linkedin.com",
                terms: "<p>Default Terms and Conditions.</p>",
            };

            // Create and save the new document with dummy data
            generalData = new GeneralData(dummyData);
            await generalData.save();
            console.log('dummy data saved');
            
            return res.status(201).json(generalData); // Return the newly created document with dummy data
        }

        // Update only the fields that are present in the request body
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                generalData[key] = updates[key];
            }
        });

        // Save the updated document
        await generalData.save();
        res.status(200).json(generalData); // Return the updated document
    } catch (error) {
        console.error("Error updating general data:", error);
        res.status(500).json({ error: 'Server error while updating general data' });
    }
};


// Get General Data
exports.getGeneralData = async (req, res) => {
    try {
        let generalData = await GeneralData.findOne(); // Assuming there's only one document for general data

        // If no document is found, create the general data with default values
        if (!generalData) {
            const dummyData = {
                logo: "",
                facebook: "https://www.facebook.com",
                twitter: "https://www.twitter.com",
                instagram: "https://www.instagram.com",
                linkedin: "https://www.linkedin.com",
                terms: "<p>Default Terms and Conditions.</p>",
            };

            // Create and save the new document with dummy data
            generalData = new GeneralData(dummyData);
            await generalData.save();
            return res.status(201).json(generalData); // Return the newly created document with dummy data
        }

        // If general data exists, return it
        res.status(200).json(generalData); // Return the general data
    } catch (error) {
        console.error("Error fetching general data:", error);
        res.status(500).json({ error: 'Server error while fetching general data' });
    }
};
