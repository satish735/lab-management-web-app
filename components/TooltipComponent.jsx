"use client";
import React from "react";
import { Tooltip } from "react-tooltip";

const TooltipComponent = ({ id = "my-tooltip" }) => {
  return <Tooltip id={id} style={{zIndex:"10000"}} />;
};

export default TooltipComponent;
