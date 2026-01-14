import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // Required for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendCustomTourEmail = async (data) => {
  const {
    customer,
    country,
    days,
    groupSize,
    travelPreferences,
    shortDescription,
    createdAt,
  } = data;

  // OPTIONAL: verify connection
  await transporter.verify();

  const formatField = (val) => (val && val !== "" ? val : "-");

  await transporter.sendMail({
    from: `"NetBots Tours" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL, // can also add customer.email if you want confirmation
    subject: "🧭 New Custom Tour Request Received",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2 style="color:#0f172a">New Custom Tour Request</h2>

        <h3>👤 Customer Information</h3>
        <p><strong>Name:</strong> ${formatField(customer.fullName)}</p>
        <p><strong>Email:</strong> ${formatField(customer.email)}</p>
        <p><strong>Phone:</strong> ${formatField(customer.phone)}</p>
        <p><strong>WhatsApp:</strong> ${formatField(customer.whatsapp)}</p>
        <p><strong>Nationality:</strong> ${formatField(customer.nationality)}</p>
        <p><strong>Preferred Contact Method:</strong> ${formatField(customer.contactMethod)}</p>

        <hr/>

        <h3>🌍 Trip Details</h3>
        <p><strong>Destination:</strong> ${formatField(country)}</p>
        <p><strong>Number of Days:</strong> ${formatField(days)}</p>
        <p><strong>Group Size:</strong> ${formatField(groupSize)}</p>

        <hr/>

        <h3>🧳 Travel Preferences</h3>
        <p><strong>Preferred Start Month:</strong> ${formatField(travelPreferences?.startMonth)}</p>
        <p><strong>Budget Range (USD):</strong> ${formatField(travelPreferences?.budget)}</p>
        <p><strong>Details About Tour:</strong></p>
        <p>${formatField(travelPreferences?.detailsAboutTour)}</p>

        <hr/>

        <h3>📝 Additional Notes / Short Description</h3>
        <p>${formatField(shortDescription)}</p>

        <hr/>

        <p style="font-size:12px;color:#64748b">
          Source: Custom Tour Form<br/>
          Submitted At: ${createdAt ? new Date(createdAt).toLocaleString() : "-"}<br/>
          This email was generated automatically.
        </p>
      </div>
    `,
  });
};
