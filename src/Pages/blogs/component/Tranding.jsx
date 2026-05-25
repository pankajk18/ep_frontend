import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Tranding() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const data = [
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
    {
      serviceName:
        "WHY INSTANT PERSONAL LOAN APPS ARE GROWING AS A CRUCIAL FINANCIAL TOOL IN INDIA",
      shortdescription:
        "Specialized financial bridging for high-growth tech firms. Secure your runway today.",
    },
  ];
  return (
    <div>
      <div className="col-lg-12">
        <div className="ms-banner-heading pt-4 pb-4">
          <span className="fs-5 ms-bg-secondary py-2 px-3 rounded-2 text-white">
            {" "}
            Popular Blogs{" "}
          </span>
          <h3 className="fs-5 pt-3">
            How to identify and eliminate the performance silos in your
            enterprise stack.{" "}
          </h3>
        </div>
      </div>

      <div className="row g-0">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className="col-lg-6 col-md-6 col-12" key={index}>
              <div className="feature-card" style={{ margin: "10px" }}>
                <h5 className="text-lowercase" style={{ lineHeight: "30px" }}>
                  {item.serviceName}
                </h5>
                <p className="text-muted small mb-0">
                  {" "}
                  {item.shortdescription}
                </p>
                <Link to={`/personal-need/${item.slug}`}>
                  <button className="mt-4">
                    Know More{" "}
                    <span>
                      {" "}
                      <KeyboardArrowRightIcon />{" "}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
