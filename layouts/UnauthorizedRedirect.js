import React from "react";
import { Spinner } from "reactstrap";
import { FaUserShield } from "react-icons/fa6";
const UnauthorizedRedirect = () => {
  return (
    <div
      className="admin-content-box p-0"
      style={{ minHeight: "calc(100vh - 130px)", position: "relative" }}
    >
      <div
        className="loading"
        style={{
          width: "100%",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          translate: "transformY(-50%)",
        }}
      >
        <FaUserShield
          style={{
            height: "3rem",
            width: "3rem",
            color: "#00265c",
          }}
        />
        <p className="mt-2" style={{ fontWeight: "600" }}>
          Unauthenticated Access <br /> Redirecting to login page...
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedRedirect;
