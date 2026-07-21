import { tourCategories } from "./tourPackages";

export const siteConfig = {
  name: "Mountain Travels Pakistan",
  shortName: "MTP",
  description:
    "Discover the beauty of Pakistan's mountains with our guided tours.",
  contact: {
    address: `Ghangchan House, Aliabad
Satellite Town, 
Skardu City, Gilgit-Baltistan, Pakistan`,
    phone: "+92 339 8486900",
    email: "info@mountaintravels.com",
    website: "mountaintravels.com",
  },
  social: [
    {
      name: "Facebook",
      url: "https://www.facebook.com/mountaintravels",
      icon: "facebook",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/mountaintravels",
      icon: "instagram",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/mountaintravels",
      icon: "twitter",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/mountaintravels",
      icon: "linkedin",
    },
  ],
};

const mainCategories = ["Trekking", "Expeditions", "Cultural Tours"];
const otherCategories = ["Mountain Biking", "Skiing", "Safari", "Trips"];

export const mainMenu = [
  { name: "Destinations", path: "/destinations" },
  { name: "Tours", path: "/pakistan-tours" },
  {
    name: "Adventures",
    children: [
      { name: "Trekking", path: "/trekking-in-pakistan" },
      { name: "Mountaineering", path: "/mountaineering-in-pakistan" },
    ],
  },
  {
    name: "Travel Guides",
    children: [
      { name: "Pakistan Guide", path: "/pakistan-travel-guide" },
      { name: "Travel Information", path: "/travel-information-pakistan" },
    ],
  },
  { name: "Media", path: "/media" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
