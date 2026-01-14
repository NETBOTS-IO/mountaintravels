import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send email to client when tour is approved
export const sendCustomTourConfirmationEmail = async (tour) => {
  const { customer, country, days, groupSize, travelPreferences, shortDescription } = tour;

  await transporter.sendMail({
    from: `"NetBots Tours" <${process.env.SMTP_USER}>`,
    to: customer.email,
    subject: "Your Custom Tour is Approved! 🧭",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2 style="color:#0f172a">Your Custom Tour is Approved!</h2>
        <p>Hi ${customer.fullName},</p>
        <p>We are excited to inform you that your custom tour request has been approved! Get ready for an amazing travel experience with us.</p>

        <h3>Trip Details</h3>
        <p><strong>Destination:</strong> ${country}</p>
        <p><strong>Days:</strong> ${days}</p>
        <p><strong>Group Size:</strong> ${groupSize || "-"}</p>

        <h3>Travel Preferences</h3>
        <p><strong>Preferred Start Month:</strong> ${travelPreferences?.startMonth || "-"}</p>
        <p><strong>Budget:</strong> ${travelPreferences?.budget || "-"}</p>
        <p><strong>Details About Tour:</strong> ${travelPreferences?.detailsAboutTour || "-"}</p>

        <p><strong>Additional Notes:</strong> ${shortDescription || "-"}</p>
        <p>We look forward to creating an unforgettable adventure for you!</p>

        <p style="font-size:12px;color:#64748b">This is an automated message from NetBots Tours.</p>
      </div>
    `,
  });
};
