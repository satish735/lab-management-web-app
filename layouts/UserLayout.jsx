"use client"

import UserFooter from "./layout-components/UserFooter";
import UserHeader2 from "./layout-components/UserHeader2";
import UserSvg from "./layout-components/UserSvg";
import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
import "@/styles/globals.css";

const UserLayout = ({ children }) => {
  return (
    <>
      <div className='position-relative'>

        <UserHeader2 />
        <main
          style={{
            overflow: "visible !important",
          }}
        >
          {children}
        </main>
        <UserFooter />
        <UserSvg />

        <PhoneViewSlide />

      </div>

    </>
  );
};

export default UserLayout;
