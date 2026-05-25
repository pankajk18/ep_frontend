import React, { useEffect, useState } from "react";
import aboutTop from "../../assets/blog-banner-thum.png";
import { Link, useParams } from "react-router-dom";
import BlogListingCard from "./component/BlogListingCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function BlogCategories() {
  const { category } = useParams(); // 👈 get from URL

  const { data, loading } = useQuery({
    queryKey: ["categories", category],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.crmpaisa.in/get-blogs-data?category=${category}`,
      );
      return res.data;
    },
    enabled: !!category, // ✅ only run if slug is available
  });

  const blogs = data?.data || [];

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
        {loading && <p className="text-center">Loading...</p>}

        {data?.length ? (
          <>
            <h5 className="mb-5 text-left">
              <span className="ms-bg-secondary mb-2 px-3 py-2 rounded-pill shadow-lg text-white fw-semibold">
                {category}
              </span>
            </h5>

            <div className="row g-4">
              {blogs.map((blog, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <BlogListingCard blog={blog} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}

        {!loading && blogs.length === 0 && (
          <div>
            <p className="text-center fs-5 fw-bold text-danger">
              Sorry ! <br />
              No blogs found for this category.
              <div className="mt-4">
                <Link
                  to="/blog"
                  className="btn-apply text-decoration-none mt-4  "
                >
                  Browse All Blogs
                </Link>
              </div>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
