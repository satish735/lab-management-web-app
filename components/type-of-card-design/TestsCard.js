import React from "react";
import "@/styles/common-card-designs/card_designs.css";
import { useRouter } from "next/navigation";

const TestsCard = ({ listing, type }) => {
  const router = useRouter()
 
  return (
    <div className="card-outer-layer-div " onClick={() => {
      router.push(`/${type}/${listing?.name}?id=${listing?._id}&${(type==='body-part' ? 'part':'disease')}=${listing?.name}`)
    }} style={{height:'100%'}}>
      <div className="main-tests-card-box">
        <div className="mx-auto my-auto  gradient-background-shade" style={{paddingTop:'20px',borderRadius:'50%' ,width:'100px',height:'100px'}}>
          {/* <div > */}

            <div
              // src={process.env.NEXT_PUBLIC_BUCKET_URL + 'public/3bdf5e58-47ce-d0fa-526d-1859ea3e77f7.png'}
              alt=""
              className="mx-auto my-auto "
              style={{
                height: "60px",
                width: "60px",
                border: "none",
                borderRadius: "50% ",
                // backgroundImage: `Url(${process.env.NEXT_PUBLIC_BUCKET_URL + listing?.image })`,
                backgroundImage: `Url(/assets/images/condition-card-icon.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'

              }}
            ></div>

          {/* </div> */}


        </div>
        <p className="text-center main-tests-card-text" style={{minHeight:'30px'}}>{listing?.name}</p>
      </div>
    </div>
  );
};

export default TestsCard;
