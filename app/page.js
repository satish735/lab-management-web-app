"use client"
import PhoneViewSlide from "@/components/bottom-phone-design/PhoneViewSlide";
import CarousalSlider from "@/components/CarousalSlider";
import FullBodyCheckup from "@/components/home-component/full-body-checkup/FullBodyCheckup";
import TestsComponent from "@/components/home-component/tests-component/TestsComponent";
import MainBanner from "@/components/main-banner/MainBanner.jsx";
import PaginationListComponent from "@/components/project-main-component/pagination-component/Pagination";
import UserLayout from "@/layouts/UserLayout";
import { getSession } from "next-auth/react";
const Home =() => {
  return (
    <div className='position-relative'>

      <UserLayout>
        <MainBanner />
        <div className="midbox-inner mt-3">
          <FullBodyCheckup />
        </div>
        <div className="">
          <TestsComponent />
        </div>

        {/* <PhoneViewSlide /> */}

      </UserLayout>
    </div>

  );
};

export default Home;
