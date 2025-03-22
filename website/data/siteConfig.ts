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
  socialMedia: {
    facebook: "https://facebook.com/mountaintravels",
    instagram: "https://instagram.com/mountaintravels",
    twitter: "https://twitter.com/mtpakistan",
  },
};

export const mainMenu = [
  { name: "Home", path: "/" },
  ...tourCategories
    .filter((category) => category.id !== "all")
    .map((category) => ({
      name: category.name,
      path: `/tours?category=${category.id}`,
    })),
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
