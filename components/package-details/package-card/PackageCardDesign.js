import React from "react";
import SvgIcon from "../../home-component/SvgIcon";
import "@/styles/common-card-designs/card_designs.css";
import "../total-test-include/totalTestInclude.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Usercart from "@/layouts/layout-components/cart"
import { useEffect, useState } from "react";
const PackageCardDesign = ({ listing, lg = 6, md = 6 }) => {
  const router = useRouter()
  const [isopencart, setisopencart] = useState(false)

  
  const setitem = async () => {


    const storedData = localStorage.getItem('testpackage');
    const parsedData = storedData ? JSON?.parse?.(storedData) : null;
    const filterdata = await (parsedData?.item ?? [])?.filter((item) => item?._id === listing._id)

    if ((filterdata ?? [])?.length > 0) {
      toast.error("This package already exists in your cart")
    } else {
      const dataToStore = { item: parsedData?.item == null || parsedData?.item == [] ? [listing] : [...parsedData?.item, listing] };

      localStorage?.setItem('testpackage', JSON.stringify(dataToStore));
      setisopencart(true)
    }


  }

  return (
    <div
      className={`card-outer-layer-div  col-lg-${lg} col-md-${md} col-sm-12`}
    >
      <div
        className="main-card-border bg-white "
        style={{
          borderRadius: "13px",
          boxShadow: "0px 5px 83px 0px rgba(13, 14, 67, 0.09)",
        }}
      >
        <div className="background-hover" style={{ borderRadius: "13px" }}>
          <div className="w-100  " style={{ width: "100%" }}>
            <div style={{ height: "10px" }}></div>
            <div
              className="card-description"
              style={{ borderRadius: "0px 0px 13px 13px" }}
            >
              <div className="row">
                <div className="col-12">
                  <p className="card-heading-test truncate">{listing?.name}</p>
                </div>

                <div className="col-5 ">
                  <span
                    className=" "
                    style={{
                      border: "1px solid green",
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: "400",
                      backgroundColor: "green",
                      padding:'5px 10px 5px 10px'
                    }}
                  >
                    {" "}
                    {listing?.discountPercentage} % off
                  </span>
                </div>
                <div className="col-7 text-end " style={{}}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "gray",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    ₹ {listing?.rate}
                  </span>

                  <span style={{ color: "green", fontWeight: "500" }}>
                    {" "}
                    ₹ {listing?.totalMrp}
                  </span>
                </div>

              </div>

              <hr />

              <div className="d-flex  gap-4 my-2" style={{ color: "#828599" }}>
                <div className="">
                  <div className="d-flex  gap-1">
                    <p className=" pt-1">
                      <span
                        className="  p-2"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#21cdad",

                        }}
                      >
                        <SvgIcon setColor={"white"} />
                      </span>
                    </p>
                    <p className="ps-2 " style={{ fontSize: "12px" }}>
                      {(listing?.itemId ?? [])?.length} test included
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="d-flex  ">
                    <p className=" pt-1">
                      <span
                        className="  p-2"
                        style={{
                          borderRadius: "5px",
                          backgroundColor: "#21cdad",
                        }}
                      >
                        <SvgIcon setColor={"white"} />
                      </span>
                    </p>
                    <p className=" ps-2 " style={{ fontSize: "12px" }}>
                      Result within {" "}
                      {listing?.reportGenerationHours ?? ''} hours
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <div className="">
                  <button
                    className="card-button "
                    style={{ fontSize: "13px" }}
                    onClick={() => { router.push(`/jaipur/health-package/${'package'}?id=${listing?._id}`) }}
                  >
                    View Details <span>→</span>
                  </button>
                </div>
                <div className=" text-end">
                  <button onClick={setitem} className="card-button " style={{ fontSize: "13px" }}>
                    Add to Cart <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Usercart isopencart={isopencart} setisopencart={setisopencart} />
    </div>
  );
};

export default PackageCardDesign;
