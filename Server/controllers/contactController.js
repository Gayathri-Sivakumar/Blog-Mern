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

module.exports = {
  createContactMessage,
};
