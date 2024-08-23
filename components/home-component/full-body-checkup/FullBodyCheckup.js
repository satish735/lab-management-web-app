"use client";
import React, { useState } from "react";
import "@/components/home-component/full-body-checkup/full-body-checkup.css";
import InputSelect from "@/components/project-main-component/input-component/InputSelect";
import CarousalSlider from "@/components/CarousalSlider";
import { useRouter } from "next/navigation";
const FullBodyCheckup = () => {
  const [SelectCategory, setSelectCategory] = useState();
  const [SelectCategoryIsTouch, setSelectCategoryIsTouch] = useState();
  const router = useRouter();

  const [SelectCategoryFeedbackMessage, setSelectCategoryFeedBackMessage] =
    useState({
      type: "info",
      message: "",
    });
  const SelectCategorySelectValidater = (value) => {
    return true;
  };
  return (
    <div className="">
      <div className="container-fluid ">
        <div className="row ">
          <p className="col-lg-8 col-md-8 col-sm-12 heading-text-home ">
            Full Body Checkup Packages
          </p>
          <div className="col-lg-4 col-md-4 col-sm-12 pt-3">
            <InputSelect
              setValue={setSelectCategory}
              value={SelectCategory}
              options={[
                { label: "Select Category", value: "value1", disabled: true },

                { label: "test1", value: "value4" },
                { label: "test2", value: "value2" },
                { label: "test3", value: "value3" },
              ]}
              labelClassName="input-select-user-management-label"
              isTouched={SelectCategoryIsTouch}
              setIsTouched={setSelectCategoryIsTouch}
              className="py-1 input-select input-select-user-management"
              extraProps={{ style: { height: "40px" } }}
              label={""}
              isRequired={true}
              feedbackMessage={SelectCategoryFeedbackMessage?.message}
              feedbackType={SelectCategoryFeedbackMessage?.type}
            // validateHandler={SelectCategorySelectValidater}
            />
          </div>
        </div>

        <div className="full-body-checkup-section py-5">
          <CarousalSlider
            DataList={items}
            slidesToScroll={1}
            slidesToShow_lg={3}
            sliderFor={"packages"}
          />
        </div>

        <div className="text-center my-4">
          <button onClick={() => { router.push(`/health-packages`) }}
            className=" card-button-view-all px-4 py-2 "
            style={{ fontSize: "18px", fontWeight: "600" }}
          >
            View All Packages
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <p className=" heading-text-home my-2">Most Popular Tests</p>

        <div>
          <CarousalSlider
            DataList={items}
            slidesToScroll={1}
            slidesToShow_lg={4}
            sliderFor={"popular test"}
          />
        </div>

        <div className="text-center my-5">
          <button onClick={() => { router.push(`/health-packages`) }}
            className=" card-button-view-all px-4 py-2 "
            style={{ fontSize: "18px", fontWeight: "600" }}
          >
            View All Test
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <div className="offer-main-div row pt-3 pb-4" style={{ background: 'linear-gradient(rgb(1, 7, 63), rgb(0, 78, 146)' }}>
          <div className="col-lg-8 col-md-8 col-sm-12 ps-lg-5">
            <p className="offer-heading-text ">
              Exclusive Offer:{" "}
              <span style={{ color: "#e1fba6" }}>Get 10% Off</span> Your First
              Test or Health Package Today!
            </p>

            <p style={{ color: "#fff", fontSize: "17px" }}>
              New user? Enjoy 10% off up to Rs 200 on all tests and health
              packages with code NEW10. Prioritize your health journey now!
            </p>

            <div>
              <button className="discount-code-coupen">
                Use Code:<span style={{ color: "#e1fba6" }}>{"NEW10"}</span>
              </button>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12" style={{position:'relative'}}>
            <img className=" " style={{ height: "270px",position:'absolute',bottom:'-24px',right:'20px' }} src="/assets/images/temp/discount-image.webp" alt="post image" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBodyCheckup;

const items = [
  {
    img: "/assets/images/temp/img1.jpg",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img2",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img3",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  {
    img: "/assets/images/temp/img4",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img1",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img2",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  {
    img: "/assets/images/temp/img3",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img4",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img1",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  {
    img: "/assets/images/temp/img2",
    name: "Slide 1",
    review: "Slide 1 review",
  },
  {
    img: "/assets/images/temp/img3",
    name: "Slide 2",
    review: "Slide 2 review",
  },
  {
    img: "/assets/images/temp/img4",
    name: "Slide 3",
    review: "Slide 3 review",
  },
  // Add more items as needed
];
