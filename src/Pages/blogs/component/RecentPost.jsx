import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import defaultImg from "../../../assets/emp-blog-thum.png";

export default function RecentPost() {
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
      <div className="row g-4">
        {blogData.map((blog) => (
          <div className="col-md-12 col-lg-12" key={blog.wb_id}>
            <div className="">
              <div className="card-body pt-4" style={{}}>
                <span className="text-danger fw-semibold ">
                  {blog.wb_blog_category_name}
                </span>
                <h5 className="card-title fs-5 fw-semibold text-lowercase pt-2 ">
                  {blog.wb_title}
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
