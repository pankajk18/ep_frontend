import React from "react";
import useBlogs from "./hooks/useBlogs";
import BlogListingCard from "./component/BlogListingCard";
import BlogHeader from "./component/BlogHeader";

export default function Blog() {
  const { blogs, loading, error } = useBlogs();
  const allBlogs = blogs || [];

  if (loading) {
    return <div className="text-center">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error loading blogs.</div>;
  }

  return (
    <>
      {/* Banner Serion */}
      <BlogHeader />
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
