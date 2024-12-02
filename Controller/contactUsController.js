const ContactUs = require('../models/ContactUs');

// Controller for adding contact us data
exports.addContactUs = async (req, res) => {
    try {
        const { name, email, message,read } = req.body;
        const newContact = new ContactUs({ name, email, message,read });
        await newContact.save();
        res.status(201).json({ message: 'Contact Us data added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add contact us data' });
    }
};

// Controller for fetching all contact us data
exports.getAllContactUs = async (req, res) => {
    try {
        const contacts = await ContactUs.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact us data' });
    }
};

// Controller for updating the read field
exports.updateReadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id '+id);
        
        const { read } = req.body;
        
        console.log('read '+read);
        const updatedContact = await ContactUs.findByIdAndUpdate(id, { read }, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update read status' });
    }
};

/* 
To call this PATCH API from frontend using axios:

import axios from 'axios';

// Function to update read status using PATCH
const updateReadStatus = async (contactId, readStatus) => {
  try {
    const response = await axios.patch(
      `http://your-api-url/contactus/update-read/${contactId}`,
      { read: readStatus },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // Returns the updated contact
  } catch (error) {
    console.error('Error updating read status:', error);
    throw error;
  }
};

// Example usage:
// updateReadStatus('contact-id-here', true)
//   .then(updatedContact => console.log('Updated:', updatedContact))
//   .catch(error => console.error('Error:', error));
*/