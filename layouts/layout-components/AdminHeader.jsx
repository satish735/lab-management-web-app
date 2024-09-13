import Image from "next/image";
// import LeftToggle from "./sidemenu-icons/LeftToggle";

import { FaIndent, FaExpand, FaOutdent, FaSort, FaArrowRightToBracket } from "react-icons/fa6";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";

import "./AdminHeader.css"
import useFullscreen from "@/hooks/useFullScreen";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";
const AdminHeader = ({
  isMobile,
  mobileToggle,
  collapsed,
  collapsedToggle,
}) => {

  const { isFullscreen, toggleFullscreen } = useFullscreen()
  var name = "T R"
  var image_div_styling = {
    backgroundImage: `url('https://ui-avatars.com/api?background=random&name=${name}')`
  }
  return (
    <div
      style={{
        position: "sticky",
        top: "5px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "calc(100% - 10px)",
        height: "64px",
        left: "5px",
        display: "flex",
        alignItems: "center",
        padding: "20px 15px",
        background: "white",
        justifyContent: "space-between",
        verticalAlign: "center",
        zIndex: 99
      }}
    >
      {/* {isMobile && (
        <Image
          width={35}
          height={35}
          src={"/assets/icons/right-toggle-header.svg"}
          onClick={mobileToggle}
          className="header-toggle-icon"
        />
      )}
      {collapsed && !isMobile && (
        <Image
          width={35}
          height={35}
          src={"/assets/icons/right-toggle-header.svg"}
          onClick={collapsedToggle}
          className="header-toggle-icon"
        />
      )}
      {!collapsed && !isMobile && (
        <Image
          width={35}
          height={35}
          src={"/assets/icons/left-toggle-header.svg"}
          onClick={collapsedToggle}
          className="header-toggle-icon"
        />
      )} */}
      {
        isMobile && (
          <FaIndent
            onClick={mobileToggle}
            className="header-button-icon" />
        )
      }
      {
        collapsed && !isMobile && (
          <FaIndent
            onClick={collapsedToggle}
            className="header-button-icon" />

        )
      }
      {
        !collapsed && !isMobile && (
          <FaOutdent onClick={collapsedToggle}
            className="header-button-icon" />

        )
      }
      <div className="d-flex align-items-center gap-3">
        {isFullscreen ? <BsFullscreenExit className="header-button-icon" onClick={toggleFullscreen} /> : <BsArrowsFullscreen className="header-button-icon" onClick={toggleFullscreen} />}
        {/* <div style={image_div_styling} className="profile-icon-button"></div> */}
        <ProfileComponent />
      </div>
      {/* <LeftToggle  /> */}
    </div >
  );
};
export default AdminHeader;
const ProfileComponent = () => {
  const session = useSession()
  const userDetails = session?.data?.user
  console.log(userDetails)
  const router = useRouter();
  var name = userDetails?.name
  var role = userDetails?.role
  var center_name = "Anith Path Lab"
  var city = "jaipur"
  var image_div_styling = {
    backgroundImage: `url('https://ui-avatars.com/api?background=random&name=${name}')`
  }
  const logoutHandler = async (e) => {
    e.stopPropagation();
    try {
      await signOut({ redirect: true, callbackUrl: '/login/admin' });
    } catch (err) {
      toast.error(err?.message)
      console.error('Logout error:', err);
    }
  }
  const [selectCenterIsOpen, setSelectedCenterIsOpen] = useState("")

  return <UncontrolledDropdown style={{ height: "40px" }}>
    <DropdownToggle
      style={image_div_styling}
      className="profile-icon-button"
      tag="span"
    ></DropdownToggle>
    <DropdownMenu className="profile-menu">
      <div className="profile-center-section mb-2">
        <div className="center-details">
          <h1 className="name  text-capitalize">{center_name}</h1>
          <p className="text-capitalize city">{city}</p>
          <FaSort className="change-center-icon" />
        </div>
      </div>
      <div className="d-flex  profile-option" onClick={() => { router.push("/admin/profile") }}>
        <div style={image_div_styling} className="image"></div>
        <div className="user-details">
          <h1 className="name  text-capitalize">{name}</h1>
          <p className="text-capitalize role">{role}</p>
        </div>
        <div className="logout-div" onClick={logoutHandler}><FaArrowRightToBracket className="logout-icon" /> Logout</div>
      </div>

    </DropdownMenu>
  </UncontrolledDropdown>
}
