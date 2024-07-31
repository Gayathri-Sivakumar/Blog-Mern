const Contact = require("../models/Contact");

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newContactMessage = new Contact({
      name,
      email,
      subject,
      message,
    });
    await newContactMessage.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};

const getContactMessages = async (req, res) => {
  try {
    // Fetch all contact messages sorted by creation date
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
};
