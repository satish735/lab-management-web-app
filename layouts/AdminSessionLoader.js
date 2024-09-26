import React from "react";
import { Spinner } from "reactstrap";

const AdminSessionLoader = () => {
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
        <Spinner
          style={{
            height: "3rem",
            width: "3rem",
            color: "#00265c",
        
          }}
        />
        <p className="mt-2" style={{fontWeight:"600"}}>Please wait a while... <br /> Fetching user details from session</p>
      </div>
    </div>
  );
};

export default AdminSessionLoader;
