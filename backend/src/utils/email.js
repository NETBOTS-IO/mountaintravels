import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Check if required environment variables are set
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'ADMIN_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Warning: Missing email environment variables: ${missingEnvVars.join(', ')}`);
  console.warn('📧 Email functionality will be disabled. Set these variables to enable emails.');
}

// Create transporter only if required variables are present
let transporter = null;
if (missingEnvVars.length === 0) {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('✅ Email transporter configured successfully');
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    transporter = null;
  }
}

/**
 * Wrap HTML body with email template
 */
const wrapEmail = (body) => `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
    <div style="background: #1e293b; padding: 10px; display: flex; justify-content: center; align-items: center;">
    <div style="display: flex; align-items: center; padding: 5px;">
    <span style="font-size: 20px; font-weight: bold; color: orange;">
     From MountainTravels
    </span>
  </div>    </div>
    <div style="padding: 20px; color: #1e293b; font-size: 16px; line-height: 1.6;">
      ${body}
    </div>
    <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
      This is an automated message. Please do not reply.
    </div>
  </div>
`;

/**
 * Generic sendEmail function
 */
export const sendEmail = async ({ from, to, subject, html, replyTo }) => {
  if (!transporter) {
    console.warn('📧 Email not sent: SMTP not configured');
    return { messageId: 'mock-message-id', to };
  }

  try {
    const mailOptions = {
      from,
      to,
      subject,
      html,
      replyTo,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.messageId} -> ${to}`);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};

/**
 * Send booking confirmation emails (to user + admin)
 */
export const sendBookingEmails = async ({ booking, user, trip, departure }) => {
  try {
    const tripName = trip?.name || 'Unknown Trip';
    const departureDate = departure?.date ? new Date(departure.date).toLocaleDateString() : 'TBD';
    const totalPrice = booking.totalPrice || 0;
    const travelers = booking.travelers || 0;

    const userBody = `
      <h2>Booking Confirmation</h2>
      <p>Dear ${user.firstName},</p>
      <p>Thank you for booking with us. Here are your booking details:</p>
      <ul>
        <li><strong>Tour:</strong> ${tripName}</li>
        <li><strong>Departure Date:</strong> ${departureDate}</li>
        <li><strong>Travelers:</strong> ${travelers}</li>
        <li><strong>Total Price:</strong> $${totalPrice}</li>
        <li><strong>Booking Number:</strong> ${booking.bookingNumber}</li>
      </ul>
      <p>We look forward to your tour!</p>
    `;

    const adminBody = `
      <h2>New Booking Received</h2>
      <p>A new booking has been made:</p>
      <ul>
        <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
        <li><strong>Email:</strong> ${user.email}</li>
        <li><strong>Tour:</strong> ${tripName}</li>
        <li><strong>Departure Date:</strong> ${departureDate}</li>
        <li><strong>Travelers:</strong> ${travelers}</li>
        <li><strong>Total Price:</strong> $${totalPrice}</li>
        <li><strong>Booking Number:</strong> ${booking.bookingNumber}</li>
      </ul>
    `;

    // Send user confirmation
    await sendEmail({
      from: `"MountainTravels" <${process.env.SMTP_USER || 'noreply@mountaintravels.com'}>`,
      to: user.email,
      subject: "Booking Confirmation",
      html: wrapEmail(userBody),
    });

    // Send admin notification
    await sendEmail({
      from: `"MountainTravels" <${process.env.SMTP_USER || 'noreply@mountaintravels.com'}>`,
      to: process.env.ADMIN_EMAIL || 'admin@mountaintravels.com',
      subject: "New Booking Received",
      html: wrapEmail(adminBody),
    });
  } catch (error) {
    console.error("❌ Error sending booking emails:", error.message);
    // Don't throw error to prevent booking creation from failing
  }
};

/**
 * Send booking confirmation email when status is updated to CONFIRMED
 */
export const sendBookingConfirmationEmail = async ({ booking, user, trip, departure }) => {
  try {
    const tripName = trip?.name || 'Unknown Trip';
    const departureDate = departure?.date ? new Date(departure.date).toLocaleDateString() : 'TBD';
    const totalPrice = booking.totalPrice || 0;
    const travelers = booking.travelers || 0;

    const userBody = `
      <h2>Booking Confirmed!</h2>
      <p>Dear ${user.firstName},</p>
      <p>Great news! Your booking has been confirmed. Here are your confirmed booking details:</p>
      <ul>
        <li><strong>Trip:</strong> ${tripName}</li>
        <li><strong>Departure Date:</strong> ${departureDate}</li>
        <li><strong>Travelers:</strong> ${travelers}</li>
        <li><strong>Total Price:</strong> $${totalPrice}</li>
        <li><strong>Booking Number:</strong> ${booking.bookingNumber}</li>
        <li><strong>Status:</strong> CONFIRMED</li>
      </ul>
      <p>Your tour is now confirmed and we're excited to have you join us!</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
    `;

    const adminBody = `
      <h2>Booking Status Updated</h2>
      <p>A booking status has been updated to CONFIRMED:</p>
      <ul>
        <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
        <li><strong>Email:</strong> ${user.email}</li>
        <li><strong>Tour:</strong> ${tripName}</li>
        <li><strong>Departure Date:</strong> ${departureDate}</li>
        <li><strong>Travelers:</strong> ${travelers}</li>
        <li><strong>Total Price:</strong> $${totalPrice}</li>
        <li><strong>Booking Number:</strong> ${booking.bookingNumber}</li>
        <li><strong>Status:</strong> CONFIRMED</li>
      </ul>
    `;

    // Send user confirmation
    await sendEmail({
      from: `"MountainTravels" <${process.env.SMTP_USER || 'noreply@mountaintravels.com'}>`,
      to: user.email,
      subject: "Booking Confirmed - MountainTravels",
      html: wrapEmail(userBody),
    });

    // Send admin notification
    await sendEmail({
      from: `"MountainTravels" <${process.env.SMTP_USER || 'noreply@mountaintravels.com'}>`,
      to: process.env.ADMIN_EMAIL || 'admin@mountaintravels.com',
      subject: "Booking Status Updated - CONFIRMED",
      html: wrapEmail(adminBody),
    });
  } catch (error) {
    console.error("❌ Error sending booking confirmation email:", error.message);
    // Don't throw error to prevent booking update from failing
  }
};

/**
 * Send contact form emails (to admin + user)
 */
export const sendContactEmail = async ({
  name,
  email,
  subject = "",
  message,
  timestamp = Date.now(),
}) => {
  try {
    const safe = (v) => String(v || "").replace(/[<>]/g, "");

    const adminBody = `
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${safe(name)} (${safe(email)})</p>
      <p><strong>Subject:</strong> ${safe(subject)}</p>
      <p><strong>Message:</strong><br>${safe(message)}</p>
      <p><small>Received: ${new Date(timestamp).toLocaleString()}</small></p>
    `;

    const userBody = `
      <h2>Thank You for Contacting Us</h2>
      <p>Dear ${safe(name)},</p>
      <p>We have received your message and our team will get back to you soon.</p>
      <p><strong>Your message:</strong><br>${safe(message)}</p>
    `;

    // Send admin email
    await sendEmail({
      from: `"Website Contact" <${process.env.SMTP_USER || 'noreply@mountaintravels.com'}>`,
      to: process.env.ADMIN_EMAIL || 'admin@mountaintravels.com',
      subject: `New Contact Message${subject ? ` - ${safe(subject)}` : ""}`,
      replyTo: email,
      html: wrapEmail(adminBody),
    });

    // Send user confirmation
    await sendEmail({
      from: `"MountainTravels" <${process.env.SMTP_USER || 'noreply@mountaintravels.com'}>`,
      to: email,
      subject: "We received your message",
      html: wrapEmail(userBody),
    });

    console.log(`✅ Contact email processed for ${safe(email)}`);
  } catch (error) {
    console.error("❌ Error sending contact email:", error.message);
    throw error;
  }
};