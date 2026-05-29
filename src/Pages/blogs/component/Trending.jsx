import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import defaultImage from "../../../assets/emp-blog-thum.png";
import { buildImageUrl } from "../../../Utils/common";

export default function Trending() {
  const { data: popularBlogs } = useQuery({
    queryKey: ["popular-blogs"],
    queryFn: async () => {
      const res = await axios.get(`https://api.crmpaisa.com/get-popular-blogs`);
      return res.data?.data || [];
    },
  });

  function SampleNextArrow({ className, style, onClick }) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.55)",
          borderRadius: "50%",
          width: 36,
          height: 36,
          zIndex: 2,
        }}
        onClick={onClick}
      >
        <KeyboardArrowRightIcon sx={{ color: "#fff", fontSize: 20 }} />
      </div>
    );
  }

  function SamplePrevArrow({ className, style, onClick }) {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.55)",
          borderRadius: "50%",
          width: 36,
          height: 36,
          zIndex: 2,
        }}
        onClick={onClick}
      >
        <KeyboardArrowLeftIcon sx={{ color: "#fff", fontSize: 20 }} />
      </div>
    );
  }

  const fallbackBlogs = [
    {
      wb_id: 1,
      wb_title:
        "SHORT-TERM LOAN IN KOLKATA: EASY APPLICATION AND INSTANT APPROVAL IN MINUTES",
      wb_slug:
        "short-term-loan-in-kolkata-easy-application-and-instant-approval-in-minutes",
      wb_publish_date: "2026-05-20",
      wb_thumb_image_url: "thumbnail_1779261638_lms_20260520125038371.png",
      wb_reading_time: "4 Mins",
      wb_is_popular: "Yes",
      wb_excerpt:
        "Apply fast with easy documents, instant approval in minutes and tailored short-term loan support in Kolkata.",
    },
  ];

  const blogs = popularBlogs?.length ? popularBlogs : fallbackBlogs;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="popular-blog-slider my-5">
      <div className="col-lg-12">
        <div className="ms-banner-heading pt-4 pb-4">
          <span className="fs-5 ms-bg-secondary py-2 px-3 rounded-2 text-white">
            Popular Blogs
          </span>
          <h3 className="fs-5 pt-3 mb-0">
            Discover the most clicked stories for fast funding and focused
            short-term loan insights.
          </h3>
        </div>
      </div>

      <div className="row g-0 mb-4">
        <Slider {...settings}>
          {blogs.map((item, index) => {
            const imageUrl = buildImageUrl({
              imageName: item.wb_thumb_image_url,
            });
            return (
              <Link
                key={index}
                className="col-12 px-2 text-decoration-none"
                to={`/blog/${item.wb_slug}`}
              >
                <div className="popular-blog-card">
                  <div className="popular-blog-card__image">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.wb_title} />
                    ) : (
                      <div className="popular-blog-card__placeholder">
                        Popular Blog
                      </div>
                    )}
                  </div>
                  <div className="popular-blog-card__body d-flex justify-content-center ">
                    <div className="popular-blog-card__meta">
                      {item.wb_is_popular === "Yes" && (
                        <span className="popular-blog-card__tag">Popular</span>
                      )}
                      <span>{item.wb_reading_time || "4 Mins"}</span>
                      <span>{item.wb_publish_date}</span>
                    </div>
                    <h3 className="popular-blog-card__title truncate-2-lines">
                      {item.wb_title}
                    </h3>
                    <p className="popular-blog-card__excerpt truncate-3-lines">
                      {item.wb_excerpt ||
                        item.wb_short_description ||
                        item.shortdescription ||
                        "Explore fast short-term financing options designed for Kolkata borrowers."}
                    </p>
                    <div className="popular-blog-card__footer">
                      <Link
                        to={`/blog/${item.wb_slug}`}
                        className="popular-blog-card__button"
                      >
                        Know More <KeyboardArrowRightIcon fontSize="small" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
