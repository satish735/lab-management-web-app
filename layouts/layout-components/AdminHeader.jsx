import Image from "next/image";
// import LeftToggle from "./sidemenu-icons/LeftToggle";

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
        padding: "20px 10px",
        background: "white",
        justifyContent: "space-between",
        zIndex:999
      }}
    >
      {isMobile && (
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
      )}
      <div></div>
      {/* <LeftToggle  /> */}
    </div>
  );
};
export default AdminHeader;
