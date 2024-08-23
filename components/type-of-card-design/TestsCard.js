import React from "react";
import "@/styles/common-card-designs/card_designs.css";
import { useRouter } from "next/navigation";

const TestsCard = () => {
  const router=useRouter()
  return (
    <div className="card-outer-layer-div " onClick={()=>{
      router.push('/medical-condition/fever')
    }}>
      <div className="main-tests-card-box">
        <div className=" main-tests-card-box">
          <img
            src={"/assets/images/condition-card-icon.png"}
            alt=""
            className=""
            // style={{ height: "80px", width: "80px", border: "none" }}
          />
        </div>
        <p className="text-center main-tests-card-text">Hair Fall</p>
      </div>
    </div>
  );
};

export default TestsCard;
