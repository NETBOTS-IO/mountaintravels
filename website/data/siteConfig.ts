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
    phone: "+92 346 8486900",
    email: "info@mountaintravels.com",
    website: "mountaintravels.com",
    
  },
  contact2: {
    address2: `House 32, Street 177, G-13/3, Islamabad, Pakistan
    +92 346 8486900`,  
  },
  contact3: {
    address3: `412 S 325th Pl Apt S3, Federal Way, Washington 98003, USA
    +1 (206) 335-4272`,  
  },
  social: [
    { name: "Facebook", url: "https://www.facebook.com/mountaintravels", icon: "facebook" },
    { name: "Instagram", url: "https://instagram.com/mountaintravels", icon: "instagram" },
    { name: "Twitter", url: "https://twitter.com/mountaintravels", icon: "twitter" },
    { name: "LinkedIn", url: "https://linkedin.com/company/mountaintravels", icon: "linkedin" },
  ],
};

const mainCategories = ["Trekking", "Expeditions", "Cultural Tours"];
const otherCategories = ["Mountain Biking", "Skiing", "Safari", "Trips"];

export const mainMenu = [
  { name: "Home", path: "/" },
  // Direct main categories
  ...tourCategories
    .filter((c) => mainCategories.includes(c.id))
    .map((c) => ({
      name: c.name,
      path: `/tours?category=${c.id}`,
    })),
  // Dropdown for others
  {
    name: "Other Tours",
    children: tourCategories
      .filter((c) => otherCategories.includes(c.id))
      .map((c) => ({
        name: c.name,
        path: `/tours?category=${c.id}`,
      })),
  },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
{ name: "Blog", path: "/blogs" },

];
