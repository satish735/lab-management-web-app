import "./MainBanner.css";
import React from "react";
import MainBannerCrousel from "./MainBannerCrousel";
import MainBannerSecondPart from "./MainBannerSecondPart";

const MainBanner = () => {
  return (
    <>
      <div className="main-banner">
        <MainBannerCrousel />
      </div>
      <div className="main-banner-2">
        <MainBannerSecondPart />
        {/* <div className="main-banner-2-part-3">
          <div className="row align-items-center">
            <div className="col-12 col-xl-6 offset-xl-3 px-xl-5 text-center">
              <p className="px-xl-4 fw-bold mb-0">
                Whether you are a provider or patient, when you need trusted
                information to make confident health decisions, consider us.
                <a href="tests-services.html" className="underlined-text-secondary">
                  Our Specialty Areas
                </a>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MainBanner;
