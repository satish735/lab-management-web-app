import React from "react";
import SvgIcon from "../../home-component/SvgIcon";
import "@/styles/common-card-designs/card_designs.css";
import "../total-test-include/totalTestInclude.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const PackageCardDesign = ({ listing, lg = 6, md = 6 }) => {
  const router = useRouter()

  const setitem = async () => {


    const storedData = localStorage.getItem('testpackage');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    const filterdata = await (parsedData?.item ?? [])?.filter((item) => item?._id === listing._id)

    if ((filterdata ?? [])?.length > 0) {
      toast.error("Already Added")
    } else {
      const dataToStore = { item: parsedData?.item == null || parsedData?.item == []  ? [listing] : [...parsedData?.item, listing] };

      localStorage.setItem('testpackage', JSON.stringify(dataToStore));
      toast.success("Test saved successfully")
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
                <div className="col-8">
                  <p className="card-heading-test">{listing?.name}</p>
                </div>
                <div className="col-4 text-end " style={{}}>
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
                <div className="col-12 text-end">
                  <span
                    className="px-3 py-2"
                    style={{
                      border: "1px solid green",
                      borderRadius: "10px",
                      color: "white",
                      fontWeight: "400",
                      backgroundColor: "green",
                    }}
                  >
                    {" "}
                    {listing?.discountPercentage} % off
                  </span>
                </div>
              </div>

              <hr />

              <div className="row my-2" style={{ color: "#828599" }}>
                <div className="col-6">
                  <div className="row">
                    <p className="col-3 pt-1">
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
                    <p className="col-9 ps-3 " style={{ fontSize: "12px" }}>
                      {(listing?.itemId ?? [])?.length} test included
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="row">
                    <p className="col-3 pt-1">
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
                    <p className="col-9 ps-3 " style={{ fontSize: "12px" }}>
                      Result with in {" "}
                      {listing?.reportGenerationHours ?? ''} hours
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <div className="row">
                <div className="col-6">
                  <button
                    className="card-button-package-card "
                    style={{ fontSize: "13px" }}
                    onClick={() => { router.push(`/jaipur/health-package/${'package'}?id=${listing?._id}`) }}
                  >
                    View Details <span>→</span>
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button onClick={setitem} className="card-button " style={{ fontSize: "13px" }}>
                    Add to Cart <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCardDesign;
