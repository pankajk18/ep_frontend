import React from "react";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useBlogs from "../hooks/useBlogs";

export default function RecentPost() {
  const { blogs } = useBlogs();

  const blogData =
    blogs?.data && blogs?.data?.length > 5
      ? blogs?.data?.slice(0, 5)
      : blogs?.data || [];
  return (
    <>
      <h3 className="fw-bold fs-5">Recent Blogs</h3>
      <div className="row g-2">
        {blogData.map((blog) => (
          <div
            className="col-md-12 col-lg-12 border-bottom pb-4"
            key={blog.wb_id}
          >
            <div className="">
              <div className="card-body pt-4" style={{}}>
                {/* <Link
                  to={`/blog/category/${blog.wb_category_slug}`}
                  className="text-danger fw-semibold text-decoration-none"
                >
                  {blog.wb_blog_category_name}
                </Link> */}

                <p className="text-danger fw-semibold mb-0">
                  {blog?.wb_blog_category_name}
                </p>
                <h5 className="card-title fs-5 fw-semibold text-lowercase pt-2 text-capitalize ">
                  <Link
                    to={`/blog/${blog.wb_slug}`}
                    className="card-title fs-5 fw-semibold text-lowercase pt-2 text-capitalize text-decoration-none"
                  >
                    {blog.wb_title}
                  </Link>
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="fs-6 fw-medium mt-3">
                    {" "}
                    <CalendarMonthIcon className="ms-text-secondary" />{" "}
                    {blog.wb_publish_date}
                  </small>
                </div>
                {/* <p className="card-text text-muted text-lowercase">                                   
                                    {blog?.wb_short_description?.slice(0, 90)}...
                                </p> */}
              </div>

              {/* <div className="card-footer bg-white border-0 pb-4 ">
                                <Link to={`/blog/${blog.wb_slug}`}>
                                    <button className="btn btn-lg ms-bg-secondary text-white fs-6 rounded-sm shadow-lg fw-medium">
                                        Read More <ArrowOutwardIcon />
                                    </button>
                                </Link>
                            </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
