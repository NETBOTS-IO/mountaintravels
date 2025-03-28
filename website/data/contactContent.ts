export const contactInfo = {
  title: "Contact Us",
  subtitle: "We're here to help you plan your perfect adventure in Pakistan",
  address: {
    street:  `Ghangchan House, Aliabad
              Satellite Town, Skardu City, Gilgit-Baltistan, `,
    city:     "Gilgit-Baltistan",
    country:  "Pakistan",
    mapLink:  "https://maps.google.com",
  },
  phone: "+92 346 8486900",
  email: "info@mountaintravels.com",
  hours: "Monday to Saturday: 9am - 5pm (GMT+5)",
}

export const contactFormFields = [
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "phone", label: "Phone Number", type: "tel", required: false },
  {
    id: "interest",
    label: "I'm interested in",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Select your interest" },
      { value: "trekking", label: "Trekking" },
      { value: "expedition", label: "Expedition" },
      { value: "mountain-biking", label: "Mountain Biking" },
      { value: "skiing", label: "Skiing" },
      { value: "cultural-tours", label: "Cultural Tours" },
      { value: "custom-tour", label: "Custom Tour" },
    ],
  },
  { id: "message", label: "Your Message", type: "textarea", required: true },
]

export const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "Is Pakistan safe for tourists?",
        answer:
          "Yes, Pakistan's northern areas are generally safe for tourists. The region has seen a significant improvement in security over the past few years, and thousands of tourists visit annually without incident. We prioritize safety in all our tours and keep up-to-date with local conditions.",
      },
      {
        question: "Do I need a visa to visit Pakistan?",
        answer:
          "Yes, most nationalities require a visa to visit Pakistan. Many countries are now eligible for e-Visa, which has simplified the process considerably. We provide visa support letters for our clients to facilitate the application process.",
      },
      {
        question: "What is the best time to visit Pakistan?",
        answer:
          "The best time depends on your destination and activities. For most mountain areas, May to October offers the best conditions. Summer (June-August) is ideal for high-altitude treks, while spring and autumn offer pleasant temperatures and beautiful landscapes at lower elevations.",
      },
    ],
  },
  {
    category: "Tours & Trekking",
    questions: [
      {
        question: "How physically fit do I need to be for trekking in Pakistan?",
        answer:
          "The required fitness level depends on the specific trek. For easier treks like Fairy Meadows, moderate fitness is sufficient. For challenging treks like K2 Base Camp, you should be able to walk 6-8 hours daily with a light pack for multiple consecutive days. We rate all our tours by difficulty to help you choose appropriately.",
      },
      {
        question: "What kind of accommodation can I expect during treks?",
        answer:
          "Accommodation varies by trek. In cities and towns, we use comfortable hotels. During treks, we typically camp in quality tents. Some popular areas like Fairy Meadows offer basic lodges or cabins. Our tour descriptions provide specific accommodation details.",
      },
      {
        question: "Do your guides speak English?",
        answer:
          "Yes, all our guides speak English and are experienced in working with international clients. Many also speak additional languages such as Chinese, German, or French.",
      },
    ],
  },
  {
    category: "Booking & Payment",
    questions: [
      {
        question: "How far in advance should I book my tour?",
        answer:
          "We recommend booking at least 3-6 months in advance, especially for peak season (June-August). For custom tours or large groups, earlier booking is advisable. Some popular expeditions fill up quickly and may require booking up to a year in advance.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, credit cards (Visa/Mastercard), and PayPal. For international clients, we typically require a deposit to secure the booking, with the balance due before the tour starts.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Our standard cancellation policy provides a 70% refund for cancellations made more than 60 days before departure, 50% for 30-60 days, and no refund for less than 30 days. However, policies vary by tour type, especially for expeditions. Please refer to the specific tour's terms and conditions for details.",
      },
    ],
  },
]

export const officeLocations = [
  {
    city: "Islamabad",
    address: "House 32, Street 177, G-13/3, Islamabad, Pakistan",
    phone: "+92 346 8486900",
    email: ["ghulam_mtp@hotmail.com", "info@mountaintravels.com"],
    website: "http://www.mountaintravels.com",
    coordinates: { lat: 33.6844, lng: 73.0479 },
    mainOffice: false,
  },
  {
    city: "Skardu",
    address: "Ghangchan House, Aliabad Satellite Town, Skardu, Baltistan, Gilgit-Baltistan, Pakistan",
    phone: ["+92 5831 52750", "+92 5831 58025"],
    whatsapp: "+92 346 8486900",
    email: ["ghulam_mtp@hotmail.com", "info@mountaintravels.com"],
    website: "http://www.mountaintravels.com",
    coordinates: { lat: 35.3354, lng: 75.5519 },
    mainOffice: true,
  },
  {
    city: "Seattle, USA",
    address: "412 S 325th Pl Apt S3, Federal Way, Washington 98003, USA",
    phone: "+1 (206) 335-4272",
    email: ["ghulam_mtp@hotmail.com", "info@mountaintravels.com"],
    website: "http://www.mountaintravels.com",
    coordinates: { lat: 47.3223, lng: -122.3126 },
    mainOffice: false,
  },
];


