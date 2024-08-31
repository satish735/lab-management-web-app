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

export default function Home({ searchParams }) {
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
        if (stateItem?.state_code === 'RJ') {
          return { label: stateItem?.name, value: stateItem?.state_code };

        }
        else {
          return { label: stateItem?.name, value: stateItem?.state_code };

        }
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

  // useEffect(() => {
  //   if (stateListResponse) {
  //     StateInput.setEnteredValue('RJ')
  //   }
  // }, [stateListResponse]);
  useEffect(() => {
    if (StateInput?.enteredValue && StateInput?.enteredValue != "") {

      CityListHandler({
        url: `/cities/${StateInput?.enteredValue}`,
      });
    }
  }, [StateInput?.enteredValue]);

  const EmailInput = useInputComponent("");
  const EmailInputValidater = (value) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Username validation regex: Alphanumeric characters, underscores, and hyphens allowed
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (value === "" || !value) {
      EmailInput.setFeedbackMessage("Email is required!");
      EmailInput.setMessageType("error");
      return false;
    }

    if (!emailRegex.test(value)) {
      EmailInput.setFeedbackMessage("Email you entered is invalid!");
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

  const PinCode = useInputComponent("");
  const PinCodeValidater = (value) => {
    if (value === "" || !value) {
      PinCode.setFeedbackMessage("Field required!");
      PinCode.setMessageType("error");
      return false;
    }
    PinCode.setFeedbackMessage("");
    PinCode.setMessageType("none");
    return true;
  };
  const [centerSubmitResponse, centerSubmitHandler] = useAPI(

    {
      url: `/centers/${searchParams?.id}`,
      method: "put",
    },
    (e) => {
      toast.success(
        `Center has been updated successfully`
      );
      router.push("/admin/centers");
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while updating Center!", e)
      );
      return e;
    }
  );
  const createCenterSubmitHandler = async () => {

    let CenterName_validate = CenterNameValidater(CenterName?.enteredValue)
    let LabOpenTime_validate = LabOpenTimeValidater(LabOpenTime?.enteredValue)
    let LongitudeInput_validate = LongitudeInputValidater(LongitudeInput?.enteredValue)
    let LatitudeInput_validate = LatitudeInputValidater(LatitudeInput?.enteredValue)
    let CityInput_validate = CityInputValidater(CityInput?.enteredValue)
    let StateInput_validate = StateInputValidater(StateInput?.enteredValue)
    let EmailInput_validate = EmailInputValidater(EmailInput?.enteredValue)
    let ContactInput_validate = ContactInputValidater(ContactInput?.enteredValue)
    let AddressLine1Input_validate = AddressLine1InputValidater(AddressLine1Input?.enteredValue)
    let LabCloseTime_validate = LabCloseTimeValidater(LabCloseTime?.enteredValue)
    let PinCode_validate = PinCodeValidater(PinCode?.enteredValue)

    console.log(CenterName_validate, LabOpenTime_validate, LongitudeInput_validate, LatitudeInput_validate, CityInput_validate, StateInput_validate, EmailInput_validate, ContactInput_validate, AddressLine1Input_validate, LabCloseTime_validate, PinCode_validate);

    if (!CenterName_validate || !LabOpenTime_validate || !LongitudeInput_validate || !LatitudeInput_validate || !CityInput_validate || !StateInput_validate || !EmailInput_validate || !ContactInput_validate || !AddressLine1Input_validate || !LabCloseTime_validate || !PinCode_validate) {
      toast.error("Please check all validations before continuing!");
      return;
    }
    else {
      var submitBody = {
        centre: CenterName?.enteredValue ?? null,
        address: AddressLine1Input?.enteredValue ?? null,
        address2: AddressLine2Input?.enteredValue ?? null,
        contact: ContactInput?.enteredValue ?? null,
        pinCode: PinCode?.enteredValue ?? null,
        email: EmailInput?.enteredValue ?? null,
        labOpeningTime: LabOpenTime?.enteredValue ?? null,
        labClosingTime: LabCloseTime?.enteredValue ?? null,
        latitude: LatitudeInput?.enteredValue ?? null,
        longitude: LongitudeInput?.enteredValue ?? null,
        labFacilities: [] ?? [],
        city: CityInput?.enteredValue ?? null,
        state: StateInput?.enteredValue ?? null
      };
      await centerSubmitHandler({ body: submitBody });
    }

  };

  const [getCenterResponse, getCenterHandler] = useAPI(
    {
      url: `/centers/${searchParams?.id}`,
      method: "get",
      sendImmediately: true,

    },
    (e) => {


      CenterName.setEnteredValue(e?.centre ?? '');
      LabOpenTime.setEnteredValue(e?.labOpeningTime ?? '');
      LongitudeInput.setEnteredValue(e?.latitude ?? '');
      LatitudeInput.setEnteredValue(e?.longitude ?? '');
      CityInput.setEnteredValue(e?.city ?? '');
      StateInput.setEnteredValue(e?.state ?? '');
      EmailInput.setEnteredValue(e?.email ?? '');
      ContactInput.setEnteredValue(e?.contact ?? '');
      AddressLine1Input.setEnteredValue(e?.address ?? '');
      AddressLine2Input.setEnteredValue(e?.address ?? '');
      LabCloseTime.setEnteredValue(e?.labClosingTime ?? '');
      PinCode.setEnteredValue(e?.pinCode ?? '');

    },
    (e) => {

      toast.error(transformErrorDefault(
        "Something went wrong while Getting Faq!",
        e
      ));
      return e
    }
  );


  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Centers", link: "/admin/centers" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Center</h1>
        <p className="sub-heading mb-4">
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
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
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
                type={'number'}
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
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
                disabled={searchParams?.type === 'view'}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 ">
              <InputWithAddOn
                label="Pin Code"
                className="loginInputs"
                setValue={PinCode.setEnteredValue}
                value={PinCode.enteredValue}
                feedbackMessage={PinCode.feedbackMessage}
                feedbackType={PinCode.messageType}
                isTouched={PinCode.isTouched}
                setIsTouched={PinCode.setIsTouched}
                validateHandler={PinCodeValidater}
                reset={PinCode.reset}
                isRequired={true}
                disabled={searchParams?.type === 'view'}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 ">
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
                disabled={searchParams?.type === 'view'}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 ">
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
                disabled={searchParams?.type === 'view'}
              />
            </div>
            <div className="col-12 text-end my-3">



              <button

                className={`btn ${(searchParams?.type === 'view') ? 'btn-success' : 'btn-outline-dark'}   px-3 me-2`}
                onClick={() => {
                  router.push("/admin/centers");

                }}
                type="button"
              >
                {searchParams?.type === 'view'

                  ?
                  'Done' : 'Cancel'
                }

              </button>


              {searchParams?.type === 'edit'

                &&


                <button
                  style={{ float: "right" }}

                  className="btn btn-success px-3"
                  onClick={() => {
                    createCenterSubmitHandler();
                  }}
                  type="button"
                >
                  {centerSubmitResponse?.fetching ? (
                    <Spinner size={"sm"} />
                  ) : (
                    "Update"
                  )}
                </button>
              }




            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
