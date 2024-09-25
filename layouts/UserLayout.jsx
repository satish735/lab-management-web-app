'use client'

import { signOut, useSession } from "next-auth/react";
import UserFooter from "./layout-components/UserFooter";
import UserHeader2 from "./layout-components/UserHeader2";
import UserSvg from "./layout-components/UserSvg";
import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '@/styles/globals.css'
const UserLayout = ({ children }) => {

  const session = useSession()
  const router = useRouter()
  var user = session?.data?.user

  console.log("jjjjjjjj", user)
  useEffect(() => {
    switch (session?.status) {
      case "authenticated":
        if (!["user"].includes(user?.role)) {
          signOut({ redirect: true, callbackUrl: '/' });
        }
        else if (!user?.otherDetails) {
          router.push("/sign-up")
        }
        break;
      case "unauthenticated":
        // router.push("/login")
        break;
    }
  }, [session?.status])
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
