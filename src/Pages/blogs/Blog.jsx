import React from "react";
import aboutTop from "../../assets/blog-banner-thum.png";
import useBlogs from "./hooks/useBlogs";
import BlogListingCard from "./component/BlogListingCard";

export default function Blog() {
  const { blogs } = useBlogs();
  const allBlogs = blogs?.data || [];

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
            {allBlogs &&
              allBlogs?.length > 1 &&
              allBlogs?.map((blog) => (
                <div className="col-md-6 col-lg-4" key={blog.wb_id}>
                  <BlogListingCard blog={blog} />
                </div>
              ))}

            {allBlogs?.length === 0 && (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}
          </div>
        </div>
      </div>
      {/* end */}
    </>
  );
}
