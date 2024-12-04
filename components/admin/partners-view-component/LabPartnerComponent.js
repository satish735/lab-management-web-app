
"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
import transformErrorDefault from "@/utils/transformErrorDefault";
import CheckboxInput from "@/components/formInput/CheckboxInput";
const LabPartnerComponent = ({ searchParams }) => {
    const router = useRouter();



    const [DeletebodypartResponse, DeleteContactDetailsHandler] = useAPI(
        {
            url: `/contactUs/${searchParams?.id}`,
            method: "DELETE",
        },
        (e) => {
            router.push("/admin/contactUs")
            toast.success("Details deleted successfully");

            ContactDetails.setEnteredValue()
        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while updating Body Part!",
                    e
                )
            );
            return e;
        }
    );


    const [FilterCheck, setFilterCheck] = useState(false)


    const Name = useInputComponent();
    const NameValidater = (value) => {
        if (!value || value == "") {
            Name.setFeedbackMessage("Required Field!");
            Name.setMessageType("error");
            return false;
        }
        Name.setFeedbackMessage(null);
        Name.setMessageType("none");
        return true;
    };



    const CurrentLabName = useInputComponent();
    const CurrentLabNameValidater = (value) => {
        if (!value || value == "") {
            CurrentLabName.setFeedbackMessage("Required Field!");
            CurrentLabName.setMessageType("error");
            return false;
        }
        CurrentLabName.setFeedbackMessage(null);
        CurrentLabName.setMessageType("none");
        return true;
    };

    const Age = useInputComponent();
    const AgeValidater = (value) => {
        if (!value || value == "") {
            Age.setFeedbackMessage("Required Field!");
            Age.setMessageType("error");
            return false;
        }
        Age.setFeedbackMessage(null);
        Age.setMessageType("none");
        return true;
    };


    const City = useInputComponent();
    const CityValidater = (value) => {
        if (!value || value == "") {
            City.setFeedbackMessage("Required Field!");
            City.setMessageType("error");
            return false;
        }
        City.setFeedbackMessage(null);
        City.setMessageType("none");
        return true;
    };


    const State = useInputComponent();
    const StateValidater = (value) => {
        if (!value || value == "") {
            State.setFeedbackMessage("Required Field!");
            State.setMessageType("error");
            return false;
        }
        State.setFeedbackMessage(null);
        State.setMessageType("none");
        return true;
    };


    const Email = useInputComponent();
    const EmailValidater = (value) => {
        if (!value || value == "") {
            Email.setFeedbackMessage("Required Field!");
            Email.setMessageType("error");
            return false;
        }
        Email.setFeedbackMessage(null);
        Email.setMessageType("none");
        return true;
    };


    const Phone = useInputComponent();
    const PhoneValidater = (value) => {
        if (!value || value == "") {
            Phone.setFeedbackMessage("Required Field!");
            Phone.setMessageType("error");
            return false;
        }
        Phone.setFeedbackMessage(null);
        Phone.setMessageType("none");
        return true;
    };


    const AlternativeNumber = useInputComponent();
    const AlternativeNumberValidater = (value) => {
        if (!value || value == "") {
            AlternativeNumber.setFeedbackMessage("Required Field!");
            AlternativeNumber.setMessageType("error");
            return false;
        }
        AlternativeNumber.setFeedbackMessage(null);
        AlternativeNumber.setMessageType("none");
        return true;
    };

    const Message = useInputComponent();
    const MessageValidater = (value) => {
        if (!value || value == "") {
            Message.setFeedbackMessage("Required Field!");
            Message.setMessageType("error");
            return false;
        }
        Message.setFeedbackMessage(null);
        Message.setMessageType("none");
        return true;
    };







    const [updatePartnersdetailsResponse, updatePartnersdetailsHandler] = useAPI(
        {
            url: `/getPartnersDetails/${searchParams?.id}`,
            method: "put",

        },
        (e) => {
            return e
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting details!",
                e
            ));
            return e
        }
    );


    const [getContactUsResponse, getContactUsHandler] = useAPI(
        {
            url: `/getPartnersDetails/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

            params: {
                type: 'lab_acquistion'
            }
        },
        (e) => {


            Name.setEnteredValue(e?.name ?? '')
            Email.setEnteredValue(e?.emailAddress ?? '')
            AlternativeNumber.setEnteredValue(e?.alternateNumber ?? '')
            Phone.setEnteredValue(e?.number ?? '')
            CurrentLabName.setEnteredValue(e?.labName ?? '')
            State.setEnteredValue(e?.state ?? '')
            City.setEnteredValue(e?.city ?? '')
            Age.setEnteredValue(e?.age ?? '')
            Message.setEnteredValue(e?.otherDetails ?? '')
            setFilterCheck(e?.isExperienced ?? false)





            if (e?.status === 'New') {

                updatePartnersdetailsHandler({
                    body: {
                        status: 'Seen'
                    }
                })
            }

        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting details!",
                e
            ));
            return e
        }
    );

    return (
        <>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Lab Acquistion", link: "/admin/lab-acquistion" },
                    { label: "Lab Acquistion Details", link: "/admin/lab-acquistion/view", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {'View Lab Acquistion'}
                </h3>

                <LoaderGeneral
                    noContentMessage="records are not found"
                    state={
                        getContactUsResponse?.fetching
                            ? "loading"
                            : [null, undefined].includes(getContactUsResponse?.data)
                                ? "no-content"
                                : "none"

                    }
                />

                {
                    (!getContactUsResponse?.fetching) &&


                    <div className=" my-3  py-4 px-3"  >


                        <div className="row">


                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Name"
                                    className="loginInputs"

                                    setValue={Name.setEnteredValue}
                                    value={Name.enteredValue}
                                    feedbackMessage={Name.feedbackMessage}
                                    feedbackType={Name.messageType}
                                    isTouched={Name.isTouched}
                                    setIsTouched={Name.setIsTouched}

                                    validateHandler={NameValidater}
                                    reset={Name.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Current Lab Name"
                                    className="loginInputs"

                                    setValue={CurrentLabName.setEnteredValue}
                                    value={CurrentLabName.enteredValue}
                                    feedbackMessage={CurrentLabName.feedbackMessage}
                                    feedbackType={CurrentLabName.messageType}
                                    isTouched={CurrentLabName.isTouched}
                                    setIsTouched={CurrentLabName.setIsTouched}

                                    validateHandler={CurrentLabNameValidater}
                                    reset={CurrentLabName.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Email Address"
                                    className="loginInputs"

                                    setValue={Email.setEnteredValue}
                                    value={Email.enteredValue}
                                    feedbackMessage={Email.feedbackMessage}
                                    feedbackType={Email.messageType}
                                    isTouched={Email.isTouched}
                                    setIsTouched={Email.setIsTouched}

                                    validateHandler={EmailValidater}
                                    reset={Email.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Number"
                                    className="loginInputs"

                                    setValue={Phone.setEnteredValue}
                                    value={Phone.enteredValue}
                                    feedbackMessage={Phone.feedbackMessage}
                                    feedbackType={Phone.messageType}
                                    isTouched={Phone.isTouched}
                                    setIsTouched={Phone.setIsTouched}

                                    validateHandler={PhoneValidater}
                                    reset={Phone.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>



                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Alternative Number"
                                    className="loginInputs"

                                    setValue={AlternativeNumber.setEnteredValue}
                                    value={AlternativeNumber.enteredValue}
                                    feedbackMessage={AlternativeNumber.feedbackMessage}
                                    feedbackType={AlternativeNumber.messageType}
                                    isTouched={AlternativeNumber.isTouched}
                                    setIsTouched={AlternativeNumber.setIsTouched}

                                    validateHandler={AlternativeNumberValidater}
                                    reset={AlternativeNumber.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Age"
                                    className="loginInputs"

                                    setValue={Age.setEnteredValue}
                                    value={Age.enteredValue}
                                    feedbackMessage={Age.feedbackMessage}
                                    feedbackType={Age.messageType}
                                    isTouched={Age.isTouched}
                                    setIsTouched={Age.setIsTouched}

                                    validateHandler={AgeValidater}
                                    reset={Age.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div>
                                <hr />
                            </div>

                            <div className="col-12 mt-3">
                                <p style={{ fontSize: '17px', color: '#7c7c7c' }}>Proposed Location Details:</p>
                                <div className="row">

                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-3">

                                        <InputWithAddOn
                                            label="City"
                                            className="loginInputs"

                                            setValue={City.setEnteredValue}
                                            value={City.enteredValue}
                                            feedbackMessage={City.feedbackMessage}
                                            feedbackType={City.messageType}
                                            isTouched={City.isTouched}
                                            setIsTouched={City.setIsTouched}

                                            validateHandler={CityValidater}
                                            reset={City.reset}
                                            isRequired={true}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-3">

                                        <InputWithAddOn
                                            label="State"
                                            className="loginInputs"

                                            setValue={State.setEnteredValue}
                                            value={State.enteredValue}
                                            feedbackMessage={State.feedbackMessage}
                                            feedbackType={State.messageType}
                                            isTouched={State.isTouched}
                                            setIsTouched={State.setIsTouched}

                                            validateHandler={StateValidater}
                                            reset={State.reset}
                                            isRequired={true}
                                            disabled={true}
                                        />
                                    </div>

                                </div>


                            </div>

                            <div>
                                <hr />
                            </div>

                            <div className="col-12 mt-3">
                                <p style={{ fontSize: '17px', color: '#7c7c7c' }}>Experience in Pathology/Pharmacy/Healthcare *</p>
                                <div className="row">

                                    <div className='d-flex col-lg-2 col-md-4 col-sm-12 mt-3'>
                                        <div ><CheckboxInput
                                            check={FilterCheck}
                                            setChecked={() => {

                                            }}
                                            label={''}
                                            disabled={true}
                                        />
                                        </div>

                                        <div  >
                                            Yes
                                        </div>
                                    </div>

                                    <div className='d-flex col-lg-2 col-md-4 col-sm-12 mt-3'>
                                        <div ><CheckboxInput
                                            check={!FilterCheck}
                                            setChecked={() => {

                                            }}
                                            label={''}
                                            disabled={true}
                                        />
                                        </div>

                                        <div  >
                                            No
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="col-12 mt-3">

                                <InputTextArea
                                    label="Message"
                                    className="loginInputs"

                                    setValue={Message.setEnteredValue}
                                    value={Message.enteredValue}
                                    feedbackMessage={Message.feedbackMessage}
                                    feedbackType={Message.messageType}
                                    isTouched={Message.isTouched}
                                    setIsTouched={Message.setIsTouched}

                                    validateHandler={MessageValidater}
                                    reset={Message.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>



                            <div className="my-3 text-end">



                                <button
                                    className="mx-2 btn btn-dark"
                                    onClick={() => {
                                        router.push("/admin/lab-acquistion");
                                    }}
                                    type="button"
                                >
                                    {" "}
                                    Back
                                </button>




                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    );
};

export default LabPartnerComponent;
