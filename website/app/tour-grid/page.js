import Banner from "@/components/Banner";
import Subscribe from "@/components/Subscribe";
import ReveloLayout from "@/layout/ReveloLayout";
import Link from "next/link";

const tours = [
  {
    id: 1,
    badge: "Featured",
    image: "assets/images/destinations/tour-list1.jpg",
    location: "Bali, Indonesia",
    rating: 5,
    title: "Bay Cruise lake trip by Boat in Bali, Indonesia",
    description: "Bali, Indonesia, is a tropical paradise renowned for breathtaking beaches and landscapes",
    duration: "3 days 2 nights",
    guests: "5-8 guest",
    price: "$58.00",
    link: "tour-details",
  },
  {
    id: 2,
    badge: "Featured",
    image: "assets/images/destinations/tour-list1.jpg",
    location: "Bali, Indonesia",
    rating: 5,
    title: "Bay Cruise lake trip by Boat in Bali, Indonesia",
    description: "Bali, Indonesia, is a tropical paradise renowned for breathtaking beaches and landscapes",
    duration: "3 days 2 nights",
    guests: "5-8 guest",
    price: "$58.00",
    link: "tour-details",
  },
  {
    id: 3,
    badge: "10% Off",
    image: "assets/images/destinations/tour-list2.jpg",
    location: "Rome, Italy",
    rating: 5,
    title: "Buenos Aires, Calafate & Ushuaia, Rome, Italy",
    description: "Rome, Italy, offers a rich blend of history, art, and vibrant culture",
    duration: "3 days 2 nights",
    guests: "5-8 guest",
    price: "$58.00",
    link: "tour-details",
  },
];

const page = () => {
  return (
    <ReveloLayout header={1} footer={1}>
      <Banner
        pageTitle={"Tour Grid View"}
        pageName={"Tour Grid"}
        search={true}
      />
      {/* Tour Grid Area start */}
      <section className="tour-grid-page py-100 rel z-2">
        <div className="container">
          <hr className="mb-50" />
          <div className="row">
            {tours.map((tour) => (
              <div key={tour.id} className="col-xl-4 col-md-6">
                <div
                  className="destination-item tour-grid style-three bgc-lighter"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="image">
                    <span className={`badge ${tour.badge === "Featured" ? "bgc-pink" : ""}`}>
                      {tour.badge}
                    </span>
                    {/* <a href="#" className="heart">
                      <i className="fas fa-heart" />
                    </a> */}
                    <img src={tour.image} alt="Tour List" />
                  </div>
                  <div className="content">
                    <div className="destination-header">
                      <span className="location">
                        <i className="fal fa-map-marker-alt" /> {tour.location}
                      </span>
                      <div className="ratting">
                        {Array.from({ length: tour.rating }).map((_, i) => (
                          <i key={i} className="fas fa-star" />
                        ))}
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
                      <Link
                        href={tour.link}
                        className="theme-btn style-two style-three"
                      >
                        <span data-hover="Book Now">Book Now</span>
                        <i className="fal fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <ul
                className="pagination justify-content-center pt-15 flex-wrap"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <li className="page-item disabled">
                  <span className="page-link">
                    <i className="far fa-chevron-left" />
                  </span>
                </li>
                <li className="page-item active">
                  <span className="page-link">
                    1<span className="sr-only">(current)</span>
                  </span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <i className="far fa-chevron-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Tour Grid Area end */}
      <Subscribe />
    </ReveloLayout>
  );
};

export default page;
