
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
const ViewContactDetailsPage = ({ searchParams }) => {
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


    const InterestedIn = useInputComponent();
    const InterestedInValidater = (value) => {
        if (!value || value == "") {
            InterestedIn.setFeedbackMessage("Required Field!");
            InterestedIn.setMessageType("error");
            return false;
        }
        InterestedIn.setFeedbackMessage(null);
        InterestedIn.setMessageType("none");
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

    const [updateStatusContactUsResponse, updateStatusContactUsHandler] = useAPI(
        {
            url: `/contactUs/${searchParams?.id}`,
            method: "put",
            sendImmediately: true,

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
            url: `/contactUs/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


            Name.setEnteredValue(e?.name)
            Email.setEnteredValue(e?.email)
            InterestedIn.setEnteredValue(e?.interestedIn)
            Phone.setEnteredValue(e?.phone)
            City.setEnteredValue(e?.city)
            Message.setEnteredValue(e?.message)


 

            if (e?.status === 'New') {
             
                updateStatusContactUsHandler({
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
                    { label: "Contanct Listing", link: "/admin/contact-us" },
                    { label: "User Contact Details", link: "/admin/contact-us/view", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {'View Body Part' }
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
                                    label="Sender Name"
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
                                    label="Email"
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
                                    label="Phone"
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

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Interested In"
                                    className="loginInputs"

                                    setValue={InterestedIn.setEnteredValue}
                                    value={InterestedIn.enteredValue}
                                    feedbackMessage={InterestedIn.feedbackMessage}
                                    feedbackType={InterestedIn.messageType}
                                    isTouched={InterestedIn.isTouched}
                                    setIsTouched={InterestedIn.setIsTouched}

                                    validateHandler={InterestedInValidater}
                                    reset={InterestedIn.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-12 mt-3">

                                <InputWithAddOn
                                    label="Sender Message"
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
                                        router.push("/admin/contact-us");
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

export default ViewContactDetailsPage;
