import Image from "next/image";
// import LeftToggle from "./sidemenu-icons/LeftToggle";

import { FaIndent, FaExpand, FaOutdent, FaSort, FaArrowRightToBracket, FaCircleCheck, FaCircle } from "react-icons/fa6";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";

import "./AdminHeader.css"
import useFullscreen from "@/hooks/useFullScreen";
import { DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, UncontrolledDropdown } from "reactstrap";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import transformErrorDefault from "@/utils/transformErrorDefault";
const AdminHeader = ({
  isMobile,
  mobileToggle,
  collapsed,
  collapsedToggle,
}) => {

  const { isFullscreen, toggleFullscreen } = useFullscreen()

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
  const router = useRouter();
  var name = userDetails?.name
  var role = userDetails?.role
  var center_name = userDetails?.currentCenter?.centre
  var city = userDetails?.currentCenter?.city
  var image_div_styling = {
    backgroundImage: userDetails?.image ? `url('${process.env.NEXT_PUBLIC_BUCKET_URL + userDetails?.image}')` : `url('https://ui-avatars.com/api?background=random&name=${name}')`
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
  const [chekAndUpdateCenterDetailsRespponse, chekAndUpdateCenterDetailsHandler] = useAPI(
    {
      url: "/adminlogin/update-user-center",
      method: "get",
      isAsync: true
    },
    async (e) => {
      var eUserDetails = e?.user
      var toUpdate = {
        id: eUserDetails?._id,
        name: eUserDetails?.name,
        email: eUserDetails?.email,
        role: eUserDetails?.role,
        phone: eUserDetails?.phone,
        centers: e?.centers,
        currentCenter: e?.currentCenter,
        image: eUserDetails?.image
      }
      await session.update({ ...(userDetails ?? {}), ...toUpdate })
      return e
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong updating selected Center!",
        e
      ));
      return e
    }
  );
  const [isSessionUpdated, setSessionUpdated] = useState(false)
  useEffect(() => {
    if (session?.data?.user?.id && !isSessionUpdated) {
      setSessionUpdated(true)
      chekAndUpdateCenterDetailsHandler({ params: { user_id: session?.data?.user?.id } })
    }
  }, [
    session
  ])
  const [selectCenterModal, setSelectedCenterModal] = useState(false)
  const [selectedCenterId, setSelectedCenterId] = useState(null)
  const [updateSelectedCenterResponse, updateSelectedCenterHandler] = useAPI(
    {
      url: `/adminlogin/update-user-center?user_id=${userDetails?.id}&center_id=${selectedCenterId
        }`,
      method: "post",
      isAsync: true
    },
    async (e) => {
      var toUpdate = {
        currentCenter: e?.currentCenter,
      }
      await session.update({ ...(userDetails ?? {}), ...toUpdate })
      toast.success("Succesfully updated selected Center.")
      setSelectedCenterId(null)
      setSelectedCenterModal(false)
      return e
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong updating Selected Center!",
        e
      ));
      return e
    }
  );
  const modalSubmitHandler = async () => {
    if (!userDetails?.id) {
      toast.error("User Id not found to assign Center!")
      return
    }
    if (!selectedCenterId) {
      toast.error("Selected Center from list before continuing!")
      return
    }

    await updateSelectedCenterHandler()
  }
  return <><UncontrolledDropdown style={{ height: "40px" }}>
    <DropdownToggle
      style={image_div_styling}
      className="profile-icon-button"
      tag="span"
    ></DropdownToggle>
    <DropdownMenu className="profile-menu">
      <div className="profile-center-section mb-2">
        <div className="center-details" onClick={() => {
          setSelectedCenterId(userDetails?.currentCenter?._id)
          setSelectedCenterModal(true)
        }}>
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

    {selectCenterModal && <Modal size="md" isOpen={selectCenterModal} toggle={() => { setSelectedCenterModal(false) }} className=''>
      <ModalHeader toggle={() => { setSelectedCenterModal(false) }} className='py-2'>
        <h1 className="modal-main-heading">Change Selected Center</h1>
        <p className="modal-sub-heading">It will update the selected center in system.</p>
      </ModalHeader>
      <ModalBody className='py-2 '>
        {userDetails?.centers?.map?.(centerItem => {
          return <div className="profile-center-section mb-2"><div className="center-details"
            onClick={() => {
              if (selectedCenterId == centerItem?._id) {
                setSelectedCenterId(null)
              }
              else {
                setSelectedCenterId(centerItem?._id)
              }
            }}
          >
            <h1 className="name  text-capitalize">{centerItem?.centre}</h1>
            <p className="text-capitalize city">{centerItem?.city}</p>
            {selectedCenterId == centerItem?._id ? <FaCircleCheck className="change-center-icon selected" /> : <FaCircle className="change-center-icon" />}
          </div></div>
        })}
      </ModalBody>
      <ModalFooter className=''>
        <button className="me-2 btn btn-theme secondary-outline" disabled={updateSelectedCenterResponse?.fetching} onClick={() => { setSelectedCenterModal(false) }}>Cancel</button>
        <button style={{ minWidth: "100px", textAlign: "center" }} className="me-2 btn btn-theme primary" onClick={modalSubmitHandler} disabled={updateSelectedCenterResponse?.fetching}>
          {(updateSelectedCenterResponse?.fetching) ? (
            <Spinner size={"sm"} />
          ) : (
            "Select Center"
          )}

        </button>
      </ModalFooter>
    </Modal>}
  </>
}
