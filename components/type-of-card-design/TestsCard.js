import React from "react";
import "@/styles/common-card-designs/card_designs.css";
import { useRouter } from "next/navigation";

const TestsCard = ({ listing,type }) => {
  const router = useRouter()
  console.log(listing);

  return (
    <div className="card-outer-layer-div " onClick={() => {
      router.push(`/${type}/${listing?.name}?id=${listing?._id}`)
    }}>
      <div className="main-tests-card-box">
        <div className=" main-tests-card-box">
          

          <div
            // src={process.env.NEXT_PUBLIC_BUCKET_URL + 'public/3bdf5e58-47ce-d0fa-526d-1859ea3e77f7.png'}
            alt=""
            className=""
            style={{
              height: "120px",
              width: "100%",
              border: "none",
              borderRadius: "10px 10px 0 0 ",
              // backgroundImage: `Url(${process.env.NEXT_PUBLIC_BUCKET_URL + listing?.image })`,
              backgroundImage: `Url(/assets/images/condition-card-icon.png)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto'
            }}
          />
        </div>
        <p className="text-center main-tests-card-text">{listing?.name}</p>
      </div>
    </div>
  );
};

export default TestsCard;
