"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";

import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const ViewFaq = ({ searchParams }) => {
  
    const router = useRouter();

    const [questions, setquestions] = useState();
    const [answers, setanswers] = useState();

    const [faqResponse, faqHandler] = useAPI(
        {
            url: `/faq/${searchParams?.id}`,
            method: "PUT",
        },
        (e) => {
            console.log("jjjjjjjjjjjjj")
            setquestions();
            setanswers();
            toast.success("FAQ update successfully");

        },
        (e) => {
            console.log("jkkkkkkkkkkkkkkk")
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
    
        if (questions != "" && answers != "") {

            faqHandler({
                body: {
                    question: questions,
                    answer: answers,
                },
            });
        } else {
            toast.error("Fill complete form.");
        }
    };



    const [getFaqResponse, getFaqHandler] = useAPI(
        {
            url: `/faq/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {


            console.log(e, "kkkkkkkkkkkkkkkkkkkkkk")
            setquestions(e?.question)
            setanswers(e?.answer)
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting Faq!",
                e
            ));
            return e
        }
    );

    console.log("questions", questions)
    return (
        <div className="my-2">
            <h6> Frequently Asked Questions</h6>

            <div className="row">
                <div>
                    <InputWithAddOn
                        label="Questions"
                        value={questions}
                        setValue={setquestions}
                        disabled={searchParams.type == "view" ? true : false}
                    />
                </div>

                <div>
                    <InputTextArea
                        label="Answer"
                        value={answers}
                        setValue={setanswers}
                        disabled={searchParams.type == "view" ? true : false}
                    />
                </div>

                <div className="my-3 text-end">
                    <button
                        className="mx-2 btn btn-outline-dark"
                        onClick={() => {
                            router.push("/admin/faq");
                        }}
                        type="button"
                    >
                        {" "}
                        Cancel
                    </button>


                    {searchParams.type == "edit" && <button
                        style={{ float: "right" }}
                        disabled={questions == "" && answers == ""}
                        className="btn btn-success px-3"
                        onClick={submit}
                    >
                        Update
                    </button>}

                </div>
            </div>
        </div>
    )

}
export default ViewFaq;