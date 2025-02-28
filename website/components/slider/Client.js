"use client";
import { sliderProps } from "@/utility/sliderprops";
import Slider from "react-slick";

const Client = () => {
  return (
    <Slider {...sliderProps.client} className="client-logo-active">
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client1.png"
            alt="Client Logo"
          />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={50}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client2.png"
            alt="Client Logo"
          />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={100}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client3.png"
            alt="Client Logo"
          />
        </a>
      </div>

      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client1.png"
            alt="Client Logo"
          />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={50}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client2.png"
            alt="Client Logo"
          />
        </a>
      </div>
      <div
        className="client-logo-item"
        data-aos="flip-up"
        data-aos-delay={100}
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <a href="#">
          <img
            src="assets/images/client-logos/client3.png"
            alt="Client Logo"
          />
        </a>
      </div>
    </Slider>
  );
};
export default Client;
