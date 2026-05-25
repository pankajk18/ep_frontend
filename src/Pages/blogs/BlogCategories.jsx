import React, { useEffect, useState } from "react";
import aboutTop from "../../assets/blog-banner-thum.png";
import { Link, useParams } from "react-router-dom";
import defaultImg from "../../assets/emp-blog-thum.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function BlogCategories() {
  const { slug } = useParams(); // 👈 get from URL
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = slug;
  useEffect(() => {
    if (!category) return;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.crmpaisa.in/get-blogs-data?category=${category}`,
        );

        const data = await res.json();
        setBlogs(data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);
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
                  Categories
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
      <div className="container py-5">
        <h5 className="mb-5 text-left">
          <span className="ms-bg-secondary mb-2 px-3 py-2 rounded-pill shadow-lg text-white fw-semibold">
            {category}
          </span>
        </h5>

        {loading && <p className="text-center">Loading...</p>}

        {!loading && blogs.length === 0 && (
          <p className="text-center fw-bold text-danger">
            Sorry ! <br />
            No blogs found
          </p>
        )}

        <div className="row g-4">
          {blogs.map((blog, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={blog?.thumb_image_url || defaultImg}
                  alt={blog?.wb_title}
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
                    {blog?.wb_short_description?.slice(0, 90)}...{" "}
                  </p>
                  <span className="fs-6 fw-medium">
                    {" "}
                    <AccessTimeIcon className="text-danger" /> Reading time: 4
                    Minitus{" "}
                  </span>

                  <div className="card-footer bg-white border-0 mt-3 ">
                    <Link to={`/blog/${blog.wb_slug}`}>
                      <button className="btn btn-lg ms-bg-secondary text-white fs-6 rounded-sm shadow-lg fw-medium">
                        Read More <ArrowOutwardIcon />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
