import Banner from "@/components/Banner";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";

const tours = [
  {
    id: 1,
    image: "assets/images/destinations/tour-list1.jpg",
    badge: "Featured",
    location: "Bali, Indonesia",
    title: "Bay Cruise by Boat in Bali, Indonesia",
    description: "Bali, Indonesia, is a tropical paradise renowned for its breathtaking beaches, vibrant culture, and lush landscapes.",
    duration: "3 days 2 nights",
    guests: "5-8 guests",
    price: "$58.00",
    link: "tour-details",
  },
  {
    id: 2,
    image: "assets/images/destinations/tour-list2.jpg",
    badge: "10% Off",
    location: "Rome, Italy",
    title: "Buenos Aires, Calafate & Ushuaia",
    description: "Explore the wonders of Rome with its historical landmarks, vibrant streets, and rich culture.",
    duration: "3 days 2 nights",
    guests: "5-8 guests",
    price: "$105.00",
    link: "tour-details",
  },
  {
    id: 3,
    image: "assets/images/destinations/tour-list3.jpg",
    badge: "",
    location: "Tamnougalt, Morocco",
    title: "Camels on desert Morocco, Sahara.",
    description: "Experience the mystique of the Moroccan Sahara with camel rides and stunning desert landscapes.",
    duration: "3 days 2 nights",
    guests: "5-8 guests",
    price: "$386.00",
    link: "tour-details",
  },
  {
    id: 4,
    image: "assets/images/destinations/tour-list4.jpg",
    badge: "Popular",
    location: "Switzerland",
    title: "Hakone, Lake Asha Cruise Day Bus Trip",
    description: "Discover Switzerland's picturesque beauty with lakeside cruises and breathtaking scenery.",
    duration: "3 days 2 nights",
    guests: "5-8 guests",
    price: "$293.00",
    link: "tour-details",
  },
];

const TourCard = ({ tour }) => (
  <div
    className="destination-item style-three bgc-lighter"
    data-aos="fade-up"
    data-aos-duration={1500}
    data-aos-offset={50}
  >
    <div className="image">
      {tour.badge && <span className={`badge ${tour.badge === "Featured" ? "bgc-pink" : ""}`}>{tour.badge}</span>}
      <a href="#" className="heart">
        <i className="fas fa-heart" />
      </a>
      <img src={tour.image} alt="Tour List" />
    </div>
    <div className="content">
      <div className="destination-header">
        <span className="location">
          <i className="fal fa-map-marker-alt" /> {tour.location}
        </span>
        <div className="ratting">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
        </div>
      </div>
      <h5>
        <Link href={tour.link}>{tour.title}</Link>
      </h5>
      <p>{tour.description}</p>
      <ul className="blog-meta">
        <li>
          <i className="far fa-clock" /> {tour.duration}
        </li>
        <li>
          <i className="far fa-user" /> {tour.guests}
        </li>
      </ul>
      <div className="destination-footer">
        <span className="price">
          <span>{tour.price}</span>/person
        </span>
        <Link href={tour.link} className="theme-btn style-two style-three">
          <span data-hover="Book Now">Book Now</span>
          <i className="fal fa-arrow-right" />
        </Link>
      </div>
    </div>
  </div>
);

const Page = () => {
  return (
    <ReveloLayout header={1} footer={1}>
      <Banner pageTitle="Tour List View" pageName="Tour List" search />
      <section className="tour-list-page py-100 rel z-1">
        <div className="container">
          <div
            className="row"
            style={{ alignItems: "center", justifyContent: "center", display: "flex", flexWrap: "wrap" }}
          >
            <div className="col-lg-9">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </ReveloLayout>
  );
};

export default Page;
