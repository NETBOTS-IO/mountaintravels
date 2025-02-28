"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import UilClock from "@iconscout/react-unicons/uil-clock";
import UilMapMarker from "@iconscout/react-unicons/uil-map-marker";
import UilHiking from "@iconscout/react-unicons/uil-hiking";
import UilUsersAlt from "@iconscout/react-unicons/uil-users-alt";
import UilDollarSign from "@iconscout/react-unicons/uil-dollar-sign";
import UilPlane from "@iconscout/react-unicons/uil-plane";
import UilInfoCircle from "@iconscout/react-unicons/uil-info-circle";
import UilDownloadAlt from "@iconscout/react-unicons/uil-download-alt";
import UilShareAlt from "@iconscout/react-unicons/uil-share-alt";


import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const tourData = {
  title: "Mountain Trek Adventure",
  overview:
    "Experience the breathtaking beauty of the Himalayas on this unforgettable trek.",
  details: [
    { icon: <UilClock size="24" />, label: "Duration", value: "7 Days" },
    { icon: <UilHiking size="24" />, label: "Difficulty", value: "Moderate" },
    { icon: <UilUsersAlt size="24" />, label: "Group Size", value: "5-12 people" },
    { icon: <UilMapMarker size="24" />, label: "Location", value: "Himalayas" },
    { icon: <UilDollarSign size="24" />, label: "Price", value: "$1,999 per person" },
  ],
  images: [
    "https://dummyimage.com/600x400/000/fff",
    "https://dummyimage.com/600x400/000/0000",
  ],
  itinerary: [
    {
      day: "Day 1",
      title: "Arrival & Trek Preparation",
      location: "Kathmandu, Nepal",
      accommodation: "Hotel Stay",
      meal: "Welcome Dinner",
      activities: "Sightseeing, Briefing Session",
      description: "Arrival at airport, meet guide, trek briefing.",
    },
    {
      day: "Day 2",
      title: "Trek Begins",
      location: "Trekking Base Camp",
      accommodation: "Camping / Lodge",
      meal: "Breakfast, Lunch, Dinner",
      activities: "Hiking, Nature Walk",
      description: "Drive to starting point, begin trekking adventure.",
    },
  ],
  inclusions: ["Accommodation", "Meals", "Guide", "Permits"],
  exclusions: ["Personal expenses", "Tips", "Travel insurance"],
  faqs: [
    { question: "What is the best time for this trek?", answer: "March - May & September - November." },
    { question: "Is travel insurance required?", answer: "Yes, we highly recommend travel insurance." },
  ],
};

const TourDetail = () => {
  return (
    <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h3" color="primary" fontWeight={700} gutterBottom>
        {tourData.title}
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={3}>
        {tourData.overview}
      </Typography>

      {/* Image Slider */}
      <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay autoplaySpeed={3000}>
        {tourData.images.map((img, index) => (
          <Box key={index} component="img" src={img} alt="Tour Image" sx={{ width: "100%", borderRadius: "10px" }} />
        ))}
      </Slider>

      {/* Tour Details */}
      <Grid container spacing={2} mt={4}>
        {tourData.details.map((detail, index) => (
          <Grid item xs={6} sm={4} key={index} display="flex" alignItems="center">
            {detail.icon}
            <Box ml={1}>
              <Typography variant="body1" fontWeight={600}>{detail.label}</Typography>
              <Typography variant="body2" color="textSecondary">{detail.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Itinerary */}
      <Typography variant="h4" color="secondary" fontWeight={700} mt={4}>
        Itinerary
      </Typography>
      {tourData.itinerary.map((day, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<UilInfoCircle size="24" />}>
            <Typography variant="h6" fontWeight={600}>{day.day}: {day.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">📍 {day.location}</Typography>
            <Typography variant="body2">🏨 {day.accommodation}</Typography>
            <Typography variant="body2">🍽 {day.meal}</Typography>
            <Typography variant="body2">🎯 {day.activities}</Typography>
            <Typography variant="body1" mt={1}>{day.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* FAQ Section */}
      <Typography variant="h4" color="secondary" fontWeight={700} mt={4}>
        FAQs
      </Typography>
      {tourData.faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<UilInfoCircle size="24" />}>
            <Typography variant="body1" fontWeight={600}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Share & Download */}
      <Box mt={4} display="flex" gap={2}>
        <Button variant="contained" color="primary" startIcon={<UilShareAlt size="24" />}>Share</Button>
        <Button variant="outlined" color="secondary" startIcon={<UilDownloadAlt size="24" />}>Download Details</Button>
      </Box>
    </Box>
  );
};

export default TourDetail;
