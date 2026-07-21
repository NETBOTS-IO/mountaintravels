/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mountaintravels.com",
  generateRobotsTxt: true, // (optional) generates robots.txt
  sitemapSize: 7000,
  outDir: "public",
  // You can add additional configuration here if needed
};
