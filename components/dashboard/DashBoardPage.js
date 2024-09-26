"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import InputMultipleSelect from "../formInput/select/InputMultipleSelect";
import { FormGroup } from "reactstrap";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DashboardCard from "./DashboardCard";
import DashBoardBookings from "./DashBoardBookings";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import transformErrorDefault from "@/utils/transformErrorDefault";
const DashBoardPage = () => {
  const session = useSession();
  var userCenters = session?.data?.user?.centers;
  var defaultCenter = session?.data?.user?.currentCenter;
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [selectedRangeValues, setSelectedRangeValues] = useState();
  console.log(session?.data?.user);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 1);
  const [isCalled,setIsCalled]=useState(false)
  useEffect(() => {
    if (defaultCenter && !isCalled) {
      setIsCalled(true)
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
  const [getDashBoardCardResponse, getDashBoardCardHandler] = useAPI(
    {
      url: "/dashboard/card",
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
      getDashBoardCardHandler({
        body: {
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
  }, [selectedCenters, selectedRangeValues]);
  var defaultCardValue = {
    total: "0",
    isIncrease: true,
    percentage: "0",
    today_count: "0",
  };
  var bookingCard = getDashBoardCardResponse?.data?.booking ?? defaultCardValue;
  var patientCard = getDashBoardCardResponse?.data?.patient ?? defaultCardValue;
  var transactionCard =
    getDashBoardCardResponse?.data?.transaction ?? defaultCardValue;
  var homeCollectionCard =
    getDashBoardCardResponse?.data?.homecollection ?? defaultCardValue;
  return (
    <>
      <div className="admin-content-box">
        <h1 className="main-heading">
          Welcome, <strong>{session?.data?.user?.name}</strong>!
        </h1>
        <p className="sub-heading">
          Get familiar with the dashboard, here are some ways to get started.
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
      <div className="row m-0 p-0 pb-2">
        <DashboardCard
          paddingClass={"pe-md-2"}
          heading="Bookings"
          total={
            getDashBoardCardResponse?.fetching ? "..." : bookingCard?.total
          }
          isIncrease={
            getDashBoardCardResponse?.fetching ? false : bookingCard?.isIncrease
          }
          percentage={
            getDashBoardCardResponse?.fetching ? ".." : bookingCard?.percentage
          }
          description={`Todays count : ${
            getDashBoardCardResponse?.fetching ? ".." : bookingCard?.today_count
          }`}
        />
        <DashboardCard
          paddingClass={"pe-lg-2"}
          heading="Patients"
          total={
            getDashBoardCardResponse?.fetching ? "..." : patientCard?.total
          }
          isIncrease={
            getDashBoardCardResponse?.fetching ? false : patientCard?.isIncrease
          }
          percentage={
            getDashBoardCardResponse?.fetching ? ".." : patientCard?.percentage
          }
          description={`Todays count : ${
            getDashBoardCardResponse?.fetching ? ".." : patientCard?.today_count
          }`}
        />
        <DashboardCard
          paddingClass={"pe-md-2"}
          heading="Transactions"
          total={
            getDashBoardCardResponse?.fetching ? "..." : transactionCard?.total
          }
          isIncrease={
            getDashBoardCardResponse?.fetching
              ? false
              : transactionCard?.isIncrease
          }
          percentage={
            getDashBoardCardResponse?.fetching
              ? ".."
              : transactionCard?.percentage
          }
          description={`Todays count : ${
            getDashBoardCardResponse?.fetching ? ".." : transactionCard?.today_count
          }`}
        />
        <DashboardCard
          heading="Home Collections"
          total={
            getDashBoardCardResponse?.fetching
              ? "..."
              : homeCollectionCard?.total
          }
          isIncrease={
            getDashBoardCardResponse?.fetching
              ? false
              : homeCollectionCard?.isIncrease
          }
          percentage={
            getDashBoardCardResponse?.fetching
              ? ".."
              : homeCollectionCard?.percentage
          }
          description={`Todays count : ${
            getDashBoardCardResponse?.fetching ? ".." : homeCollectionCard?.today_count
          }`}
        />
      </div>
      <DashBoardBookings />
    </>
  );
};

export default DashBoardPage;
