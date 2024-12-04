
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
const CorporateComponent = ({ searchParams }) => {
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



    const OrganizationName = useInputComponent();
    const OrganizationNameValidater = (value) => {
        if (!value || value == "") {
            OrganizationName.setFeedbackMessage("Required Field!");
            OrganizationName.setMessageType("error");
            return false;
        }
        OrganizationName.setFeedbackMessage(null);
        OrganizationName.setMessageType("none");
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
                type: 'corporate-wellness'
            }
        },
        (e) => {


            Name.setEnteredValue(e?.name)
            Email.setEnteredValue(e?.emailAddress)
            AlternativeNumber.setEnteredValue(e?.alternateNumber)
            Phone.setEnteredValue(e?.number)
            OrganizationName.setEnteredValue(e?.organizationName)





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
                    { label: "Corporate Wellness", link: "/admin/corporate-wellness" },
                    { label: "Corporate Wellness Details", link: "/admin/corporate-wellness/view", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {'View Corporate Wellness'}
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
                                    label="Organization Name"
                                    className="loginInputs"

                                    setValue={OrganizationName.setEnteredValue}
                                    value={OrganizationName.enteredValue}
                                    feedbackMessage={OrganizationName.feedbackMessage}
                                    feedbackType={OrganizationName.messageType}
                                    isTouched={OrganizationName.isTouched}
                                    setIsTouched={OrganizationName.setIsTouched}

                                    validateHandler={OrganizationNameValidater}
                                    reset={OrganizationName.reset}
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




                            <div className="my-3 text-end">



                                <button
                                    className="mx-2 btn btn-dark"
                                    onClick={() => {
                                        router.push("/admin/corporate-wellness");
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

export default CorporateComponent;
