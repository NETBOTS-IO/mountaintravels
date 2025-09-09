import { sendContactEmail } from '../utils/email.js';

export const createContact = async (req, res, next) => {
  try {
    const { name, email, subject = '', message } = req.body;

    await sendContactEmail({
      name,
      email,
      subject,
      message,
      timestamp: Date.now(),
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
    });
  } catch (err) {
    next(err);
  }
}; 