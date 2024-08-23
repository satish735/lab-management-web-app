import React from "react";
import SvgIcon from "../home-component/SvgIcon";

const PopularTestCard = ({ listing }) => {
  return (
    <div className="card-outer-layer-div">
      <div className="main-card-border">
        <div
          className="w-100  "
          style={{
            width: "100%",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
          }}
        >
          <div
            className=""
            style={{
              height: "200px",
              width: "100%",
              border: "none",
              borderRadius: "10px",
            }}
          >
            {/*div  for image */}
            <img
              src={"/assets/images/temp/img3.jpg"}
              alt=""
              className=""
              style={{
                height: "200px",
                width: "100%",
                border: "none",
                borderRadius: "10px 10px 0 0",
              }}
            />
          </div>

          <div
            className="card-description"
            style={{
              borderRadius: "0px 0px 10px 10px",
              background: " linear-gradient(153deg, #e9f7f6, #f1f4fa)",
            }}
          >
            <div className="row">
              <div className="col-9">
                <p className="card-heading-test">{listing?.test_name}</p>
              </div>
              <div className="col-3 text-end">
                <p> ₹ {listing?.test_price}</p>
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
                        backgroundColor: "rgb(32 135 115 / 14%)",
                      }}
                    >
                      <SvgIcon />
                    </span>
                  </p>
                  <p className="col-9 ps-3 " style={{ fontSize: "12px" }}>
                    {listing?.no_of_observation} Observation included
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
                        backgroundColor: "rgb(32 135 115 / 14%)",
                      }}
                    >
                      <SvgIcon />
                    </span>
                  </p>
                  <p className="col-9 ps-3 " style={{ fontSize: "12px" }}>
                    {listing?.no_of_observation}Result with in{" "}
                    {listing?.no_of_hours} hours
                  </p>
                </div>
              </div>
            </div>

            <hr />

            <div className="row px-1 pb-1">
              <div className="col-6">
                <button className="card-button " style={{ fontSize: "13px" }}>
                  View Details <span>→</span>
                </button>
              </div>
              <div className="col-6 text-end">
                <button className="card-button-2 " style={{ fontSize: "13px" }}>
                  Add to Cart <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularTestCard;
