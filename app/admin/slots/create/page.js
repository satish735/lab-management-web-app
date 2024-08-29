"use client";

import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import moment from "moment";
import { Spinner } from "reactstrap";
import transformErrorDefault from "@/utils/transformErrorDefault";
import useInputComponent from "@/hooks/useInputComponent";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputSelect from "@/components/formInput/select/InputSelect";

export default function Home() {
  const router = useRouter();

  const CenterName = useInputComponent("");
  const CenterNameValidater = (value) => {
    if (value === "" || !value) {
      CenterName.setFeedbackMessage("Field required!");
      CenterName.setMessageType("error");
      return false;
    }
    CenterName.setFeedbackMessage("");
    CenterName.setMessageType("none");
    return true;
  };

  const LabOpenTime = useInputComponent("");
  const LabOpenTimeValidater = (value) => {
    if (value === "" || !value) {
      LabOpenTime.setFeedbackMessage("Field required!");
      LabOpenTime.setMessageType("error");
      return false;
    }
    LabOpenTime.setFeedbackMessage("");
    LabOpenTime.setMessageType("none");
    return true;
  };

  const LongitudeInput = useInputComponent("");
  const LongitudeInputValidater = (value) => {
    if (value === "" || !value) {
      LongitudeInput.setFeedbackMessage("Field required!");
      LongitudeInput.setMessageType("error");
      return false;
    }
    LongitudeInput.setFeedbackMessage("");
    LongitudeInput.setMessageType("none");
    return true;
  };

  const LatitudeInput = useInputComponent("");
  const LatitudeInputValidater = (value) => {
    if (value === "" || !value) {
      LatitudeInput.setFeedbackMessage("Field required!");
      LatitudeInput.setMessageType("error");
      return false;
    }
    LatitudeInput.setFeedbackMessage("");
    LatitudeInput.setMessageType("none");
    return true;
  };
  const CityInput = useInputComponent("");
  const CityInputValidater = (value) => {
    if (value === "" || !value) {
      CityInput.setFeedbackMessage("Field required!");
      CityInput.setMessageType("error");
      return false;
    }
    CityInput.setFeedbackMessage("");
    CityInput.setMessageType("none");
    return true;
  };
  const StateInput = useInputComponent("");
  const StateInputValidater = (value) => {
    if (value === "" || !value) {
      StateInput.setFeedbackMessage("Field required!");
      StateInput.setMessageType("error");
      return false;
    }
    StateInput.setFeedbackMessage("");
    StateInput.setMessageType("none");
    return true;
  };
  const [stateListResponse, StateListHandler] = useAPI(
    {
      url: "/states/in",
      method: "get",
      sendImmediately: true,
    },
    (e) => {
      return e?.data.map((stateItem) => {
        return { label: stateItem?.name, value: stateItem?.state_code };
      });
    },
    (e) => {
      toast.error(
        transformErrorDefault(
          "Something went wrong while Loading State List!",
          e
        )
      );
      return e;
    }
  );
  const [cityListResponse, CityListHandler] = useAPI(
    {
      url: `/cities/${StateInput?.enteredValue}`,
      method: "get",
    },
    (e) => {
      return e?.data.map((cityItem) => {
        return { label: cityItem?.name, value: cityItem?.name };
      });
    },
    (e) => {
      toast.error(
        transformErrorDefault(
          "Something went wrong while Loading City List!",
          e
        )
      );
      return e;
    }
  );
  useEffect(() => {
    if (StateInput?.enteredValue && StateInput?.enteredValue != "") {
      console.log(StateInput?.enteredValue);
      CityListHandler({
        url: `/cities/${StateInput?.enteredValue}`,
      });
    }
  }, [StateInput?.enteredValue]);
  const EmailInput = useInputComponent("");
  const EmailInputValidater = (value) => {
    if (value === "" || !value) {
      EmailInput.setFeedbackMessage("Field required!");
      EmailInput.setMessageType("error");
      return false;
    }
    EmailInput.setFeedbackMessage("");
    EmailInput.setMessageType("none");
    return true;
  };
  const ContactInput = useInputComponent("");
  const ContactInputValidater = (value) => {
    if (value === "" || !value) {
      ContactInput.setFeedbackMessage("Field required!");
      ContactInput.setMessageType("error");
      return false;
    }
    ContactInput.setFeedbackMessage("");
    ContactInput.setMessageType("none");
    return true;
  };
  const AddressLine2Input = useInputComponent("");
  const AddressLine2InputValidater = (value) => {
    if (value === "" || !value) {
      AddressLine2Input.setFeedbackMessage("Field required!");
      AddressLine2Input.setMessageType("error");
      return false;
    }
    AddressLine2Input.setFeedbackMessage("");
    AddressLine2Input.setMessageType("none");
    return true;
  };
  const AddressLine1Input = useInputComponent("");
  const AddressLine1InputValidater = (value) => {
    if (value === "" || !value) {
      AddressLine1Input.setFeedbackMessage("Field required!");
      AddressLine1Input.setMessageType("error");
      return false;
    }
    AddressLine1Input.setFeedbackMessage("");
    AddressLine1Input.setMessageType("none");
    return true;
  };
  const LabCloseTime = useInputComponent("");
  const LabCloseTimeValidater = (value) => {
    if (value === "" || !value) {
      LabCloseTime.setFeedbackMessage("Field required!");
      LabCloseTime.setMessageType("error");
      return false;
    }
    LabCloseTime.setFeedbackMessage("");
    LabCloseTime.setMessageType("none");
    return true;
  };

  const [publish, setPublish] = useState(false);
  const [centerSubmitResponse, centerSubmitHandler] = useAPI(
    {
      url: "/centers/create",
      method: "post",
    },
    (e) => {
      toast.success(
        `Center has been ${publish ? "Published" : "Saved"} successfully`
      );
      router.push("/admin/centers");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while creating Center!", e)
      );
      return e;
    }
  );
  const createCenterSubmitHandler = async (isPublish = false) => {
    setPublish(isPublish);
    var titleIsValid = titleInputValidater(titleInput?.enteredValue);
    if (!titleIsValid) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    var submitBody = {
      title: titleInput?.enteredValue,
      author: "Test Author",
      description: blogDescription,
      category_id: 1,
      image: "https://picsum.photos/500/200",
      is_home: selectedTags.some((item) => item?.value == "is_home"),
      trending: selectedTags.some((item) => item?.value == "trending"),
      is_popular: selectedTags.some((item) => item?.value == "is_popular"),
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      published_at: isPublish ? moment().toString() : null,
    };
    await blogSubmitHandler({ body: submitBody });
  };

  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Blogs", link: "/admin/blogs" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Center</h1>
        <p className="sub-heading">
          Easily Add and Configure a New Center to Application Database
        </p>
        <form>
          <div className="row mt-2">
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <InputWithAddOn
                label="Center Name"
                className="loginInputs"
                setValue={CenterName.setEnteredValue}
                value={CenterName.enteredValue}
                feedbackMessage={CenterName.feedbackMessage}
                feedbackType={CenterName.messageType}
                isTouched={CenterName.isTouched}
                setIsTouched={CenterName.setIsTouched}
                validateHandler={CenterNameValidater}
                reset={CenterName.reset}
                isRequired={true}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 "></div>
            <div className="col-lg-3 col-md-3 col-sm-6 ">
              <InputWithAddOn
                label="Lab Open Time"
                className="loginInputs"
                setValue={LabOpenTime.setEnteredValue}
                value={LabOpenTime.enteredValue}
                feedbackMessage={LabOpenTime.feedbackMessage}
                feedbackType={LabOpenTime.messageType}
                isTouched={LabOpenTime.isTouched}
                setIsTouched={LabOpenTime.setIsTouched}
                validateHandler={LabOpenTimeValidater}
                reset={LabOpenTime.reset}
                isRequired={true}
                type="time"
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 ">
              <InputWithAddOn
                label="Lab Close Time"
                className="loginInputs"
                setValue={LabCloseTime.setEnteredValue}
                value={LabCloseTime.enteredValue}
                feedbackMessage={LabCloseTime.feedbackMessage}
                feedbackType={LabCloseTime.messageType}
                isTouched={LabCloseTime.isTouched}
                setIsTouched={LabCloseTime.setIsTouched}
                validateHandler={LabCloseTimeValidater}
                reset={LabCloseTime.reset}
                isRequired={true}
                type="time"
              />
            </div>
            {/* <hr /> */}
            <div className="col-lg-6 col-md-6 col-sm-12 "></div>

            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <InputWithAddOn
                label="Address Line 1"
                className="loginInputs"
                setValue={AddressLine1Input.setEnteredValue}
                value={AddressLine1Input.enteredValue}
                feedbackMessage={AddressLine1Input.feedbackMessage}
                feedbackType={AddressLine1Input.messageType}
                isTouched={AddressLine1Input.isTouched}
                setIsTouched={AddressLine1Input.setIsTouched}
                validateHandler={AddressLine1InputValidater}
                reset={AddressLine1Input.reset}
                isRequired={true}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputWithAddOn
                label="Address Line 2"
                className="loginInputs"
                setValue={AddressLine2Input.setEnteredValue}
                value={AddressLine2Input.enteredValue}
                feedbackMessage={AddressLine2Input.feedbackMessage}
                feedbackType={AddressLine2Input.messageType}
                isTouched={AddressLine2Input.isTouched}
                setIsTouched={AddressLine2Input.setIsTouched}
                validateHandler={AddressLine2InputValidater}
                reset={AddressLine2Input.reset}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <InputWithAddOn
                label="Contact No."
                className="loginInputs"
                setValue={ContactInput.setEnteredValue}
                value={ContactInput.enteredValue}
                feedbackMessage={ContactInput.feedbackMessage}
                feedbackType={ContactInput.messageType}
                isTouched={ContactInput.isTouched}
                setIsTouched={ContactInput.setIsTouched}
                validateHandler={ContactInputValidater}
                reset={ContactInput.reset}
                isRequired={true}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <InputWithAddOn
                label="Email"
                className="loginInputs"
                setValue={EmailInput.setEnteredValue}
                value={EmailInput.enteredValue}
                feedbackMessage={EmailInput.feedbackMessage}
                feedbackType={EmailInput.messageType}
                isTouched={EmailInput.isTouched}
                setIsTouched={EmailInput.setIsTouched}
                validateHandler={EmailInputValidater}
                reset={EmailInput.reset}
                isRequired={true}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <InputSelect
                options={stateListResponse?.data ?? []}
                label="State"
                className="loginInputs"
                setValue={StateInput.setEnteredValue}
                value={StateInput.enteredValue}
                feedbackMessage={StateInput.feedbackMessage}
                feedbackType={StateInput.messageType}
                isTouched={StateInput.isTouched}
                setIsTouched={StateInput.setIsTouched}
                validateHandler={StateInputValidater}
                reset={StateInput.reset}
                isRequired={true}
                isLoading={stateListResponse?.fetching}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <InputSelect
                options={cityListResponse?.data ?? []}
                label="City"
                className="loginInputs"
                setValue={CityInput.setEnteredValue}
                value={CityInput.enteredValue}
                feedbackMessage={CityInput.feedbackMessage}
                feedbackType={CityInput.messageType}
                isTouched={CityInput.isTouched}
                setIsTouched={CityInput.setIsTouched}
                validateHandler={CityInputValidater}
                reset={CityInput.reset}
                isRequired={true}
                isLoading={cityListResponse?.fetching}
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 ">
              <InputWithAddOn
                label="Latitude"
                className="loginInputs"
                setValue={LatitudeInput.setEnteredValue}
                value={LatitudeInput.enteredValue}
                feedbackMessage={LatitudeInput.feedbackMessage}
                feedbackType={LatitudeInput.messageType}
                isTouched={LatitudeInput.isTouched}
                setIsTouched={LatitudeInput.setIsTouched}
                validateHandler={LatitudeInputValidater}
                reset={LatitudeInput.reset}
                isRequired={true}
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 ">
              <InputWithAddOn
                label="Longitude"
                className="loginInputs"
                setValue={LongitudeInput.setEnteredValue}
                value={LongitudeInput.enteredValue}
                feedbackMessage={LongitudeInput.feedbackMessage}
                feedbackType={LongitudeInput.messageType}
                isTouched={LongitudeInput.isTouched}
                setIsTouched={LongitudeInput.setIsTouched}
                validateHandler={LongitudeInputValidater}
                reset={LongitudeInput.reset}
                isRequired={true}
              />
            </div>
            <div className="col-12 text-end my-3">
              <button
                disabled={centerSubmitResponse?.fetching}
                className="btn  btn-outline-dark px-5 me-2"
                onClick={createCenterSubmitHandler}
                type="button"
              >
                {centerSubmitResponse?.fetching && !publish ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Save"
                )}
              </button>
              <button
                disabled={centerSubmitResponse?.fetching}
                className="btn btn-success px-5"
                onClick={() => {
                  createCenterSubmitHandler(true);
                }}
                type="button"
              >
                {centerSubmitResponse?.fetching && publish ? (
                  <Spinner size={"sm"} />
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
