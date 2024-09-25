"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
import BreadcrumbDiv from '@/components/BreadcrumbDiv'
import LoaderGeneral from "@/components/loaders/LoaderGeneral";

const Page = ({ searchParams }) => {

    const router = useRouter();


    const [getteammeberResponse, getteammeberHandler] = useAPI(
        {
            url: `/milestones/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


            TitleInput.setEnteredValue(e?.title ?? "")
            DescriptionInput?.setEnteredValue(e?.desc ?? "")
            YearInput?.setEnteredValue(e?.year ?? "")
            console.log("eeeeeeeeeeeee", e)
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
            url: `/milestones/${searchParams?.id}`,
            method: "DELETE",

        },
        (e) => {
            router.push("/admin/milestones")
            toast.success("Milestones deleted successfully");


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
            url: `/milestones/${searchParams?.id}`,
            method: "put",
        },
        (e) => {


            toast.success("Milestones updated successfully");
            router.push("/admin/milestones")

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







    const submit = () => {

        let titleValidate = TitleInputValidater(TitleInput.enteredValue);
        let yearValidate = YearInputValidater(YearInput.enteredValue);
        let descValidate = DescriptionInputValidater(DescriptionInput.enteredValue);
        if (!titleValidate || !yearValidate || !descValidate) {
            toast.error('Fill all the fields.')
        }
        else {
            teammeberHandler({
                body: {
                    title: TitleInput.enteredValue ?? '',
                    desc: DescriptionInput.enteredValue ?? '',
                    year: YearInput.enteredValue ?? '',
                }
            })
        }


    }




    const TitleInput = useInputComponent('');
    const TitleInputValidater = (value) => {
        if (value === "" || !value) {
            TitleInput.setFeedbackMessage(
                "Field required!"
            );
            TitleInput.setMessageType("error");
            return false;
        }
        TitleInput.setFeedbackMessage("");
        TitleInput.setMessageType("none");
        return true;
    };


    const DescriptionInput = useInputComponent('');
    const DescriptionInputValidater = (value) => {
        if (value === "" || !value) {
            DescriptionInput.setFeedbackMessage(
                "Field required!"
            );
            DescriptionInput.setMessageType("error");
            return false;
        }
        DescriptionInput.setFeedbackMessage("");
        DescriptionInput.setMessageType("none");
        return true;
    };



    const YearInput = useInputComponent('');
    const YearInputValidater = (value) => {
        if (value === "" || !value) {
            YearInput.setFeedbackMessage(
                "Field required!"
            );
            YearInput.setMessageType("error");
            return false;
        }
        YearInput.setFeedbackMessage("");
        YearInput.setMessageType("none");
        return true;
    };



    return (
        <>

            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Milestones", link: "/admin/milestones" },
                    { label: "Update Milestone", link: "/admin/milestones/view", active: true },
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
                <h3 className="mb-4 mt-2">Update Milestone Details</h3>

                <div className="row my-3">

                    <div className="col-lg-6 col-md-6 col-sm-12">

                        <InputWithAddOn
                            label="Title"
                            className="loginInputs"

                            setValue={TitleInput.setEnteredValue}
                            value={TitleInput.enteredValue}
                            feedbackMessage={TitleInput.feedbackMessage}
                            feedbackType={TitleInput.messageType}
                            isTouched={TitleInput.isTouched}
                            setIsTouched={TitleInput.setIsTouched}

                            validateHandler={TitleInputValidater}
                            reset={TitleInput.reset}
                            isRequired={searchParams?.type == 'view' ? true : false}
                        />


                    </div>



                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <InputWithAddOn
                            label="Year"
                            className="loginInputs"

                            setValue={YearInput.setEnteredValue}
                            value={YearInput.enteredValue}
                            feedbackMessage={YearInput.feedbackMessage}
                            feedbackType={YearInput.messageType}
                            isTouched={YearInput.isTouched}
                            setIsTouched={YearInput.setIsTouched}
                            type={'number'}
                            validateHandler={YearInputValidater}
                            reset={YearInput.reset}
                            isRequired={searchParams?.type == 'view' ? true : false} />
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">

                        <InputTextArea
                            label="Description"
                            className="loginInputs"
                            setValue={DescriptionInput.setEnteredValue}
                            value={DescriptionInput.enteredValue}
                            feedbackMessage={DescriptionInput.feedbackMessage}
                            feedbackType={DescriptionInput.messageType}
                            isTouched={DescriptionInput.isTouched}
                            setIsTouched={DescriptionInput.setIsTouched}
                            validateHandler={DescriptionInputValidater}
                            reset={DescriptionInput.reset}
                            isRequired={searchParams?.type == 'view' ? true : false} />
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
                                router.push("/admin/milestones")
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

export default Page
