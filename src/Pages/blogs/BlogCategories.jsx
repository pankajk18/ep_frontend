import React from "react";
import { Link, useParams } from "react-router-dom";
import BlogListingCard from "./component/BlogListingCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { slugToTitle } from "./blogs.utils";
import BlogHeader from "./component/BlogHeader";

export default function BlogCategories() {
  const { category } = useParams(); // 👈 get from URL

  const categoryTitle = slugToTitle(category); // Convert slug to title case for display
  const { data, loading } = useQuery({
    queryKey: ["categories", category],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.crmpaisa.com/get-blogs-data?category=${categoryTitle}`,
      );
      return res.data;
    },
    enabled: !!category, // ✅ only run if slug is available
  });

  const blogs = data?.data || [];

  return (
    <>
      <BlogHeader
        title={"Categories"}
        description={
          "Discover trending topics, expert opinions, and practical financial advice-all in one place."
        }
      />
      {/* Banner Serion */}

      {/* End */}
      <div className="container py-5">
        {loading && <p className="text-center">Loading...</p>}

        {blogs?.length ? (
          <>
            <h5 className="mb-5 text-left">
              <span className="ms-bg-secondary mb-2 px-3 py-2 rounded-pill shadow-lg text-white fw-semibold">
                {categoryTitle}
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
                  to="/blogs"
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
