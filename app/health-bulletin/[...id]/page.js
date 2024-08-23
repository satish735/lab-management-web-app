"use client";
import React from "react";
import apiRequest from "../../../utils/apiRequest";
const HealthBulitin = ({ params: { id } }) => {
  const bulletinListResponse = apiRequest({
    url: "/api/health-bulletin/list",
    params: {
      pageSize: 20,
      pageNo: id,
    },
  });
  console.log(bulletinListResponse);
  return (
    <div>
      <h1>About Page</h1>
      <p>Data fetched on the server for ID: {id}</p>
      {bulletinListResponse?.status == "success" && (bulletinListResponse?.data ?? []).map((item,index)=>{
        return <div key={index}>{item?.name}</div>
      })}
    </div>
  );
};
export default HealthBulitin;
