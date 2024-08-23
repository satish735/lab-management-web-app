
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
const CreateMilestone = () => {
    const router = useRouter();

    const [milestoneResponse, milestoneHandler] = useAPI(
        {
            url: "/milestones/create",
            method: "post",
        },
        (e) => {
            TitleInput.setEnteredValue();
            YearInput.setEnteredValue();
            DescriptionInput.setEnteredValue();

            toast.success("Milestone added successfully");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while adding milestone!",
                    e
                )
            );
            return e;
        }
    );


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




    const submit = () => {

        let titleValidate = TitleInputValidater(TitleInput.enteredValue);
        let yearValidate = YearInputValidater(YearInput.enteredValue);
        let descValidate = DescriptionInputValidater(DescriptionInput.enteredValue);
        if (!titleValidate || !yearValidate || !descValidate) {
            toast.error('Fill all the fields.')
        }
        else {
            milestoneHandler({
                body: {
                    title: TitleInput.enteredValue ?? '',
                    description: DescriptionInput.enteredValue ?? '',
                    year:  YearInput.enteredValue ?? '',
                }
            })
        }

    };

    return (
        <>
            <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>



                <h3 className="mb-4 px-3 py-2 mt-2  " >

                    Add Milestone</h3>

                <div className=" my-3  py-4 px-3"  >


                    <div className="row">
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
                                isRequired={true}
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
                                isRequired={true}
                            />
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
                                isRequired={true}
                            />
                        </div>


                        <div className="my-3 text-end">
                            <button
                                className="mx-2 btn btn-outline-dark"
                                onClick={() => {
                                    router.push("/admin/body-parts");
                                }}
                                type="button"
                            >
                                {" "}
                                Cancel
                            </button>
                            <button
                                style={{ float: "right" }}
                                
                                className="btn btn-success px-3"
                                onClick={submit}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateMilestone;
