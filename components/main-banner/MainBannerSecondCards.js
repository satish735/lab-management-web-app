import React from "react";
import {
  FaArrowRightLong,
  FaSyringe,
  FaFlask,
  FaDesktop,
} from "react-icons/fa6";
const MainBannerSecondCards = () => {
  return (
    <div className="row midbox-inner m-auto mb-4">
      <div className="col-12 col-md-4 p-3">
        <div className="card-div">
          <div className="fancybox-body">
            <h4 className="fancybox-title">COVID19 Testing Solutions</h4>
            <p className="fancybox-desc">
              Tests can be ordered easily by health plan or employer or through
              some employee.
            </p>
            <a href="#" className="btn fancybox-button">
              <FaArrowRightLong /> <span>Request Test</span>
            </a>
            <div className="fancybox-icon">
              <FaSyringe size={40} style={{ color: "var(--color-gray-200)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4  p-3">
        <div className="card-div">
          <div className="fancybox-body">
            <h4 className="fancybox-title">I&apos;m a Healthcare Provider</h4>
            <p className="fancybox-desc">
              Clinical testing partnerships with industry leaders to make
              patients have diagnostic.
            </p>
            <a href="#" className="btn fancybox-button">
              <FaArrowRightLong /> <span>Registration</span>
            </a>
            <div className="fancybox-icon">
              <FaDesktop size={40} style={{ color: "var(--color-gray-200)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4  p-3">
        <div className="card-div">
          <div className="fancybox-body">
            <h4 className="fancybox-title">I&apos;m a Patient</h4>
            <p className="fancybox-desc">
              Focus on prevention &amp; early identification of potential health
              conditions to offer suite.
            </p>
            <a href="#" className="btn fancybox-button">
              <FaArrowRightLong /> <span>Appointment</span>
            </a>
            <div className="fancybox-icon">
              <FaFlask size={40} style={{ color: "var(--color-gray-200)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBannerSecondCards;
