import React from "react";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import pic from "../../assets/banner_lms.jpg.jpeg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import { Link, useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import appThum from "../../assets/loan-thum.png";

import RecentPost from "./component/RecentPost";
import Trending from "./component/Trending";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function BlogDetailsNew() {
  const { slug } = useParams();

  const { data: blog } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.crmpaisa.in/get-blogs-data/${slug}`,
      );
      return res.data;
    },
    enabled: !!slug, // ✅ only run if slug is available
  });

  //   const blogCategories = blog?.categories || [];
  const data = blog?.data;

  const { data: categories } = useQuery({
    queryKey: ["categories", slug],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.crmpaisa.in/get-blogs-category-count`,
      );
      return res.data?.data || [];
    },
  });

  return (
    <>
      {data?.length === 0 ? (
        <p>Not found</p>
      ) : (
        <div className="container" style={{ marginTop: "120px" }}>
          {data?.map((item) => (
            <React.Fragment key={item.id}>
              <div key={item.id} className="col-12">
                <span className="fs-6 fw-medium text-muted">
                  <Link to={"/"} className="text-decoration-none text-black">
                    <span className="fw-medium flex items-center gap-4 ">
                      <HomeFilledIcon className="text-black mb-1" />
                      Home{" "}
                    </span>{" "}
                  </Link>{" "}
                  /{" "}
                  <Link
                    to={"/blog"}
                    className="text-decoration-none text-black"
                  >
                    <span className="fw-medium"> Blog </span>{" "}
                  </Link>{" "}
                  / <span className="font-light"> {item.wb_title}</span>
                </span>
              </div>
              {/* Category Button */}

              <div className="row mt-4 ">
                <div className="row mt-4">
                  <div className="col-12">
                    <button className="btn btn-outline-secondary rounded-pill px-3 py-2 ms-bg-secondary text-white fw-medium">
                      {item.wb_blog_category_name}
                    </button>
                  </div>
                </div>
                {/* Left Content */}
                <div className="col-lg-8 col-12 ">
                  <h1 className="fw-bold pt-3">{item.wb_title}</h1>
                  <h3
                    className="my-4"
                    style={{
                      fontSize: "17px",
                      lineHeight: "30px",
                      borderLeft: "7px solid #1973be",
                      paddingLeft: "15px",
                    }}
                  >
                    {item.wb_short_description}
                  </h3>

                  <div
                    className="row align-items-center pb-3 pt-3 mb-5"
                    style={{
                      borderTop: "1px solid #ddd",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {/* Left Section (User Info) */}
                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                      <div className="d-flex align-items-center gap-2">
                        <div className="thum">
                          <SwitchAccountIcon className="text-danger" />
                        </div>
                        <div>
                          <p className="mb-0 fw-bold fs-6 text-muted ">
                            EmergencyPaisa
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12 text-md-end">
                      <div className="d-flex align-items-center justify-content-md-end gap-2">
                        <CalendarMonthIcon className="text-danger" />
                        <span className="text-black fs-12">
                          {item.wb_publish_date}
                        </span>
                        |
                        <div className="thum">
                          <AccessTimeIcon className="text-danger" />
                        </div>
                        <div>
                          <p className="mb-0 fs-12 text-muted ">
                            Reading Time-{" "}
                            <span className="fw-medium">
                              {item.wb_reading_time}
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* <div>Reading Time: 4 min</div> */}
                    </div>
                  </div>

                  <img
                    src={pic}
                    alt=""
                    className="rounded"
                    style={{ width: "100%" }}
                  />

                  {/* editor section start */}
                  <div
                    className="pt-5 fs-5"
                    dangerouslySetInnerHTML={{
                      __html: item?.wb_long_description,
                    }}
                  ></div>
                  {/* end */}
                </div>
                {/* Right Sidebar */}
                <div
                  className="col-lg-4 col-12 mt-3 mt-lg-0 p-2 p-md-5 position-sticky"
                  style={{ top: "100px" }}
                >
                  <div
                    className="app-screen mb-5 border"
                    style={{ borderRadius: "10px" }}
                  >
                    <img src={appThum} alt="" style={{ width: "100%" }} />
                    <div className="p-6 w-full" style={{ marginTop: "-10px" }}>
                      <div
                        className="p-4"
                        style={{
                          background: "#ddd",
                          borderRadius: "0 0 10px 10px",
                        }}
                      >
                        <h4 className="text pt-3">
                          Instant Loans at Your Fingertips
                        </h4>
                        <div className="ms-bg-secondary py-3  rounded-2 text-white fw-bold text-center mt-4">
                          Download App
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 p-md-4 bg-light rounded shadow-sm">
                    {/* categories */}
                    <div className="d-flex align-items-center mb-4">
                      <div
                        style={{
                          width: "5px",
                          height: "30px",
                          background: "#1973be",
                        }}
                      ></div>
                      <h4 className="ms-3 mb-0 fw-bold fs-5">CATEGORIES</h4>
                    </div>
                    {categories?.map((catList, index) => (
                      <Link
                        className="text-decoration-none fw-medium text-black"
                        to={`/blog/category/${catList.category_name}`}
                        key={catList.category_id}
                      >
                        <li
                          className="pb-2"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          key={index}
                        >
                          <span className=""> {catList.category_name}</span>{" "}
                          <span
                            className="ms-bg-secondary px-3 py-1 text-white rounded-2"
                            style={{
                              maxWidth: "50px",
                            }}
                          >
                            {catList.total_count}
                          </span>
                        </li>
                      </Link>
                    ))}

                    {/* end */}
                  </div>

                  {/* Recent Post */}
                  <div className="mt-5">
                    <RecentPost />
                  </div>

                  {/* Explore venture */}
                  <div className=" my-4">
                    <div className="p-4 rounded bg-light shadow-lg border">
                      {/* Content */}
                      <div className="row">
                        <div className="col-12">
                          <h5
                            className="fw-bold mb-3"
                            style={{ color: "#1973be" }}
                          >
                            {" "}
                            Empower Your Venture.{" "}
                          </h5>

                          <p
                            className="mb-4 fw-medium"
                            style={{ fontSize: "16px" }}
                          >
                            Specialized financial bridging for high-growth tech
                            firms. Secure your runway today.{" "}
                          </p>

                          <Link to={"/apply-now"}>
                            <button className="btn ms-bg-secondary px-4 py-2 text-white fw-semibold text-uppercase">
                              Get a Loan Quote
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}

          <div className="border-bottom py-4"></div>

          <Trending />
        </div>
      )}
    </>
  );
}
