import React from "react";
import aboutTop from "../../../assets/blog-banner-thum.png";

const BlogHeader = ({ title, description }) => {
  return (
    <div className="ms-hero-banner-sec position-relative">
      <img
        src={aboutTop}
        alt="EP"
        className="position-absolute end-0 bottom-0  image-hero-banner-blog"
        //   className="img-fluid"
        //   style={{ marginTop: "30" }}
      />
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6 col-lg-6 mt-2">
            <div className="ms-banner-heading blog-heading">
              <span className="ms-bg-secondary py-2 px-4 rounded-2 fs-5">
                {" "}
                {title || "BLOGS & ARTICLES"}
              </span>
              <h1
                className="fw-lighter fs-4 pt-4 fw-medium"
                style={{ lineHeight: "35px" }}
              >
                {description ||
                  "Smart tips, practical guides, and financial updates to help you  make better money decisions with Emergency Paisa."}
              </h1>
            </div>
          </div>
          <div className="col-lg-6" style={{ textAlign: "right" }}></div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
