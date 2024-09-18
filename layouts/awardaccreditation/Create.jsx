"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import SingleImageDropZone from "@/components/drop-zones/SingleImageDropZone";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";

const Create = ({ searchParams }) => {


    const router = useRouter();


    const [imageFile, setImageFile] = useState({
        url: "",
        status: "original",
    });

    const [awardaccreditationResponse, awardaccreditationHandler] = useAPI(
        {
            url: "/awardaccreditation/create",
            method: "post",
        },
        (e) => {
            TitleInput?.reset()
            DescriptionnInput?.reset()
            DateInput?.reset()
            toast.success("Award accreditation added successfully");
            router.push("/admin/awardaccreditation");
        },
        (e) => {
            // setisSubmit(false)
            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating award accreditation!",
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



    const DescriptionnInput = useInputComponent('');
    const DescriptionnInputValidater = (value) => {
        if (value === "" || !value) {
            DescriptionnInput.setFeedbackMessage(
                "Field required!"
            );
            DescriptionnInput.setMessageType("error");
            return false;
        }
        DescriptionnInput.setFeedbackMessage("");
        DescriptionnInput.setMessageType("none");
        return true;
    };

    const DateInput = useInputComponent('');
    const DateInputValidater = (value) => {
        if (value === "" || !value) {
            DateInput.setFeedbackMessage(
                "Field required!"
            );
            DateInput.setMessageType("error");
            return false;
        }
        DateInput.setFeedbackMessage("");
        DateInput.setMessageType("none");
        return true;
    };




    const submit = () => {


        let isTitleInputValidater = TitleInputValidater(TitleInput?.enteredValue)
        let isDescriptionnInputValidater = DescriptionnInputValidater(DescriptionnInput?.enteredValue)
        let isDateInputValidater = DateInputValidater(DateInput?.enteredValue)

        if (!isTitleInputValidater || !isDescriptionnInputValidater || !isDateInputValidater) {
            toast.error("Fill complete form.");


        } else {
            awardaccreditationHandler({
                body: {
                    title: TitleInput?.enteredValue,
                    desc: DescriptionnInput?.enteredValue,
                    date: DateInput?.enteredValue,
                    image: imageFile?.url
                },
            });
        }
    };




    return (
        <>
            <div className="my-2">
                <h4> Awards and Accreditations</h4>

                <div className="row">
                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Title"
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

                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Description"
                            value={DescriptionnInput.enteredValue}
                            feedbackMessage={DescriptionnInput.feedbackMessage}
                            feedbackType={DescriptionnInput.messageType}
                            isTouched={DescriptionnInput.isTouched}
                            setIsTouched={DescriptionnInput.setIsTouched}

                            validateHandler={DescriptionnInputValidater}
                            reset={DescriptionnInput.reset}
                        />
                    </div>

                    <div className="col-sm-6 col-12" >
                        <InputWithAddOn
                            label="Date"
                            setValue={DateInput.setEnteredValue}
                            value={DateInput.enteredValue}
                            feedbackMessage={DateInput.feedbackMessage}
                            feedbackType={DateInput.messageType}
                            isTouched={DateInput.isTouched}
                            setIsTouched={DateInput.setIsTouched}

                            validateHandler={DateInputValidater}
                            reset={DateInput.reset}
                            isRequired={true}
                            type="date"
                        />
                    </div>



                    <div className="col-12">
                        <h5 className="py-2 small">Add Image</h5>
                        <SingleImageDropZone file={imageFile} setFile={setImageFile} />
                    </div>

                    <div className="my-3 text-end">
                        <button
                            className="mx-2 btn btn-outline-dark"
                            onClick={() => {
                                router.push("/admin/awardaccreditation");
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
                            {awardaccreditationResponse?.fetching ? <Spinner size='sm' /> : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
