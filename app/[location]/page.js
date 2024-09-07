import CarousalSlider from "@/components/CarousalSlider";
import FullBodyCheckup from "@/components/home-component/full-body-checkup/FullBodyCheckup";
import TestsComponent from "@/components/home-component/tests-component/TestsComponent";
import MainBanner from "@/components/main-banner/MainBanner.jsx";
import PaginationListComponent from "@/components/project-main-component/pagination-component/Pagination";
import UserLayout from "@/layouts/UserLayout";
import { getSession } from "next-auth/react";

const Home = async () => {
    const session = await getSession();
    console.log(session);


    return (
        <UserLayout>
            <MainBanner />
            <div className="midbox-inner mt-3">
                <FullBodyCheckup />
            </div>
            <div className="">
                <TestsComponent />
            </div>

        </UserLayout>
    );
};

export default Home;
