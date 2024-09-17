"use client"
import moment from "moment";

const AdminFooter = () => {
  return (
    <div
      className="d-flex justify-content-center   px-4"
      style={{
        fontSize: "0.875rem",
        lineHeight: "0.875rem",
        height: "50px",
        width: "100%",
        alignItems: "center",
        // borderTop: " 1px solid #ccc;",
        background: "white",
      }}
    >
      <span>
        © {moment().year()} <a href="/">Endolabs</a>. All rights reserved.
      </span>
    </div>
  );
};
export default AdminFooter;
