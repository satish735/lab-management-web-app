"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import { Spinner } from "reactstrap";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
import useInputComponent from "@/hooks/useInputComponent";
import transformErrorDefault from "@/utils/transformErrorDefault";


const Home = ({ searchParams }) => {

    const router = useRouter();

    const questionsInput = useInputComponent('');
    const questionsInputValidater = (value) => {
        if (value === "" || !value) {
            questionsInput.setFeedbackMessage(
                "Field required!"
            );
            questionsInput.setMessageType("error");
            return false;
        }
        questionsInput.setFeedbackMessage("");
        questionsInput.setMessageType("none");
        return true;
    };


    const answersInput = useInputComponent('');
    const answersInputValidater = (value) => {
        if (value === "" || !value) {
            answersInput.setFeedbackMessage(
                "Field required!"
            );
            answersInput.setMessageType("error");
            return false;
        }
        answersInput.setFeedbackMessage("");
        answersInput.setMessageType("none");
        return true;
    };

    const [faqResponse, faqHandler] = useAPI(
        {
            url: `/faq/${searchParams?.id}`,
            method: "PUT",
        },
        (e) => {

            questionsInput?.reset()
            answersInput.reset()
            toast.success("FAQ has been update successfully");
            router.push("/admin/faq");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating FAQ!",
                    e
                )
            );
            return e;
        }
    );


    const [DeletefaqResponse, DeletefaqHandler] = useAPI(
        {
            url: `/faq/${searchParams?.id}`,
            method: "DELETE",
        },
        (e) => {

            questionsInput?.reset()
            answersInput.reset()
            toast.success("FAQ has been deleted successfully");
            router.push("/admin/faq");

        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating FAQ!",
                    e
                )
            );
            return e;
        }
    );



    const submit = () => {
        let isquestionsInputValidater = questionsInputValidater(questionsInput.enteredValue)
        let isanswersInputValidater = answersInputValidater(answersInput.enteredValue)

        if (!isquestionsInputValidater || !isanswersInputValidater) {
            toast.error("Fill complete form.");

        } else {
            faqHandler({
                body: {
                    question: questionsInput?.enteredValue,
                    answer: answersInput?.enteredValue,
                },
            });
        }
    };



    const [getFaqResponse, getFaqHandler] = useAPI(
        {
            url: `/faq/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


            questionsInput?.setEnteredValue(e?.question)
            answersInput?.setEnteredValue(e?.answer)
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
        <>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "FAQ", link: "/admin/faq" },
                    { label: "Update", active: true },
                ]}
            />

            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    getFaqResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getFaqResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />
            {!getFaqResponse?.fetching && <div className="my-2 p-3 bg-white">
                <h1 className="main-heading">Update Frequently Asked Questions</h1>

                {getFaqResponse?.fetching ? <div className="text-center"> <Spinner size='lg' />  </div> : <div className="row">
                    <div>
                        <InputWithAddOn
                            label="Questions"
                            setValue={questionsInput.setEnteredValue}
                            value={questionsInput.enteredValue}
                            feedbackMessage={questionsInput.feedbackMessage}
                            feedbackType={questionsInput.messageType}
                            isTouched={questionsInput.isTouched}
                            setIsTouched={questionsInput.setIsTouched}
                            isRequired={true}
                            validateHandler={questionsInputValidater}
                            reset={questionsInput.reset}
                            disabled={searchParams.type == "view" ? true : false}
                        />
                    </div>

                    <div>
                        <InputTextArea
                            label="Answer"
                            value={answersInput.enteredValue}
                            setValue={answersInput?.setEnteredValue}
                            feedbackMessage={answersInput.feedbackMessage}
                            feedbackType={answersInput.messageType}
                            isTouched={answersInput.isTouched}
                            setIsTouched={answersInput.setIsTouched}
                            isRequired={true}
                            validateHandler={answersInputValidater}
                            reset={answersInput.reset}
                            disabled={searchParams.type == "view" ? true : false}
                        />
                    </div>

                    <div className="my-3 text-end">


                        {searchParams.type == "edit" && <button
                            className="mx-2 btn btn-danger"
                            onClick={() => {
                                DeletefaqHandler()
                            }}
                        // type="button"
                        >
                            {DeletefaqResponse?.fetching ? <Spinner size="sm" /> : "Delete"}
                        </button>}


                        <button
                            className="mx-2 btn btn-dark"
                            onClick={() => {
                                router.push("/admin/faq");
                            }}
                            type="button"
                        >
                            Cancel
                        </button>



                        {searchParams.type == "edit" && <button
                            style={{ float: "right" }}
                            className="btn btn-success px-3"
                            onClick={submit}
                        >
                            {faqResponse?.fetching ? <Spinner size='sm' /> : "Update"}
                        </button>}

                    </div>
                </div>}
            </div>}
        </>
    )

}
export default Home;