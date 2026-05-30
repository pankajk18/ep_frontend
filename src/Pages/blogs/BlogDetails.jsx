import React from "react";
import aboutTop from "../../assets/blog-banner-thum.png";
import pic from "../../assets/banner_lms.jpg.jpeg";

export default function BlogDetails() {
  return (
    <>
      {/* Banner Serion */}
      <div className="ms-hero-banner-sec" style={{ paddingTop: "80px" }}>
        <div className="container">
          <div className="row  align-items-center">
            <div className="col-lg-6">
              <div className="ms-banner-heading">
                <span className="ms-bg-secondary py-2 px-4 rounded-2 fs-5">
                  {" "}
                  Blogs
                </span>
                <h1
                  className="fw-lighter fs-5 pt-3 fw-medium"
                  style={{ lineHeight: "30px" }}
                >
                  Discover trending topics, expert opinions, and practical
                  financial advice-all in one place.
                </h1>
              </div>
            </div>
            <div className="col-lg-6" style={{ textAlign: "right" }}>
              <img
                src={aboutTop}
                alt="EP"
                className="img-fluid"
                style={{ marginTop: "30" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* End */}

      <div className="col-9 m-auto pt-5">
        <h2 className="pb-4 fw-bold pt-4">
          Plan a Perfect Holiday with an Online Personal Loan for Travel
        </h2>
        <h5
          className="fw-medium opacity-75"
          style={{
            borderRadius: "0px",
            borderLeft: "7px solid #ddd",
            padding: "5px 10px",
            paddingBottom: "20px",
            lineHeight: "33px",
          }}
        >
          Read on to discover the importance of an Online Personal Loan for
          Travel and how SalaryOnTime, a trusted loan partner and reliable
          companion, helps bring your long-awaited aspirations to life. a
          trusted loan partner and reliable companion, helps bring your
          long-awaited aspirations to life.{" "}
        </h5>
        <div className="mt-5 m-auto col-10">
          <img
            src={pic}
            alt="Blog title"
            className="img-fluid border p-2 rounded-2"
          />
        </div>

        <p className="pt-5 fs-5 fw-medium">
          Read on to discover the importance of an Online Personal Loan for
          Travel and how SalaryOnTime, a trusted loan partner and reliable
          companion, helps bring your long-awaited aspirations to life.{" "}
        </p>
        <p className="pt-2 fs-5 fw-medium">
          Yash is a vibrant, young, and full-of-life salaried employee. His
          burning desire is to explore different tourist attractions in India,
          such as Himachal Pradesh, Kullu Manali, Maharashtra, Uttarakhand, and
          more. However, when he glances at his monthly financial commitments
          and bank balance, his eagerness to explore takes a back seat. And it
          has been happening for a long time now.
        </p>
        <p className="pt-2 fs-5 fw-medium">
          If he touches his saved-up funds, he’ll be left vulnerable during
          emergencies. Secondly, if he finances his trip using a credit card, it
          may take a toll on his finances, given that his monthly financial
          commitments are fixed. Lastly, he can borrow from those he knows,
          which is a last resort.
        </p>
        <p className="pt-2 fs-5 fw-medium">
          Borrowing can be an ideal option, but only from someone highly
          reliable, such as SalaryOnTime. With our Personal Loan for Travel, you
          can put an end to all the ifs and buts, holiday vs savings conflict,
          and begin making your travel dream a reality. Keep reading to learn
          more about how to plan a perfect, financially stress-free trip.
        </p>

        <h4 className="fs-4 fw-bold pt-4 pb-2">
          Step-by-Step Guide to Plan a Hassle-free Holiday
        </h4>
        <p className="fs-6 fw-medium lh-2">
          {" "}
          <b>Choose Your Destination</b> : What are you? An Adventure, Cultural,
          Foodie, Wildlife, Pilgrim / Spiritual or a Festival Traveller, whether
          you crave for giant mountain sightseeing or serene sea beaches appease
          your mind and soul, whether the hustle and bustle of City Lights
          attracts you or the calm and composed Countryside helps you soak in
          positivity and rejuvenate yourself, depending on your interest,
          preference and personality traits, you can pick a destination.
        </p>
        <p className="fs-6 fw-medium lh-2">
          {" "}
          <b>Choose Your Destination</b> : What are you? An Adventure, Cultural,
          Foodie, Wildlife, Pilgrim / Spiritual or a Festival Traveller, whether
          you crave for giant mountain sightseeing or serene sea beaches appease
          your mind and soul, whether the hustle and bustle of City Lights
          attracts you or the calm and composed Countryside helps you soak in
          positivity and rejuvenate yourself, depending on your interest,
          preference and personality traits, you can pick a destination.
        </p>
        <p className="fs-6 fw-medium lh-2">
          {" "}
          <b>Choose Your Destination</b> : What are you? An Adventure, Cultural,
          Foodie, Wildlife, Pilgrim / Spiritual or a Festival Traveller, whether
          you crave for giant mountain sightseeing or serene sea beaches appease
          your mind and soul, whether the hustle and bustle of City Lights
          attracts you or the calm and composed Countryside helps you soak in
          positivity and rejuvenate yourself, depending on your interest,
          preference and personality traits, you can pick a destination.
        </p>
        <p className=" fs-6 fw-medium pb-5 lh-2">
          {" "}
          <b>Choose Your Destination</b> : What are you? An Adventure, Cultural,
          Foodie, Wildlife, Pilgrim / Spiritual or a Festival Traveller, whether
          you crave for giant mountain sightseeing or serene sea beaches appease
          your mind and soul, whether the hustle and bustle of City Lights
          attracts you or the calm and composed Countryside helps you soak in
          positivity and rejuvenate yourself, depending on your interest,
          preference and personality traits, you can pick a destination.
        </p>
      </div>
    </>
  );
}
