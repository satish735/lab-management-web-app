"use client";
import '@/styles/globals.css'
import React from "react";
import "./LoginLayout.css";
import Image from "next/image";

const LoginLayout = ({ children }) => {
  return (
    <div className="row m-0 p-0" style={{ minHeight: "100vh" }}>
      <div className="col-lg-6 col-md-12 col-sm-12 m-0 login-section-left">
        <div className="login-logo">
          <a href="/">
            <Image
              src="/assets/images/MainLogo.png"
              className=""
              height={60}
              width={162}
              alt="logo"
            />
          </a>
        </div>
        <div className="login-form">{children}</div>
      </div>
      <div className="col-lg-6 col-md-12 col-sm-12  m-0  login-section-right">
        <div className="login-section-rightbox">
          <h2>
            A legacy of <br />
            Truth, Trust and Care
          </h2>
          <img src="/assets/images/login.png"></img>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
