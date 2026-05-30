import React from "react";
import defaultImg from "../../../assets/emp-blog-thum.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { buildImageUrl } from "../../../Utils/common";

const BlogListingCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog.wb_slug}`}
      className="card h-100 shadow-sm text-decoration-none blog-listing-card"
    >
      <img
        src={
          buildImageUrl({ imageName: blog.wb_thumb_image_url }) ?? defaultImg
        }
        className="blog-card-img"
        alt={blog?.wb_title || "Blog "}
        // height={150}
        style={{
          objectFit: "contain",
        }}
      />

      <div className="card-body pt-4" style={{}}>
        <div className="">
          <div className="d-flex justify-content-between">
            <span className="fw-semibold fs-14">
              {" "}
              <SwitchAccountIcon className="text-danger" />{" "}
              {blog?.wb_blog_category_name}{" "}
            </span>

            <span className="fs-12 fw-medium text-danger">
              {" "}
              <CalendarMonthIcon className="text-danger mb-1 mx-1" />
              {blog?.wb_publish_date}
            </span>
          </div>
          {/* <span className="ms-bg-primary mb-2 px-2 py-1 rounded-1 shadow-lg text-white fw-semibold ">
                {blog.wb_blog_category_name}
            </span> */}
        </div>

        <h5 className="card-title mt-3 fs-5 fw-semibold text-capitalize text-lowercase truncate-2-lines ">
          {blog.wb_title}
        </h5>

        <p className="card-text text-muted my-2  text-capitalize text-lowercase truncate-3-lines">
          {/* {blog.wb_short_description} */}
          {blog?.wb_short_description}...
        </p>
        <span className="fs-6 fw-medium">
          {" "}
          <AccessTimeIcon className="text-danger" /> Reading time:{" "}
          {blog?.wb_reading_time || "5 minutes"}{" "}
        </span>
      </div>

      <div className="card-footer bg-white border-0 pb-4 ">
        <Link to={`/blog/${blog.wb_slug}`} className="blog-apply-now-btn">
          <button className="btn btn-lg ms-bg-secondary text-white fs-6 rounded-sm shadow-lg fw-medium">
            Read More <ArrowOutwardIcon />
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default BlogListingCard;
