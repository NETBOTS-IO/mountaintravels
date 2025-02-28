import Banner from "@/components/Banner";
import Counter from "@/components/Counter";
import SectionTitle from "@/components/SectionTitle";
import Client from "@/components/slider/Client";
import Testimonial from "@/components/slider/Testimonial";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";
const teamData = [
  {
    image: 'assets/images/team/staff1.jpg',
    name: 'Ghulam Ahmad',
    designation: 'Founder',
  },
  {
    image: 'assets/images/team/staff2.jpg',
    name: 'Furman Ali',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff3.jpg',
    name: 'Hamid Hussain',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff04.jpg',
    name: 'Muhammad Iqbal',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff4.jpg',
    name: 'Ghulam Raza',
    designation: 'MTP staff',
  },

  {
    image: 'assets/images/team/staff6.jpg',
    name: 'Siddiq Hassan',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff7.jpg',
    name: 'Akhtar Hussain',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff8.jpg',
    name: 'Zeeshan Mehdi',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff9.jpg',
    name: 'M Iqbal',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff10.jpg',
    name: 'Ghulam Hassan',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff11.jpg',
    name: 'Akhond Ibrahim',
    designation: 'MTP staff',
  },
  {
    image: 'assets/images/team/staff12.jpg',
    name: 'Iqbal Qadiri',
    designation: 'MTP staff',
  },

];

const page = () => {
  return (
    <ReveloLayout header={1} footer={1}>
      <Banner pageTitle={"About Us"} />
      {/* About Area start */}
      <section className="about-area-two py-100 rel z-1">
        <div className="container">
          <div className="row justify-content-between">
            <div
              className="col-xl-3"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <span className="subtitle mb-35">About Company</span>
            </div>
            <div className="col-xl-9">
              <div
                className="about-page-content"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="row">
                  <div className="col-lg-8 pe-lg-5 me-lg-5">
                    <div className="section-title mb-25">
                      <h2>
                        Experience and Professional Tours &amp; Travel Agency in
                        the World
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="experience-years rmb-20">
                      <span className="title bgc-secondary">
                        Years Of Experience
                      </span>
                      <span className="text">We have</span>
                      <span className="years">30+</span>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <p>
                      We specialize in crafting unforgettable city experiences
                      for travelers seeking discover the heart and soul of urban
                      landscapes. Our expertly staffd tours take journey through
                      vibrant streets, historic landmarks, and hidden gems of
                      each city.
                    </p>
                    <ul className="list-style-two mt-35">
                      <li>Experience Agency</li>
                      <li>Professional Team</li>
                      <li>Low Cost Travel</li>
                      <li>Online Support 24/7</li>
                    </ul>
                    <Link href="about" className="theme-btn style-three mt-30">
                      <span data-hover="Explore Tours">Explore Tours</span>
                      <i className="fal fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Area end */}
      {/* Features Area start */}
      <section className="about-features-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-4 col-md-6">
              <div
                className="about-feature-image"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <img src="assets/images/about/about-feature1.jpg" alt="About" />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="about-feature-image"
                data-aos="fade-up"
                data-aos-delay={50}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <img src="assets/images/about/about-feature2.jpg" alt="About" />
              </div>
            </div>
            <div className="col-xl-4 col-md-8">
              <div
                className="about-feature-boxes"
                data-aos="fade-up"
                data-aos-delay={100}
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="feature-item style-three bgc-secondary">
                  <div className="icon-title">
                    <div className="icon">
                      <i className="flaticon-award-symbol" />
                    </div>
                    <h5>
                      <Link href="destination-details">
                        We Are Award Winning Company
                      </Link>
                    </h5>
                  </div>
                  <div className="content">
                    <p>
                    Unforgettable journeys to Pakistan's breathtaking mountains.
                    </p>
                  </div>
                </div>
                <div className="feature-item style-three bgc-primary">
                  <div className="icon-title">
                    <div className="icon">
                      <i className="flaticon-tourism" />
                    </div>
                    <h5>
                      <Link href="destination-details">
                        500+ Popular tour destinations
                      </Link>
                    </h5>
                  </div>
                  <div className="content">
                    <p>
                    Our team has successfully conducted over 500 tours, consistently exceeding guest expectations. We specialize in organizing engaging and memorable experiences for groups of all sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Area end */}
      {/* About Us Area start */}
      <section className="about-us-area pt-70 pb-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div
                className="about-us-content rmb-55"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-25">
                  <h2>
                    Travel with Confidence Top Reasons to Choose Our Agency
                  </h2>
                </div>
                <p>
                  We work closely with our clients to understand challenges and
                  objectives, providing customized solutions to enhance
                  efficiency boost profitability, and foster sustainable growth.
                </p>
                <div className="row pt-25">
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span className="count-text k-plus">
                        <Counter end={3} />
                      </span>
                      <span className="counter-title">Popular Destination</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="counter-item counter-text-wrap">
                      <span className="count-text m-plus">
                        <Counter end={9} />
                      </span>
                      <span className="counter-title">Satisfied Clients</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="destination-details"
                  className="theme-btn mt-10 style-two"
                >
                  <span data-hover="Explore Destinations">
                    Explore Destinations
                  </span>
                  <i className="fal fa-arrow-right" />
                </Link>
              </div>
            </div>
            <div
              className="col-xl-7 col-lg-6"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="about-us-page">
                <img src="assets/images/about/about-page.jpg" alt="About" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Area end */}
      {/* Team Area start */}
      <section className="about-team-area pb-70 rel z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-center counter-text-wrap mb-50"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <SectionTitle title={"WE ARE A TEAM OF EXPERTS"} />
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
      {teamData.map((member, index) => (
        <div
          key={index}
          className="col-xl-3 col-lg-4 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={index * 50}
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <div className="team-item hover-content">
            <img src={member.image} alt="staff" />
            <div className="content">
              <h6>{member.name}</h6>
              <span className="designation">{member.designation}</span>
              <div className="social-style-one inner-content">
                <Link href="contact">
                  <i className="fab fa-twitter" />
                </Link>
                <Link href="contact">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link href="contact">
                  <i className="fab fa-instagram" />
                </Link>
                <a href="#">
                  <i className="fab fa-pinterest-p" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
      </section>
      {/* Team Area end */}
      {/* Features Area start */}
      <section className="about-feature-two bgc-black pt-100 pb-45 rel z-1">
        <div className="container">
          <div
            className="section-title text-center text-white counter-text-wrap mb-50"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <SectionTitle title={"How to Benefit Our Ravelo Tours & Travels"} />
          </div>
          <div className="row">
            <div
              className="col-xl-3 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="feature-item style-two">
                <div className="icon">
                  <i className="flaticon-save-money" />
                </div>
                <div className="content">
                  <h5>
                    <Link href="destination-details">Best Rate Guarantee</Link>
                  </h5>
                  <p>Tent camping is wonderful way to connect with nature</p>
                </div>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="feature-item style-two">
                <div className="icon">
                  <i className="flaticon-travel-1" />
                </div>
                <div className="content">
                  <h5>
                    <Link href="destination-details">Diverse Destinations</Link>
                  </h5>
                  <p>
                    Mountain biking is exhilarat sport that physical fitness
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="feature-item style-two">
                <div className="icon">
                  <i className="flaticon-booking" />
                </div>
                <div className="content">
                  <h5>
                    <Link href="destination-details">Fast Booking</Link>
                  </h5>
                  <p>Kayaking is a thrilling outdoor activity that adventure</p>
                </div>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={150}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="feature-item style-two">
                <div className="icon">
                  <i className="flaticon-staffpost" />
                </div>
                <div className="content">
                  <h5>
                    <Link href="destination-details">Best MTP staff</Link>
                  </h5>
                  <p>Fishing and boat quintessent activities that bring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shape">
          <img src="assets/images/video/shape1.png" alt="shape" />
        </div>
      </section>
      {/* Features Area end */}
      {/* Video Area start */}
      <div className="video-area pt-25 rel z-1">
        <div className="container">
          <div
            className="video-wrap"
            data-aos="zoom-in"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <img src="assets/images/video/video-bg.jpg" alt="Video" />
            <a
              href="https://www.youtube.com/watch?v=nqsr5EJXy60"
              className="mfp-iframe video-play"
              tabIndex={-1}
            >
              <i className="fas fa-play" />
            </a>
          </div>
        </div>
        <div className="for-bg bgc-black">
          <div className="shape">
            <img src="assets/images/video/shape2.png" alt="shape" />
          </div>
        </div>
      </div>
      {/* Video Area end */}
      {/* Testimonials Area start */}
      <section className="testimonials-area py-100 rel z-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="testimonial-left-content rmb-50"
                data-aos="fade-right"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <img
                  src="assets/images/testimonials/testimonial-left2.jpg"
                  alt="Testimonial"
                />
                <div className="happy-customer text-white bgc-primary">
                  <h6>850K+ Happy Customer</h6>
                  <div className="feature-authors mb-15">
                    <img
                      src="assets/images/features/feature-author1.jpg"
                      alt="Author"
                    />
                    <img
                      src="assets/images/features/feature-author2.jpg"
                      alt="Author"
                    />
                    <img
                      src="assets/images/features/feature-author3.jpg"
                      alt="Author"
                    />
                    <span>4k+</span>
                  </div>
                  <hr />
                  <p>Positive Reviews</p>
                  <div className="testi-header">
                    <div className="ratting">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="testimonial-right-content"
                data-aos="fade-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-55">
                  <h2>
                    <span>5280</span> Global Clients Say About Us Services
                  </h2>
                </div>
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Area end */}
      {/* Client Logo Area start */}
      <div className="client-logo-area mb-100">
        <div className="container">
          <div className="client-logo-wrap pt-60 pb-55">
            <div
              className="text-center mb-40"
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <h6>We’re recommended by:</h6>
            </div>
            <Client />
          </div>
        </div>
      </div>
      {/* Client Logo Area end */}
    </ReveloLayout>
  );
};
export default page;
