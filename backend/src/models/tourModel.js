import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  activities: { type: String },
  accommodation: { type: String,  },
  meals: { type: String},
  distance: { type: String },
  hours: { type: String },
  images: [{ type: String }]
});

const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String }
});

const tourSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true // This allows MongoDB to automatically generate it
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Trekking",
      "Expedition",
      "Mountain Biking",
      "Cultural Tours",
      "Safari",
      "Hunting",
    ]
  },
  location: {
    type: String,
    // required: true
  },
  days: {
    type: Number,
    required: true,
    min: 1
  },
  groupSize: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'moderate', 'challenging']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  bestSeason: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  images: [{
    type: String
  }],
  itineraries: [{
    day: Number,
    title: String,
    description: String,
    activities: String,
    accommodation: String,
    meals: String,
    distance: String,
    hours: String,
    images: [String]
  }],
  inclusions: [String],
  exclusions: [String],
  faqs: [{
    question: String,
    answer: String
  }],
  termsAndConditions: [String],
  policies: [String],
  map: {
    latitude: Number,
    longitude: Number
  }
}, {
  timestamps: true
});

export default mongoose.model('Tour', tourSchema); 