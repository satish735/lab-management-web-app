"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import InputTextAreaMultiple from "@/components/formInput/InputTextAreaMultiple";
import { useRouter } from "next/navigation";

import {
    medicalDegrees
} from "@/staticdata/staticdropdown";
import useInputComponent from "@/hooks/useInputComponent";
import uuid from "react-uuid";
import { Spinner } from "reactstrap";

import { toast } from "react-hot-toast";
import moment from "moment";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import transformErrorDefault from "@/utils/transformErrorDefault";

const Member = ({ searchParams }) => {

    const router = useRouter();


    const [getteammeberResponse, getteammeberHandler] = useAPI(
        {
            url: `/teammember/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            FirstNameInput?.setEnteredValue(e?.name)
            post.setEnteredValue(e?.post)
            DescriptionInput?.setEnteredValue(e?.qualificationDescription)
            Email?.setEnteredValue(e?.email)
            Phone?.setEnteredValue(e?.phone)
            NumberOfExp?.setEnteredValue(e?.experience)
            JoinedDate?.setEnteredValue(moment(e?.joined_date).format("YYYY-MM-DD"))
            setDegree(e?.qualification)
            settype(e?.type)
            setGenderType(e?.gender)
            setImageFile({
                filePath: e?.image, url: process.env.NEXT_PUBLIC_BUCKET_URL + e?.image,
                status: searchParams?.type === 'edit' ? 'original' : 'Original'
            })


        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting teammeber!",
                e
            ));
            return e
        }
    );


    const [deleteteammeberResponse, deleteteammeberHandler] = useAPI(
        {
            url: `/teammember/${searchParams?.id}`,
            method: "DELETE",

        },
        (e) => {
            router.push("/admin/teammember")
            toast.success("Team Member deleted successfully");


        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting team member!",
                e
            ));
            return e
        }
    );

    const [teammeberResponse, teammeberHandler] = useAPI(
        {
            url: `/teammember/${searchParams?.id}`,
            method: "put",
        },
        (e) => {
            router.push("/admin/teammember")


            toast.success("Team Member updated successfully");
            router.push("/admin/teammember")

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating Body Part!",
                    e
                )
            );
            return e;
        }
    );




    const [imageFile, setImageFile] = useState();



    const submit = () => {

        let isFirstNameInputValidater = FirstNameInputValidater(
            FirstNameInput.enteredValue
        );

        let isDescriptionInputValidater = DescriptionInputValidater(
            DescriptionInput.enteredValue
        );
        let ispostValidater = postValidater(post.enteredValue);
        let isGenderTypeSelectValidater = GenderTypeSelectValidater(GenderType);
        let isPhoneValidater = PhoneValidater(Phone.enteredValue);
        let isNumberOfExpValidater = NumberOfExpValidater(
            NumberOfExp.enteredValue
        );
        let isJoinedDateValidater = JoinedDateValidater(JoinedDate.enteredValue);
        let isEmailValidater = EmailValidater(Email.enteredValue);

        let isDegreeSelectValidater = DegreeSelectValidater(Degree);
        let istypeSelectValidater = typeSelectValidater(type);

        if (
            !isFirstNameInputValidater ||
            !isDescriptionInputValidater ||
            !ispostValidater ||
            !isGenderTypeSelectValidater ||
            !isPhoneValidater ||
            !isNumberOfExpValidater ||
            !isJoinedDateValidater ||
            !isEmailValidater ||
            !isDegreeSelectValidater ||
            !istypeSelectValidater
        ) {
            toast.error("Fill complete form.");
            return;
        } else {
            teammeberHandler({
                body: {
                    name: FirstNameInput.enteredValue ?? "",
                    post: post.enteredValue ?? "",
                    qualificationDescription: DescriptionInput.enteredValue ?? "",
                    email: Email.enteredValue ?? "",
                    phone: Phone.enteredValue ?? "",
                    experience: NumberOfExp.enteredValue ?? "",
                    joined_date: JoinedDate.enteredValue ?? "",
                    qualification: Degree ?? "",
                    type: type ?? "",
                    gender: GenderType ?? "",
                    image: imageFile?.filePath ?? ""
                },
            });

        }
    }

    const FirstNameInput = useInputComponent("");
    const FirstNameInputValidater = (value) => {
        if (value === "" || !value) {
            FirstNameInput.setFeedbackMessage("Field required!");
            FirstNameInput.setMessageType("error");
            return false;
        }
        FirstNameInput.setFeedbackMessage("");
        FirstNameInput.setMessageType("none");
        return true;
    };

    const DescriptionInput = useInputComponent("");
    const DescriptionInputValidater = (value) => {
        if (value === "" || !value) {
            DescriptionInput.setFeedbackMessage("Field required!");
            DescriptionInput.setMessageType("error");
            return false;
        }
        DescriptionInput.setFeedbackMessage("");
        DescriptionInput.setMessageType("none");
        return true;
    };

    const post = useInputComponent("");
    const postValidater = (value) => {
        if (value === "" || !value) {
            post.setFeedbackMessage("Field required!");
            post.setMessageType("error");
            return false;
        }
        post.setFeedbackMessage("");
        post.setMessageType("none");
        return true;
    };

    const [GenderType, setGenderType] = useState();
    const [GenderTypeIsTouch, setGenderTypeIsTouch] = useState(false);

    const [GenderTypeMessage, setGenderTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const GenderTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setGenderTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setGenderTypeMessage({ type: "info", message: "" });

        return true;
    };

    const genderoption = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    const Phone = useInputComponent("");
    const PhoneValidater = (value) => {
        if (value === "" || !value) {
            Phone.setFeedbackMessage("Field required!");
            Phone.setMessageType("error");
            return false;
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
            Phone.setFeedbackMessage("Invalid phone number!");
            Phone.setMessageType("error");
            return false;
        }

        Phone.setFeedbackMessage("");
        Phone.setMessageType("none");
        return true;
    };

    const NumberOfExp = useInputComponent("");
    const NumberOfExpValidater = (value) => {
        if (value === "" || !value) {
            NumberOfExp.setFeedbackMessage("Field required!");
            NumberOfExp.setMessageType("error");
            return false;
        }
        NumberOfExp.setFeedbackMessage("");
        NumberOfExp.setMessageType("none");
        return true;
    };

    const JoinedDate = useInputComponent("");
    const JoinedDateValidater = (value) => {
        if (value === "" || !value) {
            JoinedDate.setFeedbackMessage("Field required!");
            JoinedDate.setMessageType("error");
            return false;
        }
        JoinedDate.setFeedbackMessage("");
        JoinedDate.setMessageType("none");
        return true;
    };

    const Email = useInputComponent("");
    const EmailValidater = (value) => {
        if (value === "" || !value) {
            Email.setFeedbackMessage("Field required!");
            Email.setMessageType("error");
            return false;
        }
        Email.setFeedbackMessage("");
        Email.setMessageType("none");
        return true;
    };

    const [Degree, setDegree] = useState();
    const [DegreeIsTouch, setDegreeIsTouch] = useState(false);

    const [DegreeMessage, setDegreeMessage] = useState({
        type: "info",
        message: "",
    });
    const DegreeSelectValidater = (value) => {
        if (value === "" || !value) {
            setDegreeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setDegreeMessage({ type: "info", message: "" });

        return true;
    };

    const [type, settype] = useState();
    const [typeIsTouch, settypeIsTouch] = useState(false);

    const [typeMessage, settypeMessage] = useState({
        type: "info",
        message: "",
    });
    const typeSelectValidater = (value) => {
        if (value === "" || !value) {
            settypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        settypeMessage({ type: "info", message: "" });

        return true;
    };

    return (
        <>

            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Team member", link: "/admin/teammember" },
                    { label: "Update", active: true },
                ]}
            />

            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    getteammeberResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getteammeberResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />
            {!getteammeberResponse?.fetching && <div className="bg-white p-3">
                <h3 className="mb-4 mt-2">Update Team Member Details</h3>

                <div className="row my-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputWithAddOn
                            label="Name"
                            className="loginInputs"
                            setValue={FirstNameInput.setEnteredValue}
                            value={FirstNameInput.enteredValue}
                            feedbackMessage={FirstNameInput.feedbackMessage}
                            feedbackType={FirstNameInput.messageType}
                            isTouched={FirstNameInput.isTouched}
                            setIsTouched={FirstNameInput.setIsTouched}
                            validateHandler={FirstNameInputValidater}
                            reset={FirstNameInput.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputWithAddOn
                            label="Post"
                            className="loginInputs"
                            setValue={post.setEnteredValue}
                            value={post.enteredValue}
                            feedbackMessage={post.feedbackMessage}
                            feedbackType={post.messageType}
                            isTouched={post.isTouched}
                            setIsTouched={post.setIsTouched}
                            validateHandler={postValidater}
                            reset={post.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputSelect
                            setValue={setGenderType}
                            value={GenderType}
                            options={genderoption ?? []}
                            isTouched={GenderTypeIsTouch}
                            setIsTouched={setGenderTypeIsTouch}
                            className="py-1"
                            label={"Gender"}
                            isRequired={true}
                            feedbackMessage={GenderTypeMessage?.message}
                            feedbackType={GenderTypeMessage?.type}
                            validateHandler={GenderTypeSelectValidater}
                        />
                    </div>



                    <div className="col-lg-4 col-md-4 col-sm-12 ">
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
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputWithAddOn
                            label="Phone"
                            className="loginInputs"
                            setValue={Phone.setEnteredValue}
                            value={Phone.enteredValue}
                            feedbackMessage={Phone.feedbackMessage}
                            feedbackType={Phone.messageType}
                            isTouched={Phone.isTouched}
                            setIsTouched={Phone.setIsTouched}
                            type="number"
                            validateHandler={PhoneValidater}
                            reset={Phone.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputWithAddOn
                            label="Experience years"
                            className="loginInputs"
                            setValue={NumberOfExp.setEnteredValue}
                            value={NumberOfExp.enteredValue}
                            feedbackMessage={NumberOfExp.feedbackMessage}
                            feedbackType={NumberOfExp.messageType}
                            isTouched={NumberOfExp.isTouched}
                            setIsTouched={NumberOfExp.setIsTouched}
                            type="number"
                            validateHandler={NumberOfExpValidater}
                            reset={NumberOfExp.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputWithAddOn
                            label="Joined Date"
                            className="loginInputs"
                            setValue={JoinedDate.setEnteredValue}
                            value={JoinedDate.enteredValue}
                            feedbackMessage={JoinedDate.feedbackMessage}
                            feedbackType={JoinedDate.messageType}
                            isTouched={JoinedDate.isTouched}
                            setIsTouched={JoinedDate.setIsTouched}
                            type="date"
                            validateHandler={JoinedDateValidater}
                            reset={JoinedDate.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputSelect
                            setValue={setDegree}
                            value={Degree}
                            options={medicalDegrees ?? []}
                            isTouched={DegreeIsTouch}
                            setIsTouched={setDegreeIsTouch}
                            className="py-1"
                            label={"Degree"}
                            isRequired={true}
                            feedbackMessage={DegreeMessage?.message}
                            feedbackType={DegreeMessage?.type}
                            validateHandler={DegreeSelectValidater}
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputSelect
                            setValue={settype}
                            value={type}
                            options={[
                                { label: "Core", value: "core" },
                                { label: "Scientific", value: "scientific" }
                            ] ?? []}
                            isTouched={typeIsTouch}
                            setIsTouched={settypeIsTouch}
                            className="py-1"
                            label={"Type"}
                            isRequired={true}
                            feedbackMessage={typeMessage?.message}
                            feedbackType={typeMessage?.type}
                            validateHandler={typeSelectValidater}
                        />
                    </div>

                    <div>
                        <InputTextArea
                            label="Qualification Description"
                            className="loginInputs"
                            setValue={DescriptionInput.setEnteredValue}
                            value={DescriptionInput.enteredValue}
                            feedbackMessage={DescriptionInput.feedbackMessage}
                            feedbackType={DescriptionInput.messageType}
                            isTouched={DescriptionInput.isTouched}
                            setIsTouched={DescriptionInput.setIsTouched}
                            validateHandler={DescriptionInputValidater}
                            reset={DescriptionInput.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-12">
                        <SingleImageDropZone file={imageFile} setFile={setImageFile} />

                    </div>


                    <div>
                        <div className="my-3">
                            <button
                                onClick={() => {
                                    submit()
                                }}
                                style={{ float: "right" }}
                                className="btn btn-success px-4 mx-3"
                            >
                                {teammeberResponse?.fetching ? <Spinner size={"sm"} /> : "Update"}
                            </button>
                        </div>


                        <button
                            style={{ float: "right" }}
                            className="btn btn-dark px-4 mx-3"
                            onClick={() => {
                                router.push("/admin/teammember")
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            style={{ float: "right" }}

                            className="btn btn-danger px-4 mx-3 "
                            onClick={() => {
                                deleteteammeberHandler()
                            }}
                        >
                            {deleteteammeberResponse?.fetching ? <Spinner size={"sm"} /> : "Delete"}
                        </button>
                    </div>

                </div>



            </div>}
        </>
    );
}

export default Member
