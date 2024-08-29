
import React from "react";
// import { ReactComponent as inovation } from '@/public/assets/images/inovation.jpg'
import "@/styles/common-card-designs/card_designs.css";
import { useRouter } from "next/navigation";

const FullBodyCheckupCard = ({ listing }) => {
  const router = useRouter();

  console.log(listing)
  return (
    <div className="card-outer-layer-div">
      <div className="main-card-border" style={{}}>
        <div
          className="w-100 bg-white"
          style={{
            width: "100%",
            border: "none",
            borderRadius: "12px",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
          }}
        >
          <div
            className=""
            style={{
              height: "250px",
              width: "100%",
              border: "none",
            }}
          >
            {/* process.env.NEXT_PUBLIC_BUCKET_URL + listing?.image */}
            {/* <img src={'/assets/images/logo.jpg'}/> */}
            {/*div  for image */}

            <div
              // src={process.env.NEXT_PUBLIC_BUCKET_URL + 'public/3bdf5e58-47ce-d0fa-526d-1859ea3e77f7.png'}
              alt=""
              className=""
              style={{
                height: "250px",
                width: "100%",
                border: "none",
                borderRadius: "12px 12px 0 0 ",
                backgroundImage:`Url('/assets/images/PackagesBanner.jpg')`,
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover',
                 
              }}
            />
          </div>

          <div
            className="card-description"
            style={{
              borderRadius: "0px 0px 12px 12px",
              background: " linear-gradient(153deg, #e9f7f6, #f1f4fa)",
            }}
          >
            <div className="row">
              <div className="col-8">
                <div>
                  <p className="card-heading-test text-start">
                    {listing?.name}
                  </p>
                </div>
                <p
                  className="mb-4"
                  style={{
                    color: "#828599",
                    fontSize: "16px",
                  }}
                >
                  <span>•</span>{" "}
                  <span>{(listing?.itemId ?? [])?.length ?? ''} Test Include</span>
                </p>
              </div>
              <div className="col-4 mb-1 text-end" style={{ color: "#828599" }}>
                <span style={{ fontSize: "10px" }}>
                  <del> ₹ {listing?.rate}</del>
                </span>
                <span> ₹ {listing?.totalMrp}</span>
                <p className="mt-3">
                  <span className="dicount-off-percentage">
                    {listing?.discountPercentage}% off
                  </span>
                </p>
              </div>
            </div>

            <div className="row px-1 pb-1">
              <div className="col-6">

                <button className="card-button" onClick={() => { router.push( `/jaipur/health-package/package?id=${listing?._id}` ) }}>
                  View Details <span>→</span>
                </button>
              </div>
              <div className="col-6 text-end">
                <button className="card-button-2">
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

export default FullBodyCheckupCard;
