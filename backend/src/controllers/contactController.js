import Contact from "../models/contactModel.js";
import { sendContactEmail } from "../utils/email.js";

// CREATE contact
export const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message, phone, interests, source } = req.body;

    // 1. Send email first
    await sendContactEmail({
      name,
      email,
      subject,
      message,
      phone,
      interests,
      source,
      timestamp: Date.now(),
    });

    // 2. Only save if email succeeded
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
      phone,
      interests,
      source,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      data: newContact,
    });
  } catch (err) {
    console.error("Error creating contact:", err);
    next(err);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};