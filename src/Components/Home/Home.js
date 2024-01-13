import React from "react";
import "./Home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // (Optional) Move this to the top
import Product from "../Product/Product";
import Images from "./images";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const carouselImages = [
    "https://m.media-amazon.com/images/I/616qTQYQWIL._SX3000_.jpg",
    "https://ltheme.com/wp-content/uploads/2019/05/carousel-banner-1.jpg",
    "https://interviewquery-assets.s3-us-west-1.amazonaws.com/images/Amazon_Banner.png",
  ];

  return (
    <div className="home">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        {carouselImages.map((src, index) => (
          <div key={index} className="all">
            <img
              className="home__image"
              src={src}
              alt={`Carousel Image ${index}`}
            />
          </div>
        ))}
      </Carousel>

      <div>
        <div className="home_row">
          <Product
            rating={5}
            id={1}
            price={322}
            image={Images.item1.image}
            title={Images.item1.title}
          />
          <Product
            rating={5}
            id={7}
            price={322}
            image={Images.item7.image}
            title={Images.item7.title}
          />
          <Product
            rating={5}
            id={2}
            price={233}
            image={Images.item2.image}
            title={Images.item2.title}
          />
        </div>

        <div className="home_row">
          <Product
            rating={5}
            id={8}
            price={233}
            image={Images.item8.image}
            title={Images.item8.title}
          />
          <Product
            rating={5}
            id={9}
            price={212}
            image={Images.item9.image}
            title={Images.item9.title}
          />
        </div>

        <div className="home_row">
          <Product
            rating={5}
            id={6}
            price={112}
            image={Images.item6.image}
            title={Images.item6.title}
          />
        </div>

        <div className="home_row">
          <Product
            rating={5}
            id={3}
            price={322}
            image={Images.item3.image}
            title={Images.item3.title}
          />
          <Product
            rating={5}
            id={4}
            price={233}
            image={Images.item4.image}
            title={Images.item4.title}
          />
          <Product
            rating={5}
            id={5}
            price={212}
            image={Images.item5.image}
            title={Images.item5.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
