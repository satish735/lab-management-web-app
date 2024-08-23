"use client";
import React, { useState } from "react";
import "@/components/home-component/full-body-checkup/full-body-checkup.css";
import InputSelect from "@/components/project-main-component/input-component/InputSelect";
import CarousalSlider from "@/components/CarousalSlider";
import YoutubeComponent from "../i-frame-component/YoutubeComponent";
import RecentBlog from "../health-blog/RecentBlog";
import PopularBlog from "../health-blog/PopularBlog";
import TrendingBlog from "../health-blog/TrendingBlog";
import FrequentlyAskQuestion from "../frequently-asked-question/FrequentlyAskQuestion";
import PopularTest from "../popular-test/PopularTest";
import "./test.css";
import { useRouter } from "next/navigation";
import useAPI from "@/hooks/useAPI";
const TestsComponent = () => {
  const router = useRouter();

  const [healthBlog, setHealthBlog] = useState("recent");



  const [FaqResponse, FaqHandler] = useAPI(
    {
      url: "/faq/faqlisting",
      method: "get",
      sendImmediately: true,
      params: {
        // sortColumn: sort?.column,
        // sortDirection: sort?.direction,
        // pageNo: pageNo,
        // pageSize: pageSize,
        // searchQuery: searchValue,
      },
    },
    (e) => {
      return e.data ?? []
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting Faq!",
        e
      ));
      return e
    }
  );


  return (
    <div>
      <div className="container-fluid mt-5 heading-text-home">
        <p className="  my-4">Tests by Medical Conditions</p>

        <div>
          <CarousalSlider
            DataList={[]}
            slidesToScroll={1}
            slidesToShow_lg={7}
            sliderFor={"tests-by-medical-condition"}
          />
        </div>

        <div className="text-center my-4">
          <button onClick={() => { router.push(`/home-collection`) }}
            className=" card-button-view-all px-4 py-2 "
            style={{ fontSize: "18px", fontWeight: "600" }}
          >
            View All
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <p className=" heading-text-home my-2">Tests by Body Parts</p>

        <div>
          <CarousalSlider
            DataList={[]}
            slidesToScroll={1}
            slidesToShow_lg={7}
            sliderFor={"tests-by-body-part"}
          />
        </div>

        <div className="text-center my-4">
          <button onClick={() => { router.push(`/`) }}
            className=" card-button-view-all px-4 py-2 "
            style={{ fontSize: "18px", fontWeight: "600" }}
          >
            View All
          </button>
        </div>
      </div>

      <div className="container-fluid">
        <p
          className=" heading-text-home mt-2 mb-4  text-center"
          style={{ lineHeight: "1.2" }}
        >
          {" "}
          Our Path to Excellence in Healthcare Spanning <br /> Cities &
          Milestones
        </p>

        <div className="container-fluid my-5">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 px-2">
              <div className="offer-main-div p-0">
                <YoutubeComponent embedId="rokGy0huYEA" className="w-100" />
                <div className="container-fluid">
                  <p className="heading-text-youtube-section">
                    The Journey of Your Sample
                  </p>
                  <p className="inner-text-youtube-section">
                    Tune in as we unveil the journey from sample collection to
                    report generation, revealing the secret behind our
                    excellence. Experience an innovative standard in diagnostic
                    facilities - from effortless home sample collection to
                    unparalleled accuracy. With 151 Sahi Quality Checkpoints, we
                    stand firm in our belief that &apos;Test Sahi Toh Sehat Sahi&apos;
                  </p>
                  <div>
                    <button className="card-button mb-4">
                      Learn More{" "}
                      <span className="ms-2" style={{ fontSize: "15px" }}>
                        ❯
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="offer-main-div py-3 px-4 mb-3">
                <p className="heading-text-youtube-section">
                  A Legacy Of Excellence
                </p>

                <p className="inner-text-youtube-section mb-3">
                  Driven by Excellence: Where People, Process, and Technology
                  Meet to Serve You Better
                </p>

                <div className="row">
                  <div className="col-4">
                    <p className="heading-text-youtube-section">30+</p>
                    <p className="inner-text-youtube-section">
                      Years of Experience
                    </p>
                  </div>

                  <div className="col-4">
                    <p className="heading-text-youtube-section">100+</p>
                    <p className="inner-text-youtube-section">
                      Collection Centers
                    </p>
                  </div>

                  <div className="col-4">
                    <p className="heading-text-youtube-section">1500+</p>
                    <p className="inner-text-youtube-section">
                      Different Tests
                    </p>
                  </div>
                </div>
              </div>
              <div className="offer-main-div py-3 px-4 mb-3">
                <p className="heading-text-youtube-section">
                  Easy Booking in 3 Steps
                </p>

                <p className="inner-text-youtube-section mb-2">
                  Book a Home Collection in 3 Easy Steps
                </p>

                <div className="row px-3">
                  <div className="col-4">
                    <div className="row">
                      <p className="heading-text-youtube-section col-2">
                        <span
                          className="px-2 py-1"
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#21cdad",
                            color: "white",
                            fontSize: "14px",
                            width: "14px",
                            height: "10px",
                          }}
                        >
                          1
                        </span>
                      </p>
                      <p
                        className="inner-text-youtube-section col-10"
                        style={{ paddingTop: "16px" }}
                      >
                        Select Packages
                      </p>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="row">
                      <p className="heading-text-youtube-section col-2">
                        <span
                          className="px-2 py-1"
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#21cdad",
                            color: "white",
                            fontSize: "14px",
                            width: "24px",
                            height: "10px",
                          }}
                        >
                          2
                        </span>
                      </p>
                      <p
                        className="inner-text-youtube-section col-10"
                        style={{ paddingTop: "16px" }}
                      >
                        Add your details
                      </p>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="row">
                      <p className="heading-text-youtube-section col-2">
                        <span
                          className="px-2 py-1"
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#21cdad",
                            color: "white",
                            fontSize: "14px",
                            width: "10px",
                            height: "10px",
                          }}
                        >
                          3
                        </span>
                      </p>
                      <p
                        className="inner-text-youtube-section  col-10"
                        style={{ paddingTop: "16px" }}
                      >
                        Book your slot
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <button className=" card-button mb-3">
                    Order Now{" "}
                    <span className="ms-2" style={{ fontSize: "15px" }}>
                      ❯
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid pt-5"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <p
          className=" heading-text-home my-2 text-center"
          style={{ lineHeight: "1.2" }}
        >
          {" "}
          Hear it from Our Happy Customers
        </p>

        <p
          className="text-center"
          style={{
            fontSize: "17px",
            margin: "0",
            // fontFamily: 'Inter Medium',
            fontWeight: "500",
            color: "#4b4b59",
          }}
        >
          Customer satisfaction is our ultimate goal. Discover the real
          experiences and satisfaction of our customers. Hear directly from
          those who have <br /> benefited from our services.
        </p>

        <div className="container-fluid mt-5">
          <div className="row">
            <div
              className="col-lg-4 col-md-4 col-sm-12 px-3"
              style={{ overflowY: "scroll", height: "400px" }}
            >
              {(voice_of_customer ?? []).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="row my-2 pt-4 pb-3 px-2"
                    style={{
                      backgroundColor: " rgba(104, 185, 46, .05)",
                      border: "1px solid #002678",
                      borderRadius: "12px",
                    }}
                  >
                    <div className="col-3">
                      <img
                        src={item?.img}
                        alt=""
                        className=""
                        style={{
                          height: "70px",
                          width: "100%",
                          border: "none",
                          borderRadius: "10px",
                        }}
                      ></img>
                    </div>
                    <div className="col-9">
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        {item?.name}
                      </p>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-lg-8 col-md-8 col-sm-12 px-4">
              <img
                src={"/assets/images/vision.jpg"}
                alt=""
                className=""
                style={{
                  height: "400px",
                  width: "100%",
                  border: "none",
                  borderRadius: "10px",
                }}
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5">
        <p className=" heading-text-home mt-2 mb-4 text-center">
          {" "}
          Health Blogs
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => {
              setHealthBlog("recent");
            }}
            className={`${healthBlog == "recent"
              ? "active-health-blog"
              : "in-active-health-blog"
              }`}
          >
            Recent
          </button>

          <button
            onClick={() => {
              setHealthBlog("popular");
            }}
            className={`${healthBlog == "popular"
              ? "active-health-blog"
              : "in-active-health-blog"
              }`}
          >
            Most Popular
          </button>

          <button
            onClick={() => {
              setHealthBlog("trending");
            }}
            className={`${healthBlog == "trending"
              ? "active-health-blog"
              : "in-active-health-blog"
              }`}
          >
            Trending
          </button>
        </div>

        <div className="my-5 container-fluid">
          {healthBlog == "recent" && <RecentBlog />}
          {healthBlog == "popular" && <PopularBlog />}
          {healthBlog == "trending" && <TrendingBlog />}

          <div className="text-center my-4">
            <button
              onClick={() => {
                router.push(`/blog`)
              }}
              className=" card-button-view-all px-4 py-2 "
              style={{ fontSize: "18px", fontWeight: "600" }}
            >
              View All
            </button>
          </div>
        </div>

        <div className="container-fluid">
          <div
            className="container-fluid"
            style={{
              padding: "30px",
              overflow: "hidden",
              borderRadius: "16px",
              background: "linear-gradient(rgb(1, 7, 63), rgb(0, 78, 146))",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "40px",
                margin: "0 0 10px",
                padding: "0",
                fontFamily: "Inter Medium",
              }}
            >
              Can’t find what you’re looking for?
            </h2>

            <div className="mt-4">
              <button className="card-button   mb-4" style={{ borderColor: 'white', color: 'white' }}>
                Contact us on Whatsapp
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2
            style={{
              color: "#002678 ",
              fontSize: " 40px",
              textAlign: "center",
              margin: "0 20%",
              padding: "0 0 50px",
              fontFamily: "Inter Medium",
            }}
          >
            Frequently Asked Questions
          </h2>

          <div className="container-fluid">
            <div style={{ margin: "0 auto" }} className="test_faq">
              {(FaqResponse?.data ?? []).map((item, index) => {
                return <FrequentlyAskQuestion item={item} key={index} />;
              })}
            </div>
          </div>
        </div>

        <div className="">
          <PopularTest />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default TestsComponent;

let voice_of_customer = [
  {
    img: "/assets/images/inovation.jpg",
    name: "Paramjeet Kaur",
    description:
      "Reduced my HbA1c level from 6.7 to 6.1. I am feeling more energetic following the diet plan by Dr B Lal Lab",
  },

  {
    img: "/assets/images/vision.jpg",
    name: "Suchi Shekhar",
    description:
      "Impressed by the cooperative staff, consultants and the overall hospitality by Dr.B.Lal Lab",
  },
  {
    img: "/assets/images/inovation.jpg",
    name: "Paramjeet Kaur",
    description:
      "Reduced my HbA1c level from 6.7 to 6.1. I am feeling more energetic following the diet plan by Dr B Lal Lab",
  },
  {
    img: "/assets/images/inovation.jpg",
    name: "Paramjeet Kaur",
    description:
      "Reduced my HbA1c level from 6.7 to 6.1. I am feeling more energetic following the diet plan by Dr B Lal Lab",
  },
];

let question = [
  {
    question: "How can I download my report from the Dr. B. Lal Lab website ?",
    answer:
      "If you don’t want to search for “medical labs near me” to collect your report in person, you can download it from our website. Login using your registered mobile number and go to the My Report section (Patients > My Report) and download the one you want.",
  },
  {
    question: "How do I find the nearest Dr. B. Lal medical labs ?",
    answer:
      "Instead of a random online search for a “medical laboratory near me”, use the lab locator on our website or app. You can search for a nearby lab using the search option or using your current location.",
  },
  {
    question: "How do I book lab tests online at Dr. B. Lal Lab ?",
    answer:
      "You no longer have to look for a “healthcare laboratory near me” for booking your tests as you can just search for the test you need on our website and book it online. Login or register using your mobile number and choose the tests you wish to book. Choose a suitable time, enter the required details, make the payment, and the test is booked.",
  },
  {
    question: "What are the most commonly performed diagnostic tests ?",
    answer:
      "The list of most commonly performed diagnostics tests is different for different kinds of people and is based on several factors like age, sex, geographical factors, and so on. However, in general, the most common diagnostics tests that have people looking for “medical labs near me” include CBCs, LFTs, KFTs, lipid profile tests, blood glucose tests, thyroid profiles, etc.",
  },
  {
    question: "Why should I choose Dr. B. Lal Lab ?",
    answer:
      "Dr. B. Lal Lab is a reputed BSL-2 diagnostics centre and pathology laboratory, where we provide the best experience and value for your money services to all customers. With more than 31 years of expertise in providing diagnostics services, our fully automated NABL- accredited lab is equipped with the most advanced technologies and is supported by a team of highly skilled and experienced professionals, which is how we guarantee accuracy in every test result. So, instead of looking for “medical labs near me” online, choose Dr. B. Lal Lab.",
  },
];
