"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import InputMultipleSelect from "../formInput/select/InputMultipleSelect";
import { FormGroup } from "reactstrap";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import AreaChartComponent from "./AreaChartComponent";
import "./Analytics.css";
import transformErrorDefault from "@/utils/transformErrorDefault";
import useAPI from "@/hooks/useAPI";
const AnalyticsPage = () => {
  const session = useSession();
  var userCenters = session?.data?.user?.centers;
  var defaultCenter = session?.data?.user?.currentCenter;
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [selectedRangeValues, setSelectedRangeValues] = useState();
  console.log(session?.data?.user);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 1);
  const [isCalled, setIsCalled] = useState(false);
  useEffect(() => {
    if (defaultCenter) {
      setIsCalled(true);
      setSelectedCenters([
        { value: defaultCenter?._id, label: defaultCenter?.centre },
      ]);
      const today = new Date();
      // Calculate the start date (1 year ago)
      const startDate = new Date(today.setFullYear(today.getFullYear() - 1));
      // Convert to DateObject format required by react-multi-date-picker
      const startDateObject = new DateObject(startDate);
      const endDateObject = new DateObject(new Date());
      setSelectedRangeValues([startDateObject, endDateObject]);
    }
  }, [defaultCenter]);
  console.log(selectedRangeValues);
  const [selectedTab, setSelectedTab] = useState("booking");
  const [getChartResponse, getChartHandler] = useAPI(
    {
      url: "/dashboard/analytics",
      method: "post",
    },
    (e) => {
      return e;
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while Getting packages!", e)
      );
      return e;
    }
  );

  useEffect(() => {
    if (Array.isArray(selectedCenters)) {
      getChartHandler({
        body: {
          selectedTab,
          selectedCenter: selectedCenters.map((item) => item?.value),
          start:
            Array.isArray(selectedRangeValues) && selectedRangeValues.length > 0
              ? selectedRangeValues[0]?.format?.()
              : null,
          end:
            Array.isArray(selectedRangeValues) && selectedRangeValues.length > 1
              ? selectedRangeValues[1]?.format?.()
              : null,
        },
      });
    }
  }, [selectedCenters, selectedRangeValues, selectedTab]);
  return (
    <>
      <div className="admin-content-box">
        <h1 className="main-heading">Analytics Page</h1>
        <p className="sub-heading">
          Visualize your information in beautiful way.
        </p>
      </div>
      <div className="admin-content-box mt-1">
        <div className="row">
          <div className="col-md-4 col-12">
            <InputMultipleSelect
              options={userCenters?.map?.((item) => {
                return {
                  value: item?._id,
                  label: item?.centre + ", " + item?.city,
                };
              })}
              value={selectedCenters}
              setValue={setSelectedCenters}
              hasSelectAll={true}
              label="Center Options"
              formGroupStyle={{ marginBottom: "0px !important" }}
            />
          </div>
          <div className="col-md-8 col-12">
            <FormGroup style={{ marginBottom: "0px !important" }}>
              <label
                className="ml-1  text-truncate w-100 "
                htmlFor={"multi-range-picker-slots"}
                style={{
                  userSelect: "none",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#0F0F0F",
                }}
              >
                Select Date Ranges <span className="text-danger"></span>
              </label>
              <DatePicker
                numberOfMonths={2}
                inputClass="form-control w-100"
                style={{ width: "100%" }}
                containerStyle={{
                  width: "100%",
                }}
                name="multi-range-picker-slots"
                className="rmdp-mobile"
                value={selectedRangeValues}
                range
                headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                mobileButtons={[
                  {
                    label: "RESET",
                    type: "button",
                    className: "rmdp-button rmdp-action-button",
                    onClick: () => setSelectedRangeValues(null),
                  },
                ]}
                onChange={([start, end]) => {
                  if (start && end) {
                    setSelectedRangeValues([start, end]);
                  }
                }}
                maxDate={maxDate}
              />
            </FormGroup>
          </div>
        </div>
      </div>
      <div className="w-100 ">
        <span
          className={`chart-option-tab ${
            "booking" == selectedTab ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedTab("booking");
          }}
        >
          Bookings
        </span>
        <span
          className={`chart-option-tab ${
            "transaction" == selectedTab ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedTab("transaction");
          }}
        >
          Transactions
        </span>
        <span
          className={`chart-option-tab ${
            "patient" == selectedTab ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedTab("patient");
          }}
        >
          Patients
        </span>
        <span
          className={`chart-option-tab ${
            "collection" == selectedTab ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedTab("collection");
          }}
        >
          Home Collections
        </span>
      </div>
      <div className="row m-0 p-0 pb-2 admin-content-box">
        <AreaChartComponent apiData={getChartResponse?.data} />
      </div>
    </>
  );
};

export default AnalyticsPage;
