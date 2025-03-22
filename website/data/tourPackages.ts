export const tourCategories = [
  { id: "all", name: "All Tours", icon: "globe" },
  { id: "Trekking", name: "Trekking", icon: "hiking" },
  { id: "Expedition", name: "Expedition", icon: "mountain" },
  { id: "Mountain Biking", name: "Mountain Biking", icon: "bike" },
  { id: "Skiing", name: "Skiing", icon: "skiing" },
  { id: "Cultural Tours", name: "Cultural Tours", icon: "landmark" },
  { id: "Safari", name: "Safari", icon: "compass" },
]

export const tourPackages = [
  {
    category: "Trekking",
    tours: [
      {
        id: "k2-base-camp-trek",
        title: "K2 Base Camp Trek",
        location: "Gilgit-Baltistan, Pakistan",
        days: 21,
        groupSize: "6-12 people",
        difficulty: "Challenging",
        price: 3500,
        bestSeason: "June to August",
        description:
          "Experience the adventure of a lifetime with our K2 Base Camp Trek. This challenging 21-day journey takes you through the heart of the Karakoram Range, offering breathtaking views of some of the world's highest peaks. You'll trek through diverse landscapes, from lush valleys to rugged glaciers, and experience the rich culture of the Balti people. The trek culminates at the base of K2, the world's second-highest mountain, where you'll witness its awe-inspiring majesty up close.",
        images: ["/tours/k2-base-camp-1.jpg", "/tours/k2-base-camp-2.jpg", "/tours/k2-base-camp-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet and greet at the airport, transfer to hotel, welcome dinner",
            accommodation: "4-star hotel in Islamabad",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/tours/k2-base-camp-day1.jpg",
          },
          {
            day: 2,
            description: "Fly to Skardu",
            activities: "Take a scenic flight to Skardu, the gateway to the Karakoram Range.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/skardu.jpg",
          },
          // ... more days ...
        ],
        inclusions: [
          "All ground transportation",
          "Experienced English-speaking guide",
          "Porters for carrying equipment",
          "Camping equipment and meals during the trek",
          "Permits and fees",
        ],
        exclusions: [
          "International flights",
          "Personal equipment and clothing",
          "Travel insurance",
          "Tips for guides and porters",
        ],
        faqs: [
          {
            question: "How difficult is the K2 Base Camp Trek?",
            answer:
              "The K2 Base Camp Trek is considered challenging and requires a good level of fitness. Trekkers should be prepared for long days of hiking at high altitudes.",
          },
          {
            question: "What is the best time to do this trek?",
            answer:
              "The best time for the K2 Base Camp Trek is from June to August when the weather is most favorable and the mountain passes are clear of snow.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A non-refundable deposit of 20% is required to secure your booking.",
          "Full payment is due 60 days before the trek start date.",
          "Cancellations made 30-60 days before the start date are subject to a 50% cancellation fee.",
          // ... more terms and conditions
        ],
        policies: [
          "All participants must have valid travel insurance that covers trekking at high altitudes.",
          "The company reserves the right to alter the itinerary due to weather conditions or unforeseen circumstances.",
          // ... more policies
        ],
        map: {
          latitude: 35.8825,
          longitude: 76.5136,
        },
      },
      {
        id: "fairy-meadows-trek",
        title: "Fairy Meadows Trek",
        description:
          "Discover the enchanting beauty of Fairy Meadows, a lush alpine meadow offering spectacular views of Nanga Parbat, the world's ninth-highest mountain.",
        location: "Gilgit-Baltistan, Pakistan",
        days: 7,
        difficulty: "Moderate",
        groupSize: "2-15 People",
        price: 899,
        bestSeason: "June to September",
        images: ["/images/fairy-meadows-1.jpg", "/images/fairy-meadows-2.jpg", "/images/fairy-meadows-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Drive to Raikot Bridge",
            activities: "Drive along the Karakoram Highway to Raikot Bridge, the starting point for Fairy Meadows.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "460 km",
            hours: "8-9 hours",
            image: "/images/karakoram-highway.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Fairy Meadows Trek?",
            answer: "The Fairy Meadows Trek is rated as moderate. Most people with reasonable fitness can complete it.",
          },
          {
            question: "What is the best time to visit Fairy Meadows?",
            answer:
              "The best time to visit Fairy Meadows is from June to September when the weather is most favorable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 20% deposit is required to secure your booking.",
          "Full payment is due 30 days before the trip start date.",
          "Cancellations made more than 30 days before departure receive an 80% refund.",
          // ... more terms ...
        ],
        policies: [
          "Travel insurance is strongly recommended for all participants.",
          "The tour operator reserves the right to alter the itinerary due to weather or unforeseen circumstances.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Accommodation (hotels and camping)",
          "Meals as per itinerary",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal expenses",
          "Tips for guides and drivers",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.387,
          longitude: 74.58,
        },
      },
      {
        id: "nanga-parbat-base-camp-trek",
        title: "Nanga Parbat Base Camp Trek",
        description: "Trek to the base of the Killer Mountain, Nanga Parbat.",
        location: "Gilgit-Baltistan, Pakistan",
        days: 14,
        difficulty: "Challenging",
        groupSize: "2-10 People",
        price: 1899,
        bestSeason: "June to August",
        images: ["/images/nanga-parbat-1.jpg", "/images/nanga-parbat-2.jpg", "/images/nanga-parbat-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Skardu",
            activities: "Take a scenic flight to Skardu, the gateway to the Karakoram Range.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/skardu.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Nanga Parbat Base Camp Trek?",
            answer:
              "The Nanga Parbat Base Camp Trek is considered challenging. Trekkers should have previous high-altitude trekking experience and be in excellent physical condition.",
          },
          {
            question: "What is the best time to do this trek?",
            answer:
              "The best time for the Nanga Parbat Base Camp Trek is from June to August when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Skardu-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
    ],
  },
  {
    category: "expedition",
    tours: [
      {
        id: "broad-peak-expedition",
        title: "Broad Peak Expedition",
        description:
          "Challenge yourself with an expedition to Broad Peak (8,051m), the world's 12th highest mountain. This expedition is designed for experienced climbers looking to summit an 8000er.",
        location: "Karakoram Range, Pakistan",
        days: 45,
        difficulty: "Extreme",
        groupSize: "4-8 People",
        price: 12999,
        bestSeason: "June to August",
        images: ["/images/broad-peak-1.jpg", "/images/broad-peak-2.jpg", "/images/broad-peak-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your expedition leader and transfer to your hotel.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Preparation and Briefing",
            activities: "Equipment check, expedition briefing, and permit formalities in Islamabad.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/expedition-briefing.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "What experience is required for Broad Peak?",
            answer:
              "Climbers should have previous experience on mountains of 6000-7000m, be comfortable with fixed rope techniques, and have experience with crampons, ice axe, and high-altitude camping.",
          },
          {
            question: "What is the success rate for Broad Peak?",
            answer:
              "The success rate varies each year depending on conditions, but typically ranges from 20-40%. Our focus is on safety first, with summit success as a secondary goal.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Additional 40% payment is due 120 days before the expedition.",
          "Final 30% payment is due 60 days before the expedition.",
          // ... more terms ...
        ],
        policies: [
          "All participants MUST have comprehensive mountaineering insurance that covers climbing up to 8000m, emergency evacuation, and repatriation.",
          "Participants must provide a medical certificate confirming fitness for high-altitude mountaineering.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Skardu-Islamabad)",
          "Accommodation (hotels in cities, camping during expedition)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal climbing equipment",
          "Satellite phone usage",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.8107,
          longitude: 76.5651,
        },
      },
      {
        id: "gasherbrum-ii-expedition",
        title: "Gasherbrum II Expedition",
        description: "Climb the 13th highest mountain in the world, Gasherbrum II.",
        location: "Karakoram Range, Pakistan",
        days: 50,
        difficulty: "Extreme",
        groupSize: "4-8 People",
        price: 13999,
        bestSeason: "June to August",
        images: ["/images/gasherbrum-ii-1.jpg", "/images/gasherbrum-ii-2.jpg", "/images/gasherbrum-ii-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your expedition leader and transfer to your hotel.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Preparation and Briefing",
            activities: "Equipment check, expedition briefing, and permit formalities in Islamabad.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/expedition-briefing.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "What experience is required for Gasherbrum II?",
            answer:
              "Climbers should have previous experience on mountains of 6000-7000m, be comfortable with fixed rope techniques, and have experience with crampons, ice axe, and high-altitude camping.",
          },
          {
            question: "What is the success rate for Gasherbrum II?",
            answer:
              "The success rate varies each year depending on conditions, but typically ranges from 20-40%. Our focus is on safety first, with summit success as a secondary goal.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Additional 40% payment is due 120 days before the expedition.",
          "Final 30% payment is due 60 days before the expedition.",
          // ... more terms ...
        ],
        policies: [
          "All participants MUST have comprehensive mountaineering insurance that covers climbing up to 8000m, emergency evacuation, and repatriation.",
          "Participants must provide a medical certificate confirming fitness for high-altitude mountaineering.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Skardu-Islamabad)",
          "Accommodation (hotels in cities, camping during expedition)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal climbing equipment",
          "Satellite phone usage",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.8107,
          longitude: 76.5651,
        },
      },
    ],
  },
  {
    category: "mountain-biking",
    tours: [
      {
        id: "karakoram-highway-bike-tour",
        title: "Karakoram Highway Bike Tour",
        description: "Cycle along the legendary Karakoram Highway.",
        location: "Gilgit-Baltistan, Pakistan",
        days: 14,
        difficulty: "Challenging",
        groupSize: "4-12 People",
        price: 2199,
        bestSeason: "June to August",
        images: [
          "/images/karakoram-highway-1.jpg",
          "/images/karakoram-highway-2.jpg",
          "/images/karakoram-highway-3.jpg",
        ],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Drive to Chilas",
            activities: "Drive along the Karakoram Highway to Chilas.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "460 km",
            hours: "8-9 hours",
            image: "/images/karakoram-highway.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Karakoram Highway Bike Tour?",
            answer:
              "The Karakoram Highway Bike Tour is considered challenging. Cyclists should have previous experience and be in excellent physical condition.",
          },
          {
            question: "What is the best time to do this tour?",
            answer:
              "The best time for the Karakoram Highway Bike Tour is from June to August when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Accommodation (hotels in cities, camping during trek)",
          "Meals as per itinerary",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
      {
        id: "skardu-valley-bike-adventure",
        title: "Skardu Valley Bike Adventure",
        description: "Explore the beautiful Skardu Valley on two wheels.",
        location: "Baltistan, Pakistan",
        days: 10,
        difficulty: "Moderate",
        groupSize: "4-10 People",
        price: 1699,
        bestSeason: "June to August",
        images: ["/images/skardu-valley-1.jpg", "/images/skardu-valley-2.jpg", "/images/skardu-valley-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Skardu",
            activities: "Take a scenic flight to Skardu, the gateway to the Karakoram Range.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/skardu.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Skardu Valley Bike Adventure?",
            answer:
              "The Skardu Valley Bike Adventure is considered moderate. Cyclists should have previous experience and be in excellent physical condition.",
          },
          {
            question: "What is the best time to do this adventure?",
            answer:
              "The best time for the Skardu Valley Bike Adventure is from June to August when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Skardu-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
    ],
  },
  {
    category: "skiing",
    tours: [
      {
        id: "naltar-valley-ski-tour",
        title: "Naltar Valley Ski Tour",
        description: "Experience skiing in the pristine Naltar Valley.",
        location: "Gilgit-Baltistan, Pakistan",
        days: 7,
        difficulty: "Intermediate",
        groupSize: "4-8 People",
        price: 1499,
        bestSeason: "December to February",
        images: ["/images/naltar-valley-1.jpg", "/images/naltar-valley-2.jpg", "/images/naltar-valley-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Gilgit",
            activities: "Take a scenic flight to Gilgit, the gateway to Naltar Valley.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/gilgit.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Naltar Valley Ski Tour?",
            answer:
              "The Naltar Valley Ski Tour is considered intermediate. Skiers should have previous experience and be in excellent physical condition.",
          },
          {
            question: "What is the best time to do this tour?",
            answer: "The best time for the Naltar Valley Ski Tour is from December to February when the snow is best.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Gilgit-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
      {
        id: "malam-jabba-ski-resort-package",
        title: "Malam Jabba Ski Resort Package",
        description: "Enjoy skiing at Pakistan's premier ski resort, Malam Jabba.",
        location: "Swat Valley, Pakistan",
        days: 5,
        difficulty: "Beginner to Intermediate",
        groupSize: "2-20 People",
        price: 899,
        bestSeason: "December to February",
        images: ["/images/malam-jabba-1.jpg", "/images/malam-jabba-2.jpg", "/images/malam-jabba-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Drive to Malam Jabba",
            activities: "Drive to Malam Jabba Ski Resort.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "8-9 hours",
            image: "/images/malam-jabba.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Malam Jabba Ski Resort Package?",
            answer:
              "The Malam Jabba Ski Resort Package is considered beginner to intermediate. Skiers should have previous experience and be in excellent physical condition.",
          },
          {
            question: "What is the best time to do this package?",
            answer:
              "The best time for the Malam Jabba Ski Resort Package is from December to February when the snow is best.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Accommodation (hotels in cities, camping during trek)",
          "Meals as per itinerary",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
    ],
  },
  {
    category: "cultural-tours",
    tours: [
      {
        id: "hunza-valley-cultural-tour",
        title: "Hunza Valley Cultural Tour",
        description: "Immerse yourself in the rich culture of Hunza Valley.",
        location: "Hunza Valley, Gilgit-Baltistan",
        days: 10,
        difficulty: "Easy",
        groupSize: "2-15 People",
        price: 1299,
        bestSeason: "April to October",
        images: ["/images/hunza-valley-1.jpg", "/images/hunza-valley-2.jpg", "/images/hunza-valley-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Gilgit",
            activities: "Take a scenic flight to Gilgit, the gateway to Hunza Valley.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/gilgit.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Hunza Valley Cultural Tour?",
            answer:
              "The Hunza Valley Cultural Tour is considered easy. Participants should be in reasonable physical condition.",
          },
          {
            question: "What is the best time to do this tour?",
            answer:
              "The best time for the Hunza Valley Cultural Tour is from April to October when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Gilgit-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
      {
        id: "kalash-valley-festival-tour",
        title: "Kalash Valley Festival Tour",
        description: "Experience the unique culture and festivals of the Kalash people.",
        location: "Chitral, Pakistan",
        days: 8,
        difficulty: "Easy",
        groupSize: "2-12 People",
        price: 1499,
        bestSeason: "May, August, December",
        images: ["/images/kalash-valley-1.jpg", "/images/kalash-valley-2.jpg", "/images/kalash-valley-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Chitral",
            activities: "Take a scenic flight to Chitral, the gateway to Kalash Valley.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/chitral.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Kalash Valley Festival Tour?",
            answer:
              "The Kalash Valley Festival Tour is considered easy. Participants should be in reasonable physical condition.",
          },
          {
            question: "What is the best time to do this tour?",
            answer:
              "The best time for the Kalash Valley Festival Tour is during the festivals in May, August, and December.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Chitral-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
      {
        id: "lahore-cultural-heritage-tour",
        title: "Lahore Cultural Heritage Tour",
        description: "Explore the rich history and culture of Lahore, the heart of Punjab.",
        location: "Lahore, Pakistan",
        days: 5,
        difficulty: "Easy",
        groupSize: "2-20 People",
        price: 699,
        bestSeason: "October to March",
        images: ["/images/lahore-1.jpg", "/images/lahore-2.jpg", "/images/lahore-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Lahore",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/lahore.jpg",
          },
          {
            day: 2,
            description: "Lahore Fort and Badshahi Mosque",
            activities: "Explore the historic Lahore Fort and the magnificent Badshahi Mosque.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "8-9 hours",
            image: "/images/lahore-fort.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Lahore Cultural Heritage Tour?",
            answer:
              "The Lahore Cultural Heritage Tour is considered easy. Participants should be in reasonable physical condition.",
          },
          {
            question: "What is the best time to do this tour?",
            answer:
              "The best time for the Lahore Cultural Heritage Tour is from October to March when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Accommodation (hotels in cities, camping during trek)",
          "Meals as per itinerary",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
    ],
  },
  {
    category: "safari",
    tours: [
      {
        id: "deosai-plains-jeep-safari",
        title: "Deosai Plains Jeep Safari",
        description: "Explore the second-highest plateau in the world, Deosai Plains.",
        location: "Gilgit-Baltistan, Pakistan",
        days: 6,
        difficulty: "Moderate",
        groupSize: "4-12 People",
        price: 1199,
        bestSeason: "June to September",
        images: ["/images/deosai-plains-1.jpg", "/images/deosai-plains-2.jpg", "/images/deosai-plains-3.jpg"],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Skardu",
            activities: "Take a scenic flight to Skardu, the gateway to Deosai Plains.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/skardu.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Deosai Plains Jeep Safari?",
            answer:
              "The Deosai Plains Jeep Safari is considered moderate. Participants should be in reasonable physical condition.",
          },
          {
            question: "What is the best time to do this safari?",
            answer:
              "The best time for the Deosai Plains Jeep Safari is from June to September when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Skardu-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
      {
        id: "khunjerab-national-park-wildlife-safari",
        title: "Khunjerab National Park Wildlife Safari",
        description: "Spot rare wildlife in the high-altitude Khunjerab National Park.",
        location: "Gilgit-Baltistan, Pakistan",
        days: 8,
        difficulty: "Moderate",
        groupSize: "4-10 People",
        price: 1599,
        bestSeason: "May to October",
        images: [
          "/images/khunjerab-national-park-1.jpg",
          "/images/khunjerab-national-park-2.jpg",
          "/images/khunjerab-national-park-3.jpg",
        ],
        itineraries: [
          {
            day: 1,
            description: "Arrival in Islamabad",
            activities: "Meet your guide and transfer to your hotel for an overnight stay.",
            accommodation: "Hotel",
            meals: "Dinner",
            distance: "N/A",
            hours: "N/A",
            image: "/images/islamabad.jpg",
          },
          {
            day: 2,
            description: "Fly to Gilgit",
            activities: "Take a scenic flight to Gilgit, the gateway to Khunjerab National Park.",
            accommodation: "Hotel",
            meals: "Breakfast, Lunch, Dinner",
            distance: "N/A",
            hours: "1 hour flight",
            image: "/images/gilgit.jpg",
          },
          // ... more days ...
        ],
        faqs: [
          {
            question: "How difficult is the Khunjerab National Park Wildlife Safari?",
            answer:
              "The Khunjerab National Park Wildlife Safari is considered moderate. Participants should be in reasonable physical condition.",
          },
          {
            question: "What is the best time to do this safari?",
            answer:
              "The best time for the Khunjerab National Park Wildlife Safari is from May to October when the weather is most stable.",
          },
          // ... more FAQs ...
        ],
        termsAndConditions: [
          "A 30% deposit is required to secure your booking.",
          "Full payment is due 60 days before the trip start date.",
          "Cancellations made more than 60 days before departure receive a 70% refund.",
          // ... more terms ...
        ],
        policies: [
          "All participants are required to have comprehensive travel insurance.",
          "Participants must disclose any medical conditions before the trip.",
          // ... more policies ...
        ],
        inclusions: [
          "All ground transportation",
          "Domestic flights (Islamabad-Gilgit-Islamabad)",
          "Accommodation (hotels in cities, camping during trek)",
          // ... more inclusions ...
        ],
        exclusions: [
          "International flights",
          "Personal equipment",
          "Tips for guides and porters",
          // ... more exclusions ...
        ],
        map: {
          latitude: 35.88,
          longitude: 76.5136,
        },
      },
    ],
  },
]

