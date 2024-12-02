const Subscriber = require('../models/Subscribers'); // Import the Subscriber model

// Function to add a new subscriber
exports.addSubscriber = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email is already subscribed.' });
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Subscription successful!', subscriber: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
};

// Function to get all subscribers
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
}; 