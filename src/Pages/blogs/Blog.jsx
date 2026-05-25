import React, { useEffect, useState } from "react";
import aboutTop from "../../assets/blog-banner-thum.png";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";

import defaultImg from "../../assets/emp-blog-thum.png";

export default function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const getBlogData = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://api.crmpaisa.in/get-blogs-data");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();

      setBlogData(result?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

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

      {/* blog list start */}
      <div className="blog-wrapper">
        <div className="container py-5">
          <div className="text-left mb-5 pt-2">
            <h2 className="fw-bold ms-text-primary">
              Blog from{" "}
              <span className="ms-text-secondary">EmergencyPaisa</span>
            </h2>
          </div>

          {/* Blog Grid */}
          <div className="row g-4">
            {blogData.map((blog) => (
              <div className="col-md-6 col-lg-4" key={blog.wb_id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      blog?.wb_thumb_image_url
                        ? `https://crmpaisa.com/direct-document-file/${blog.wb_thumb_image_url}`
                        : defaultImg
                    }
                    alt={blog?.wb_title || "Blog "}
                  />

                  <div className="card-body pt-4" style={{}}>
                    <div className="">
                      <div className="d-flex justify-content-between">
                        <span className="fw-semibold">
                          {" "}
                          <SwitchAccountIcon className="text-danger" />{" "}
                          EmergencyPaisa{" "}
                        </span>

                        <span className="fs-6 fw-medium text-danger">
                          {" "}
                          {blog.wb_publish_date}
                        </span>
                      </div>
                      {/* <span className="ms-bg-primary mb-2 px-2 py-1 rounded-1 shadow-lg text-white fw-semibold ">
                                                {blog.wb_blog_category_name}
                                            </span> */}
                    </div>

                    <h5 className="card-title mt-3 fs-5 fw-semibold text-lowercase ">
                      {blog.wb_title}
                    </h5>

                    <p className="card-text text-muted text-lowercase">
                      {/* {blog.wb_short_description} */}
                      {blog?.wb_short_description?.slice(0, 90)}...
                    </p>
                    <span className="fs-6 fw-medium">
                      {" "}
                      <AccessTimeIcon className="text-danger" /> Reading time: 4
                      Minitus{" "}
                    </span>
                  </div>

                  <div className="card-footer bg-white border-0 pb-4 ">
                    <Link to={`/blog/${blog.wb_slug}`}>
                      <button className="btn btn-lg ms-bg-secondary text-white fs-6 rounded-sm shadow-lg fw-medium">
                        Read More <ArrowOutwardIcon />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* end */}
    </>
  );
}
