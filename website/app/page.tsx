"use client";
import { Shield, Headphones,Medal, Leaf } from "lucide-react"
import { motion } from "framer-motion"

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Users,
  Mountain,
  Compass,
  Bike,
  Snowflake,
  Landmark,
  Tent,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  DollarSign,
  Sun,
  Star,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import TourIcons from "@/app/touricons";
import WhyChooseSection from "@/app/whychose";
import ResponsiveCarousel from "@/components/responsivecarousel";
import FeaturedSignatureTours from "@/app/luxary";
// import CustomizedTour from "@/app/customizedtourform";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { heroSection, aboutPreview,whyChoose } from "@/data/homeContent";
import { tourCategories } from "@/data/tourPackages";
import { useMobile } from "@/hooks/use-mobile";
import axios from "axios";
import { getPublicTravelTips,getPopularDestinations,getTrustedCompaniesPublic } from "@/data/utils"; // ✅ import your util

import { BASE_URL } from "@/app/Var";
// Enhanced tour data with more details
const enhancedTours = [
  {
    id: "k2-base-camp-trek",
    title: "K2 Base Camp Trek",
    location: "Gilgit-Baltistan, Pakistan",
    days: 21,
    groupSize: "6-12 people",
    difficulty: "Challenging",
    price: 3500,
    bestSeason: "June to August",
    rating: 4.9,
    reviews: 124,
    featured: true,
    description:
      "Experience the adventure of a lifetime with our K2 Base Camp Trek. This challenging 21-day journey takes you through the heart of the Karakoram Range, offering breathtaking views of some of the world's highest peaks.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "hunza-valley-explorer",
    title: "Hunza Valley Explorer",
    location: "Hunza Valley, Pakistan",
    days: 10,
    groupSize: "4-15 people",
    difficulty: "Moderate",
    price: 1800,
    bestSeason: "April to October",
    rating: 4.8,
    reviews: 98,
    featured: true,
    description:
      "Discover the enchanting beauty of Hunza Valley, known for its stunning landscapes, ancient forts, and friendly locals. Explore terraced fields, visit historic sites, and enjoy panoramic views of snow-capped peaks.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "fairy-meadows-trek",
    title: "Fairy Meadows Trek",
    location: "Gilgit-Baltistan, Pakistan",
    days: 7,
    groupSize: "2-10 people",
    difficulty: "Easy to Moderate",
    price: 1200,
    bestSeason: "May to September",
    rating: 4.7,
    reviews: 156,
    featured: true,
    description:
      "Experience the magical Fairy Meadows, a lush alpine meadow offering spectacular views of Nanga Parbat, the world's ninth-highest mountain. This trek combines natural beauty with comfortable accommodations.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "skardu-cultural-tour",
    title: "Skardu Cultural Tour",
    location: "Skardu, Pakistan",
    days: 8,
    groupSize: "4-12 people",
    difficulty: "Easy",
    price: 1500,
    bestSeason: "June to September",
    rating: 4.6,
    reviews: 87,
    featured: false,
    description:
      "Immerse yourself in the rich culture of Skardu and the Baltistan region. Visit ancient forts, Buddhist rock carvings, and experience traditional Balti hospitality while enjoying stunning mountain landscapes.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "deosai-plains-adventure",
    title: "Deosai Plains Adventure",
    location: "Deosai National Park, Pakistan",
    days: 6,
    groupSize: "4-10 people",
    difficulty: "Moderate",
    price: 1300,
    bestSeason: "July to September",
    rating: 4.8,
    reviews: 72,
    featured: true,
    description:
      "Explore the Deosai Plains, one of the highest plateaus in the world and home to diverse wildlife including the Himalayan brown bear. Camp under star-filled skies and trek through wildflower-covered meadows.",
    image: "/placeholder.svg?height=600&width=800",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Michel Troillet",
    location: "Switzerland",
    image: "/placeholder.svg?height=100&width=100",
    text: "The complete success of our expedition has to be credited to the overall quality of the preparation done by Mountain Travels Pakistan.",
    tour: "Swiss Expedition",
    date: "July 1990",
    rating: 5,
  },
  {
    id: 2,
    name: "Katsutoshi Kanai",
    location: "Japan",
    image: "/placeholder.svg?height=100&width=100",
    text: "Without the kind assistance of Mountain Travels Pakistan, Mr. Hiroki Fujita (renowned Japanese photographer), could not have accomplished his work in the high-altitude mountains of Pakistan.",
    tour: "Photography Expedition",
    date: "December 1990",
    rating: 5,
  },
  {
    id: 3,
    name: "Dan Mozena",
    location: "USA",
    image: "/placeholder.svg?height=100&width=100",
    text: "Ghulam brings energy and excitement to any outdoor adventure... his enthusiasm is infectious, keeping his fellow travellers in high spirits.",
    tour: "Adventure Travel",
    date: "Unknown",
    rating: 5,
  },
  {
    id: 4,
    name: "Evan Brigham",
    location: "Pakistan",
    image: "/placeholder.svg?height=100&width=100",
    text: "Taking a group of junior and senior high school students into the Northern Areas of Pakistan is a challenge, to say the least! With Ghulam and his friendly and efficient team at Mountain Travels Pakistan in charge though, I’m always 100% confident.",
    tour: "School Trek",
    date: "September 1998",
    rating: 5,
  },
  {
    id: 5,
    name: "Reinhold Messner",
    location: "Italy",
    image: "/placeholder.svg?height=100&width=100",
    text: "On my recent spring 2000 expedition to Nanga Parbat, I was happy to work with Mountain Travels Pakistan. The quality of the service and knowledge of the guides was excellent.",
    tour: "Nanga Parbat Expedition",
    date: "October 1997",
    rating: 5,
  },
  {
    id: 6,
    name: "Peter Laurenson",
    location: "New Zealand",
    image: "/placeholder.svg?height=100&width=100",
    text: "Ghulam and his team of highly-experienced guides and support staff stand apart from all the other operators that I’ve used on account of their unswerving drive to satisfy their customers, whilst having a lot of fun on the way.",
    tour: "Adventure Trekking",
    date: "July 1998",
    rating: 5,
  },
  {
    id: 7,
    name: "Ryo Higashino & Ide Ikutaro",
    location: "Japan",
    image: "/placeholder.svg?height=100&width=100",
    text: "We visited Northern Pakistan for filming an educational documentary on the natural beauty and people of Baltistan in 2000 and appreciate the efforts of all the highly professional team members organized by Mountain Travels Pakistan.",
    tour: "Educational Documentary",
    date: "September 2000",
    rating: 5,
  },
  {
    id: 8,
    name: "Hester Noyon",
    location: "Netherlands",
    image: "/placeholder.svg?height=100&width=100",
    text: "Mountain Travels Pakistan surprised us with a very well-organized trek to Baltoro and Gondogoro La. You really have found the perfect combination between professionalism and local insight and culture. Friendly, compassionate!",
    tour: "Baltoro & Gondogoro La Trek",
    date: "July 2004",
    rating: 5,
  },
  {
    id: 9,
    name: "Marten Van Asseldunk",
    location: "Holland",
    image: "/placeholder.svg?height=100&width=100",
    text: "I thank Hamid and his brothers for the excellent preparation and trek which they organized for me and my three teenage daughters. It was a wonderful experience which we will never forget.",
    tour: "Family Trek",
    date: "September 2004",
    rating: 5,
  },
  {
    id: 10,
    name: "Kamila Jeevanjee",
    location: "USA",
    image: "/placeholder.svg?height=100&width=100",
    text: "What a wonderful trek - the care and attention of Hamid and all the porters made a very tough trip extremely pleasant, safe, and not so intimidating.",
    tour: "Gondogoro La Trek",
    date: "July 2003",
    rating: 5,
  },
  {
    id: 11,
    name: "Georg Heel",
    location: "Austria",
    image: "/placeholder.svg?height=100&width=100",
    text: "With an excellent crew, beginning with our guide Ibrahim, the cook Ali who cooked in this area like in a gourmet restaurant, and also special Mr. Mahdi, who watched over us day and night, it was an unforgettable experience.",
    tour: "Karakoram Trekking",
    date: "August 2001",
    rating: 5,
  },
];

// Popular destinations
const popularDestinations = [
  {
    name: "Hunza Valley",
    image: "/placeholder.svg?height=600&width=800",
    description: "Known for its stunning landscapes and ancient forts",
    tours: 12,
  },
  {
    name: "Fairy Meadows",
    image: "/placeholder.svg?height=600&width=800",
    description: "A lush alpine meadow with views of Nanga Parbat",
    tours: 8,
  },
  {
    name: "Skardu",
    image: "/placeholder.svg?height=600&width=800",
    description: "Gateway to the mighty Karakoram mountain range",
    tours: 15,
  },
  {
    name: "Deosai Plains",
    image: "/placeholder.svg?height=600&width=800",
    description: "One of the highest plateaus in the world",
    tours: 6,
  },
];

// Blog posts preview
const blogPosts = [
  {
    title: "Best Time to Trek in Pakistan",
    excerpt:
      "Learn about the optimal seasons for different trekking regions in Pakistan",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15, 2023",
    slug: "best-time-to-trek-pakistan",
  },
  {
    title: "Essential Gear for High Altitude Trekking",
    excerpt: "A comprehensive guide to packing for your Karakoram adventure",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 22, 2023",
    slug: "essential-gear-high-altitude-trekking",
  },
  {
    title: "Cultural Etiquette in Northern Pakistan",
    excerpt:
      "Tips for respectful interactions with local communities during your travels",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 10, 2023",
    slug: "cultural-etiquette-northern-pakistan",
  },
];

// Trusted companies
const trustedCompanies = [
  {
    name: "National Geographic",
    logo: "/placeholder.svg?height=80&width=200",
  },
  {
    name: "Lonely Planet",
    logo: "/placeholder.svg?height=80&width=200",
  },
  {
    name: "Discovery Channel",
    logo: "/placeholder.svg?height=80&width=200",
  },
];

// Hero slides data
const heroSlides = [
  {
    image: "/assets/home/hero-1.jpg",
    title: "Refined Journeys Through the World’s Most Dramatic Mountains & Cultures",
    description:
      "Tailor-made trekking, cultural and adventure experiences crafted for our valued international travelers seeking comfort, authenticity and exclusivity.",
  },
  {
    image: "/assets/home/hero-2.jpg",
    title: "Refined Journeys Through the World’s Most Dramatic Mountains & Cultures",
    description:
      "Tailor-made trekking, cultural and adventure experiences crafted for our valued international travelers seeking comfort, authenticity and exclusivity.",
  },
  {
    image: "/assets/home/hero-3.jpg",
    title: "Refined Journeys Through the World’s Most Dramatic Mountains & Cultures",
    description:
      "Tailor-made trekking, cultural and adventure experiences crafted for our valued international travelers seeking comfort, authenticity and exclusivity.",
  },
];

export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true); // 👈 add this
  const [tips, setTips] = useState<any[]>([]); // ✅ new state
  const [loadingTips, setLoadingTips] = useState(true);
  const isMobile = useMobile();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [trustedCompanies, setTrustedCompanies] = useState<any[]>([]);
const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [popularDestinations, setPopularDestinations] = useState<any[]>([]);
  // Refs for scrollable containers
  const toursScrollRef = useRef<HTMLDivElement>(null);
  const blogsScrollRef = useRef<HTMLDivElement>(null);

  const toursPerPage = isMobile ? 1 : 3;
  const destinationsPerPage = isMobile ? 1 : 4;
  const blogsPerPage = isMobile ? 1 : 3;
  const destinationsScrollRef = useRef<HTMLDivElement>(null);

  // Filter tours that are featured
  const featuredToursOnly = enhancedTours.filter((tour) => tour.featured);
  const totalTourPages = Math.ceil(tours.length / toursPerPage);
  const totalDestinationPages = Math.ceil(
    popularDestinations.length / destinationsPerPage
  );
  const totalBlogPages = Math.ceil(blogPosts.length / blogsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }, []);
// inside Home component
const tipsScrollRef = useRef<HTMLDivElement>(null);

const nextTipSet = () => {
  if (isMobile && tipsScrollRef.current) {
    const scrollAmount =
      tipsScrollRef.current.scrollLeft + tipsScrollRef.current.offsetWidth;
    tipsScrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  } else {
    setCurrentBlogIndex((prev) =>
      prev === totalBlogPages - 1 ? 0 : prev + 1
    );
  }
};

const prevTipSet = () => {
  if (isMobile && tipsScrollRef.current) {
    const scrollAmount =
      tipsScrollRef.current.scrollLeft - tipsScrollRef.current.offsetWidth;
    tipsScrollRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  } else {
    setCurrentBlogIndex((prev) =>
      prev === 0 ? totalBlogPages - 1 : prev - 1
    );
  }
};

  // Tours navigation// Tours navigation
  const nextTourSet = () => {
    if (tours.length === 0) return;
  
    if (isMobile) {
      // 👉 cycle 1-by-1
      setCurrentTourIndex((prev) => (prev + 1) % tours.length);
    } else {
      // 👉 cycle page-wise
      setCurrentTourIndex((prev) => (prev + 1) % totalTourPages);
    }
  };
  useEffect(() => {
    async function loadCompanies() {
      const data = await getTrustedCompaniesPublic();
      setTrustedCompanies(data);
      setLoadingCompanies(false);
    }
    loadCompanies();
  }, []);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoadingTestimonials(true); // start loading
        const res = await fetch(`${BASE_URL}/api/testimonials`);
        const data = await res.json();
  
        if (data.success) {
          const mapped = data.data.map((t) => ({
            id: t._id,
            name: t.name,
            location: t.location,
            designation: t.designation,
            rating: t.rating,
            text: t.feedback,
            image: t.image,
            tour: t.tripName,
            date: new Date(t.tripDate).toLocaleDateString(),
          }));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoadingTestimonials(false); // stop loading
      }
    };
  
    fetchTestimonials();
  }, []);

  useEffect(() => {
    async function fetchTips() {
      setLoadingTips(true);
      const data = await getPublicTravelTips(); // use your util
      setTips(data);
      setLoadingTips(false);
    }
    fetchTips();
  }, []);
  useEffect(() => {
    getPopularDestinations().then((data) => setPopularDestinations(data));
  }, []);
  const prevTourSet = () => {
    if (tours.length === 0) return;
  
    if (isMobile) {
      setCurrentTourIndex((prev) => (prev - 1 + tours.length) % tours.length);
    } else {
      setCurrentTourIndex((prev) => (prev - 1 + totalTourPages) % totalTourPages);
    }
  };

  // Destinations navigation
  const nextDestinationSet = () => {
    if (isMobile && destinationsScrollRef.current) {
      const scrollAmount =
        destinationsScrollRef.current.scrollLeft +
        destinationsScrollRef.current.offsetWidth;
      destinationsScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      setCurrentDestinationIndex((prev) =>
        prev === totalDestinationPages - 1 ? 0 : prev + 1
      );
    }
  };

  const prevDestinationSet = () => {
    if (isMobile && destinationsScrollRef.current) {
      const scrollAmount =
        destinationsScrollRef.current.scrollLeft -
        destinationsScrollRef.current.offsetWidth;
      destinationsScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      setCurrentDestinationIndex((prev) =>
        prev === 0 ? totalDestinationPages - 1 : prev - 1
      );
    }
  };

  // Blogs navigation
  const nextBlogSet = () => {
    if (isMobile && blogsScrollRef.current) {
      const scrollAmount =
        blogsScrollRef.current.scrollLeft + blogsScrollRef.current.offsetWidth;
      blogsScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      setCurrentBlogIndex((prev) =>
        prev === totalBlogPages - 1 ? 0 : prev + 1
      );
    }
  };

  const prevBlogSet = () => {
    if (isMobile && blogsScrollRef.current) {
      const scrollAmount =
        blogsScrollRef.current.scrollLeft - blogsScrollRef.current.offsetWidth;
      blogsScrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      setCurrentBlogIndex((prev) =>
        prev === 0 ? totalBlogPages - 1 : prev - 1
      );
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Get current items to display based on pagination or all for mobile scrolling
 const currentTours = isMobile
  ? tours.slice(currentTourIndex, currentTourIndex + 1) // show 1 at a time
  : tours.slice(
      currentTourIndex * toursPerPage,
      (currentTourIndex + 1) * toursPerPage
    );


      const currentDestinations = isMobile
      ? popularDestinations
      : popularDestinations.slice(
          currentDestinationIndex * destinationsPerPage,
          (currentDestinationIndex + 1) * destinationsPerPage
        );

  const currentBlogs = isMobile
    ? blogPosts
    : blogPosts.slice(
        currentBlogIndex * blogsPerPage,
        (currentBlogIndex + 1) * blogsPerPage
      );
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [[nextSlide]]);

  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${BASE_URL}/api/tours`);
        console.log("Fetched tours in main page :", response.data.data);
        setTours(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setError("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);



  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[100vh] overflow-hidden flex items-center">
  {heroSlides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100 z-10" : "opacity-0"
      }`}
    >
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={slide.image || "/placeholder.svg"}
          alt={slide.title}
          fill
          sizes="100vw"
          quality={95}
          priority={index === 0}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent lg:from-black/60 lg:via-black/30 lg:to-transparent" />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-full sm:max-w-md md:max-w-lg text-white ml-0 md:ml-12 p-4 sm:p-6 md:p-8 rounded-lg md:rounded-none">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 animate-[fadeIn_0.5s_ease-in-out]">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6 animate-[fadeIn_0.8s_ease-in-out]">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/tours">
                <Button
                  size="md"
                  className="bg-secondary hover:bg-secondary/90 text-white animate-[fadeIn_1s_ease-in-out]"
                >
                  Discover Our Luxury Journeys
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="md"
                  className="bg-secondary hover:bg-secondary/90 text-white animate-[fadeIn_1s_ease-in-out]"
                >
                  Let Us Design a Tailor-Made Itinerary
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Dots Navigation */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
    {heroSlides.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full transition-colors ${
          index === currentSlide ? "bg-white" : "bg-white/50"
        }`}
        onClick={() => setCurrentSlide(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>







      {/* Tour Categories */}
      <TourIcons />



      {/* About Preview */}
      <FeaturedSignatureTours />
      {/* <section className="py-8 md:py-16 bg-about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-64 md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={aboutPreview.image || "/placeholder.svg"}
                alt="About Mountain Travels Pakistan"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {aboutPreview.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8">
                {aboutPreview.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {aboutPreview.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/about">
                <Button className="group text-sm md:text-base">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
      <WhyChooseSection />

      <section className="py-8 md:py-16 bg-featured">
  <div className="container mx-auto px-4">
    {/* Header with arrows */}
    <div className="flex justify-between items-center mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold">DESTINATIONS & REGIONS</h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTourSet}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTourSet}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Slider container */}
    <div className="overflow-hidden">
      {isMobile ? (
        // 👉 Mobile: 1 card
        tours[currentTourIndex] && (
          <div className="w-full">
            <div className="bg-white text-black rounded-xl shadow-sm hover:shadow-md border border-gray-200">
              <TourCard tour={tours[currentTourIndex]} />
            </div>
          </div>
        )
      ) : (
        // 👉 Desktop: 3 cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        {tours
          .slice(
            currentTourIndex * toursPerPage,
            (currentTourIndex + 1) * toursPerPage
          )
          .map((tour) => (
            <div key={tour._id} className="h-full">
              <div className="bg-white text-black rounded-xl shadow-sm hover:shadow-md border border-gray-200 h-full">
                <TourCard tour={tour} />
              </div>
            </div>
          ))}
      </div>
      )}
    </div>
  </div>
</section>
      {/* Popular Destinations */}
      {/* <ResponsiveCarousel
  title="Popular Destinations"
  items={popularDestinations}
  renderCard={(dest) => (
    <div className="h-[385px] w-[360px] p-4">
      <img
        src={`${BASE_URL}${dest.image}`}
        alt={dest.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{dest.name}</h3>
      <p className="text-gray-600 line-clamp-2">{dest.description}</p>
      <span className="text-sm text-gray-400">Tours: {dest.tours}</span>
      <Link href={`/destinations/${dest._id}`}>
        <Button className="mt-4 w-full">View More</Button>
      </Link>
    </div>
  )}
/> */}
{/* <ResponsiveCarousel
  title="Travel Tips & Insights"
  items={tips}
  renderCard={(tip) => (
    <div className="h-[390px] w-[360px] p-4">
      <img
        src={`${BASE_URL}${tip.image}`}
        alt={tip.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{tip.title}</h3>
      <p className="text-gray-600 line-clamp-2">{tip.excerpt}</p>
      <Link href={`/tips/${tip._id}`}>
        <Button className="mt-4 w-full">View More</Button>
      </Link>
    </div>
  )}
/> */}
      <section className="py-8 md:py-16 bg-testimonials relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute -top-10 -left-10 text-9xl text-primary">
            <Quote />
          </div>
          <div className="absolute bottom-10 right-10 text-9xl text-primary transform rotate-180">
            <Quote />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            What Our Travelers Say
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Read genuine reviews from our customers who have experienced our
            tours and services
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg p-8 md:p-8 shadow-md relative">
                      {/* <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white mt-4 p-2 rounded-full">
                        <Quote className="h-8 w-8" />
                      </div> */}

                      <div className="pt-4 text-center mb-6">
                        <p className="text-gray-700 italic mb-6">
                          {testimonial.text}
                        </p>
                        <div className="flex justify-center mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-primary font-medium">
                          Tour: {testimonial.tour}
                        </p>
                      </div>

                      <div className="flex items-center justify-center border-t pt-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
   {testimonials.map((testimo) => (
  <div key={testimo.id} className="flex items-center">
    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
      <img
        src={`${BASE_URL}${testimo.image}`}   // ✅ works
        alt={testimo.name}                              // ✅ also from testimo
        className="w-16 h-16 object-cover rounded-full"
      />
    </div>
  </div>
))}



                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            {testimonial.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {testimonial.location}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonialIndex === index
                      ? "bg-primary"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            <button
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-trusted">
  <div className="container mx-auto px-4">
    {/* Section Title */}
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
    Corporate Social Responsibility
    </h2>

    {/* Description */}
    <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
    At Mountain Travels Pakistan (MTP), responsible travel is not a policy – it is how
          we have always traveled.
    </p>

    {/* Charity Card (No Image) */}
    <div className="flex flex-col items-center text-center bg-white rounded-2xl shadow-md p-6 max-w-lg mx-auto hover:shadow-lg transition-shadow duration-300">
      {/* <h3 className="text-2xl font-semibold mb-3">
        Community Support & Responsibility
      </h3> */}

      <p className="text-gray-600 text-sm md:text-base mb-6">
           From the very beginning, MTP has worked hand in hand with local guides, porters,
            drivers and hosts — many of whom started their journeys with us decades ago.
            Over the years, a number of guides and porters who once worked with Mountain
            Travels Pakistan have gone on to establish their own tour companies....
      </p>

      {/* View Details Button */}
      <Link href="/corporate">
        <button className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors duration-300">
          View Details
        </button>
      </Link>
    </div>
  </div>
</section>

      <section
  className="relative w-full min-h-[50vh] md:min-h-[50vh] lg:min-h-[50vh] bg-center bg-cover bg-no-repeat flex items-center justify-center"
  style={{
    backgroundImage: `url('/assets/home/hero-233.jpg')`, // Replace with your image path
  }}
>
  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="container mx-auto px-4 relative text-center z-10">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
      PLAN YOUR ADVENTURE ?
    </h2>
    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 font-medium">
      Your Next Great Journey Starts Here
    </p>

    <Link href="/customizedtourform">
      <Button className="bg-secondary text-white px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl rounded-md hover:bg-secondary/90 transition-colors">
        Customize Your Tours
      </Button>
    </Link>
  </div>
</section>

    <section className="py-12 md:py-16 bg-trusted">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/tours">
            <Button className="bg-secondary text-white px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl rounded-md hover:bg-secondary/90 transition-colors w-full sm:w-auto">
              Browser All Tours
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="bg-secondary text-white px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl rounded-md hover:bg-secondary/90 transition-colors w-full sm:w-auto">
              Contact Our Travel Expert
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <section className="py-8 md:py-12 bg-trusted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
          CULTURE & RESPONSIBLE TRAVEL
        </h2>

        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          We work closely with local communities, respect cultural traditions and operate
          with a strong commitment to environmental responsibility. Our journeys create
          meaningful connections while preserving the landscapes and heritage we love.
        </p>

        {/* Cards */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustedCompanies.map((company) => (
            <div
              key={company._id}
              className="flex flex-col items-center text-center transition-all duration-300 bg-white p-6 rounded-xl shadow-md hover:shadow-lg max-w-sm"
            >
              {company.image && (
                <Image
                  src={`${BASE_URL}${company.image}`}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="h-12 md:h-16 w-auto object-contain mb-3"
                />
              )}

              <span className="text-lg font-semibold text-gray-700 mb-4">
                {company.title}
              </span>

              <p className="text-gray-600 text-sm md:text-base mb-6">
                {company.excerpt}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-10 text-center">
  <Link href="/trusted">
    <button className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:bg-orange-600">
      View details
    </button>
  </Link>
</div>

      </div>
    </section>


    </div>
  );
}

// Tour Card Component
function TourCard({ tour }) {
  return (
    <Link href={`/tours/detail/${tour._id}`} className="h-full">
      <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative h-48 md:h-56">
          <Image
            src={`${BASE_URL}${tour.images?.[0]}` || "/placeholder.svg"}
            alt={tour.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className="bg-secondary text-white text-xs md:text-sm">
              {tour.difficulty}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center text-white mb-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{tour.rating}</span>
              <span className="text-xs ml-1">({tour.reviews} reviews)</span>
            </div>
            <h3 className="font-bold text-lg text-white group-hover:text-secondary transition-colors line-clamp-1">
              {tour.name}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1 text-primary" />
            <span className="truncate">
              {tour.location}, {tour.country}
            </span>
          </div>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {tour.shortDescription}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-primary" />
              <span>{tour.days} Days</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-primary" />
              <span>{tour.groupSize}</span>
            </div>
            <div className="flex items-center">
              <Sun className="h-4 w-4 mr-1 text-primary" />
              <span>{tour.bestTime}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-primary" />
              <span>Best Seller</span>
            </div>
          </div>

          {/* Footer sticks to bottom */}
          <div className="mt-auto flex items-center justify-between">
            <span className="font-bold text-lg text-primary flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {tour.price}
            </span>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white transition-colors text-xs"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Destination Card Component
function DestinationCard({ destination }) {
  return (
    <div className="group relative h-64 md:h-80 rounded-lg overflow-hidden">
      <Image
        src={destination.image || "/placeholder.svg"}
        alt={destination.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
          {destination.name}
        </h3>
        <p className="text-white/80 text-sm mb-2">{destination.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">{destination.tours} tours</span>
          <Link
            // href={`/tours?destination=${destination.name.toLowerCase()}

            // `}
            href={`#`}
          >
            <Button variant="secondary" size="sm" className="text-xs">
              Explore
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function getIcon(icon: string) {
  switch (icon) {
    case "hiking":
      return <Compass className="h-6 w-6 md:h-8 md:w-8 text-primary" />;
    case "mountain":
      return <Mountain className="h-6 w-6 md:h-8 md:w-8 text-primary" />;
    case "bike":
      return <Bike className="h-6 w-6 md:h-8 md:w-8 text-primary" />;
    case "skiing":
      return <Snowflake className="h-6 w-6 md:h-8 md:w-8 text-primary" />;
    case "landmark":
      return <Landmark className="h-6 w-6 md:h-8 md:w-8 text-primary" />;
    case "compass":
      return <Tent className="h-6 w-6 md:h-8 md:w-8 text-primary" />;
    default:
      return null;
  }
}





