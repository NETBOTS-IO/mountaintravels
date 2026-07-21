import axios from "axios";

async function testEmail() {
  try {
    const res = await axios.post("http://localhost:5000/api/contacts/add", {
      name: "Test User",
      email: "cyedcaqlain1@gmail.com",
      subject: "Test Subject",
      message: "This is a test message to verify the email credentials.",
      phone: "1234567890",
      source: "TEST SCRIPT",
    });
    console.log("Response:", res.data);
  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

testEmail();
