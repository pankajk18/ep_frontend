import React from "react";

export default function FooterCard(props) {
  // console.log(props)
  return (
    <div className="col-lg-12">
      <div className="footer-top-item d-flex pt-3">
        <div className="footer-icon">{props.icon}</div>
        <div className="footer-info">
          <h6 className="">{props.static}</h6>
          <p style={{ whiteSpace: "pre-line" }} className="">
            {props.val}
          </p>
        </div>
      </div>
    </div>
  );
}
