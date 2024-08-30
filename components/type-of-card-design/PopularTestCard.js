import React from "react";
import SvgIcon from "../home-component/SvgIcon";
import { useRouter } from "next/navigation";

const PopularTestCard = ({ listing }) => {
  const router = useRouter();

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


            <div
              // src={process.env.NEXT_PUBLIC_BUCKET_URL + 'public/3bdf5e58-47ce-d0fa-526d-1859ea3e77f7.png'}
              alt=""
              className=""
              style={{
                height: "200px",
                width: "100%",
                border: "none",
                borderRadius: "10px 10px 0 0 ",
                backgroundImage: `Url('/assets/images/TestBanner.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover',
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
                <p className="card-heading-test">{listing?.name}</p>
              </div>
              <div className="col-3 text-end">
                <p> ₹ {listing?.rate}</p>
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
                    {(listing?.observation ?? [])?.length} Observation included
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
                      Result with in{" "}
                    {listing?.reportGenerationHours} hours
                  </p>
                </div>
              </div>
            </div>

            <hr />

            <div className="row px-1 pb-1">
              <div className="col-6">
                <button className="card-button " style={{ fontSize: "13px" }} onClick={() => { router.push(`/jaipur/lab-test/test?id=${listing?._id}`) }}>
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
