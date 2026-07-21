import mongoose from "mongoose";

const realTestimonials = [
  {
    name: "Michel Troillet",
    designation: "Team Leader, July 1990 Swiss Expedition",
    feedback:
      "The complete success of our expedition has to be credited to the overall quality of the preparation done by Mountain Travels Pakistan.",
  },
  {
    name: "Katsutoshi Kanai",
    designation: "Director, Gyosei Corporation, Japan - December 3rd, 1990",
    feedback:
      "Without the kind assistance of Mountain Travels Pakistan, Mr. Hiroki Fujita (renowned Japanese photographer), could not have accomplished his work in the high-altitude mountains of Pakistan.",
  },
  {
    name: "Dan Mozena",
    designation: "Political Attache, American Embassy, Islamabad - July 1996",
    feedback:
      "Ghulam brings energy and excitement to any outdoor adventure...his enthusiasm is infectious, keeping his fellow travelers in high spirits.",
  },
  {
    name: "Evan Brigham",
    designation: "Trek Coordinator, (ISI) - September 1998",
    feedback:
      "Taking a group of junior and senior high school students into the Northern Areas of Pakistan is a challenge, to say the least! With Ghulam and his friendly and efficient team at Mountain Travels Pakistan in charge though, I’m always 100% confident. We are very glad we switched to booking our semi-annual treks with them a couple of years back – they really provide the best!",
  },
  {
    name: "Reinhold Messner",
    designation: "The world’s eminent mountaineer – October 30th, 1997",
    feedback:
      "On my recent spring 2000 expedition, I was happy to work with Mountain Travels Pakistan. The quality of the service and knowledge of the guides was excellent. Rozi Ali, one of the guides from Mountain Travels, is an old friend of mine – serving as cook and guide on many of my expeditions. I wish him and Mountain Travels Pakistan all the best for the future.",
  },
  {
    name: "Peter Laurenson",
    designation: "New Zealand Tourist Board – July 1998",
    feedback:
      "Ghulam and his team of highly-experienced guides and support staff stand apart from all the other operators that I’ve used on account of their unswerving drive to satisfy their customers, whilst having a lot of fun on the way...having spent 28 days on the trail with them on two separate occasions, I, without hesitation, recommend them to anyone.",
  },
  {
    name: "Ryo Higashino & Ide Ikutaro",
    designation: "NHK, Japan Corporation, Tokyo, Japan – September 28th, 2000",
    feedback:
      "(We) visited Northern Pakistan for filming an educational documentary on the natural beauty and people of Baltistan in 2000 (and)… appreciate the efforts of all the highly professional team members organized by Mountain Travels Pakistan whose confidence and dedication made it possible for us to capture some of the breathtaking and rare mountain scenery...The credit for this successful venture goes to our Liaison Officer Mr. Hamid Hussain from Mountain Travels whose knowledge about the area and perfect Japanese made our trip easier. We are personally thankful and highly recommend the services of Mountain Travels Pakistan and Hamid Hussain who always encouraged us and the spirit paved the way to accomplish our mission.",
  },
  {
    name: "Hester Noyon",
    designation: "Amsterdam, The Netherland – July 28th, 2004",
    feedback:
      "Mountain Travels Pakistan surprised us with a very well organized trek to Baltoro and Gondogoro La. You really have found the perfect combination between professionalism and local insight and culture. That’s the secret of your success! Friendly, compassionate!",
  },
  {
    name: "Marten Van Asseldunk",
    designation: "Ueghel, Holland – September, 2004",
    feedback:
      "I thank Hamid and his brothers (Ghulam Ahmad & Farman Baltistani) for the excellent preparation and trek which they organized for me and my three teenage daughters. It was a wonderful experience which we will never forget.",
  },
  {
    name: "Kamila Jeevanjee",
    designation: "Los Angeles, CA, USA – July, 2003",
    feedback:
      "What a wonderful trek- the care and attention of Hamid and all the porters made a very tough trip extremely pleasant, safe, and not so intimidating (especially the crossing of the Gondogoro La). The whole team is exceptionally wonderful and caring of every possible detail. The music in the evenings and the great food were an added bonus… Thank you so much Mountain Travels Pakistan.",
  },
  {
    name: "Georg Heel",
    designation: "Tyrol, Austria – August, 2001",
    feedback:
      "With an excellent crew, beginning with our guide Ibrahim, the cook Ali who cooked in this area like in a gourmet restaurant, and also special Mr. Mahdi, who watched over us day and night, it was an unforgettable experience. The specialty of the region, the loveliness of our porters…will stay in our minds. Thank you very much.",
  },
  {
    name: "Peter Klocknu and Alte Franklurter",
    designation: "Hachenburg, Germany – June, 2001",
    feedback:
      "The trek to Concordia, Gondogoro La and Fairy Meadows was really great and perfectly organized by Mountain Travels Pakistan. We were deeply impressed not only by the spectacular scenery but also by the hospitality and helpfulness of the whole staff. MTP gave us the feeling to be at home in a foreign country.",
  },
  {
    name: "Corrado Marino",
    designation: "Pavia, Italy – 2001 to 2008",
    feedback:
      "We have visited many times and Mr. Ghulam was not only a guide but had become a real friend and we hope to come again many times with him.",
  },
  {
    name: "Galen Murton",
    designation: "Maine, USA – 2004",
    feedback:
      "Thank you very much to Ghulam Ahmed and everyone at Mountain Travels Pakistan for your excellent and professional services in arranging our trip to Concordia and the Baltoro, Biafo, and Hispar glaciers. Our guide, Mohammad Ali Raza, was fantastic and the crew he found for us was first class. I’d also like to acknowledge our tremendous appreciation of your accommodating our plans and itinerary while working on a limited budget. We will never forget this assistance and look forward to working with MTP again in the future.",
  },
  {
    name: "Erih Hegrelberg",
    designation: "Amsterdam, The Netherlands – 2004",
    feedback:
      "Our Baltoro/ Gondogoro La trek was super-organized and in a mountainous spirit flavoured with Balti flowers and apricots.",
  },
  {
    name: "Rogier Noyan",
    designation: "Amsterdam, The Netherlands – 2004",
    feedback:
      "As a small organization Mountain Travels Pakistan understands both the mountains, the porters, the cook, etc., and the needs and wishes of us, the clients. Excellent. Hope to come and meet you again.",
  },
  {
    name: "Abbey (US) & Edoardo (Italian)",
    designation: "Eldertreks’ Silk Road – June, 2006",
    feedback:
      "Our Pakistan adventure has been more exciting than we had even expected…, the glorious scenery and the positive encounters with the locals…. Your country is wonderful…. We thank you, however, for everything else, and particularly for the kindness you have shown us personally…",
  },
  {
    name: "Ailen Farr (US)",
    designation: "Eldertreks’ Silk Road – May, 2006",
    feedback:
      "Words cannot express how I feel about Pakistan. The grandeur of the mountains, the lush valleys…",
  },
  {
    name: "Eldertreks Guest",
    designation: "Eldertreks’ Silk Road, 2006",
    feedback:
      "Your sense of humour and knowledge went a long way to making the journey and stay as enjoyable as it has been…",
  },
];

async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mtp");
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;
    const collection = db.collection("testimonials");

    const count = await collection.countDocuments();
    if (count > 0) {
      console.log("Clearing previous short/dummy testimonials from DB...");
      await collection.deleteMany({});
    }

    const docsToInsert = realTestimonials.map((t) => ({
      name: t.name,
      designation: t.designation,
      feedback: t.feedback,
      location: "Pakistan",
      rating: 5,
      verified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await collection.insertMany(docsToInsert);
    console.log(
      `Successfully inserted ${result.insertedCount} FULL testimonials from the documents.`,
    );

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
