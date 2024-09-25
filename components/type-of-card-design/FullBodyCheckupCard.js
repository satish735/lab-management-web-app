
import React from "react";
// import { ReactComponent as inovation } from '@/public/assets/images/inovation.jpg'
import "@/styles/common-card-designs/card_designs.css";
import { useRouter } from "next/navigation";
import Usercart from "@/layouts/layout-components/cart"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const FullBodyCheckupCard = ({ listing, location }) => {
  const router = useRouter();

  const [isopencart, setisopencart] = useState(false)


  const setitem = async (listing) => {


    const storedData = localStorage.getItem('testpackage');
    const parsedData = storedData ? JSON?.parse?.(storedData) : [];
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
                backgroundImage: `Url('${process.env.NEXT_PUBLIC_BUCKET_URL + listing?.image}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

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
                  <p className="card-heading-test text-start truncate">
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

            <div className="d-flex justify-content-between px-1 pb-1">
              <div className="">

                <button className="card-button" onClick={() => { router.push(`/${(location ?? '')?.replace(/\s+/g, '-') ?? 'jaipur'}/health-package/package?id=${listing?._id}`) }}>
                  View Details <span>→</span>
                </button>
              </div>
              <div className=" text-end">
                <button onClick={() => {

                  setitem(listing)
                }} className="card-button-2">
                  Add to Cart <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Usercart isopencart={isopencart} setisopencart={setisopencart} />
    </div>
  );
};

export default FullBodyCheckupCard;
