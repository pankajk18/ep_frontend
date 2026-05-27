import React, { useEffect } from "react";
import FeaturrImg from "../assets/ep_feature_img.webp";
import Process from "./Process";
export default function Feature() {
  const FeatureData = [
    {
      id: "01",
      title: "Quick 10-minute disbursal",
      shortDis:
        "Immediate 10-minute disbursal of personal loans directly to your bank account with ease.",
    },
    {
      id: "02",
      title: "Lightning-fast approval",
      shortDis:
        "Our highly experienced lending specialists take no time to determine your eligibility.",
    },
    {
      id: "03",
      title: "No CIBIL score required",
      shortDis:
        "We empower all, irrespective of their CIBIL score. So, a weak credit score is not an issue.",
    },
    {
      id: "04",
      title: "Collateral-free loans",
      shortDis:
        "Our personal loans are unsecured, eliminating the need for collateral submission as security. ",
    },
  ];
  //   useEffect(() => {
  //     const script1 = document.createElement("script");
  //     script1.src =
  //       "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js";
  //     script1.async = true;

  //     script1.onload = () => {
  //       // b()
  //       scaleImg();
  //     };

  //     document.body.appendChild(script1);
  //     return () => {
  //       // Clean up: remove the script when the component unmounts

  //       document.body.removeChild(script1);
  //     };
  //   }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".feature-topic-wrap li");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // optional: animate only once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div id="feature" className="feature-ep-wrap mt-5">
      <div className="container">
        <div className="row pt-5 pb-5 d-flex align-content-center">
          <div className="col-lg-7" style={{ paddingTop: "1rem" }}>
            <p className="tag">Top Reasons</p>
            <h3 className="main-heading"> Trust EmergencyPaisa</h3>
            <p style={{ lineHeight: "30px" }}>
              Here are the core USPs that make us an ideal choice for personal
              loans.
            </p>
            <ul className="feature-topic-wrap ">
              {FeatureData.map((featureList) => {
                return (
                  <li className="d-flex" key={featureList.id}>
                    <div className="topic d-flex">
                      <div>
                        <h4 className="text-uppercase fw-bolder">
                          {featureList.title}
                        </h4>
                        <p className="mb-0 pb-0">{featureList.shortDis}</p>
                      </div>
                      {/* <div className='num'>
                                                    {featureList.id}
                                                </div> */}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-5 me-auto mb-lg-0">
            <div className="thumb-style-four">
              <img
                src={FeaturrImg}
                className="img-fluid"
                alt="EmergencyPaisa"
              />
            </div>
          </div>

          <Process />
        </div>
      </div>
    </div>
  );
}
