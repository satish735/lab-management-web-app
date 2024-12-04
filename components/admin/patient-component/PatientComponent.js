

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
import moment from "moment";
const PatientComponent = ({ searchParams }) => {
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


    const Gender = useInputComponent();
    const GenderValidater = (value) => {
        if (!value || value == "") {
            Gender.setFeedbackMessage("Required Field!");
            Gender.setMessageType("error");
            return false;
        }
        Gender.setFeedbackMessage(null);
        Gender.setMessageType("none");
        return true;
    };


    const Relation = useInputComponent();
    const RelationValidater = (value) => {
        if (!value || value == "") {
            Relation.setFeedbackMessage("Required Field!");
            Relation.setMessageType("error");
            return false;
        }
        Relation.setFeedbackMessage(null);
        Relation.setMessageType("none");
        return true;
    };


    const DOB = useInputComponent();
    const DOBValidater = (value) => {
        if (!value || value == "") {
            DOB.setFeedbackMessage("Required Field!");
            DOB.setMessageType("error");
            return false;
        }
        DOB.setFeedbackMessage(null);
        DOB.setMessageType("none");
        return true;
    }


    const Status = useInputComponent();
    const StatusValidater = (value) => {
        if (!value || value == "") {
            Status.setFeedbackMessage("Required Field!");
            Status.setMessageType("error");
            return false;
        }
        Status.setFeedbackMessage(null);
        Status.setMessageType("none");
        return true;
    };



    const [getContactUsResponse, getContactUsHandler] = useAPI(
        {
            url: `/patientsDetails/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


 
            Name.setEnteredValue(e?.name)
            Email.setEnteredValue(e?.email)
            Gender.setEnteredValue(e?.gender)
            Phone.setEnteredValue(e?.contactPhone)
            Relation.setEnteredValue(e?.relation)
            Status.setEnteredValue(e?.status)

            DOB.setEnteredValue((e?.dob) ? moment(e?.dob).format('DD/MM/YYYY') : '')


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
                    { label: "Patient Listing", link: "/admin/patients" },
                    { label: "Patient Details", link: "/admin/patients/view", active: true },
                ]}
            />
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>

                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    {'Patient Details'}
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
                                    label="Date Of Birth"
                                    className="loginInputs"

                                    setValue={DOB.setEnteredValue}
                                    value={DOB.enteredValue}
                                    feedbackMessage={DOB.feedbackMessage}
                                    feedbackType={DOB.messageType}
                                    isTouched={DOB.isTouched}
                                    setIsTouched={DOB.setIsTouched}

                                    validateHandler={DOBValidater}
                                    reset={DOB.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Relation"
                                    className="loginInputs"

                                    setValue={Relation.setEnteredValue}
                                    value={Relation.enteredValue}
                                    feedbackMessage={Relation.feedbackMessage}
                                    feedbackType={Relation.messageType}
                                    isTouched={Relation.isTouched}
                                    setIsTouched={Relation.setIsTouched}

                                    validateHandler={RelationValidater}
                                    reset={Relation.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-12 mt-3">

                                <InputWithAddOn
                                    label="Gender"
                                    className="loginInputs"

                                    setValue={Gender.setEnteredValue}
                                    value={Gender.enteredValue}
                                    feedbackMessage={Gender.feedbackMessage}
                                    feedbackType={Gender.messageType}
                                    isTouched={Gender.isTouched}
                                    setIsTouched={Gender.setIsTouched}

                                    validateHandler={GenderValidater}
                                    reset={Gender.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>

                            <div className="col-4 mt-3">

                                <InputWithAddOn
                                    label="Status"
                                    className="loginInputs"

                                    setValue={Status.setEnteredValue}
                                    value={Status.enteredValue}
                                    feedbackMessage={Status.feedbackMessage}
                                    feedbackType={Status.messageType}
                                    isTouched={Status.isTouched}
                                    setIsTouched={Status.setIsTouched}

                                    validateHandler={StatusValidater}
                                    reset={Status.reset}
                                    isRequired={true}
                                    disabled={true}
                                />
                            </div>



                            <div className="my-3 text-end">



                                <button
                                    className="mx-2 btn btn-dark"
                                    onClick={() => {
                                        router.push("/admin/patients");
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

export default PatientComponent;
