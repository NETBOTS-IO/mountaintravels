"use client";
import { sliderProps } from "@/utility/sliderprops";
import Slider from "react-slick";
import { useState } from "react";

const Testimonial = () => {
  // Define the state for testimonials
  const [testimonials] = useState([
    {
      title: "Quality Services",
      rating: 5,
      text:
        "Our trip was absolutely a perfect, thanks this travel agency! They took care of every detail, from accommodations, and even suggested incredible experiences",
      authorName: "Randall V. Vasquez",
      authorTitle: "Trekker",
      authorImage: "assets/images/testimonials/author.jpg",
    },
    {
      title: "Excellent Experience",
      rating: 5,
      text:
        "The travel agency provided top-notch service. Every place we visited was extraordinary, and the team ensured we had the best experience possible.",
      authorName: "Jessica L. McKinney",
      authorTitle: "Mountainer",
      authorImage: "assets/images/testimonials/author.jpg",
    },
    {
      title: "Excellent Services",
      rating: 5,
      text:
        "The travel agency provided top-notch service. Every place we visited was extraordinary, and the team ensured we had the best experience possible.",
      authorName: "McKinney Vasquez",
      authorTitle: "Porter",
      authorImage: "assets/images/testimonials/author.jpg",
    },
    // Add more testimonials as needed
  ]);

  return (
    <Slider {...sliderProps.testimonials} className="testimonials-active">
      {testimonials.map((testimonial, index) => (
        <div className="testimonial-item" key={index}>
          <div className="testi-header">
            <div className="quote">
              <i className="flaticon-double-quotes" />
            </div>
            <h4>{testimonial.title}</h4>
            <div className="ratting">
              {/* Dynamically render stars based on the rating */}
              {[...Array(testimonial.rating)].map((_, idx) => (
                <i className="fas fa-star" key={idx} />
              ))}
            </div>
          </div>
          <div className="text">{testimonial.text}</div>
          <div className="author">
            <div className="image">
              <img src={testimonial.authorImage} alt="Author" />
            </div>
            <div className="content">
              <h5>{testimonial.authorName}</h5>
              <span>{testimonial.authorTitle}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonial;
