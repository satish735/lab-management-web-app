import Image from "next/image";
// import LeftToggle from "./sidemenu-icons/LeftToggle";

import { FaIndent, FaExpand, FaOutdent } from "react-icons/fa6";

import "./AdminHeader.css"
const AdminHeader = ({
  isMobile,
  mobileToggle,
  collapsed,
  collapsedToggle,
}) => {
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
      {isMobile && (

        <FaIndent
          onClick={mobileToggle}
          className="header-button-icon" />
      )}
      {collapsed && !isMobile && (
        <FaIndent
          onClick={collapsedToggle}
          className="header-button-icon" />

      )}
      {!collapsed && !isMobile && (
        <FaOutdent onClick={collapsedToggle}
          className="header-button-icon" />

      )}
      <div>
        <FaExpand className="header-button-icon" />
      </div>
      {/* <LeftToggle  /> */}
    </div>
  );
};
export default AdminHeader;
