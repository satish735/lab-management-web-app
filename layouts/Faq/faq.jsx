"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Faq = ({ searchParams }) => {



  const router = useRouter();


  const [faqResponse, faqHandler] = useAPI(
    {
      url: "/faq/createfaq",
      method: "post",
    },
    (e) => {
      setquestions();
      setanswers();
      toast.success("FAQ added successfully");
      // setisSubmit(false)
    },
    (e) => {
      // setisSubmit(false)
      toast.error(
        transformErrorDefault(
          "Something went wrong while creating FAQ!",
          e
        )
      );
      return e;
    }
  );




  const [questions, setquestions] = useState();

  const [answers, setanswers] = useState();

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




  return (
    <>
      <div className="my-2">
        <h6> Frequently Asked Questions</h6>

        <div className="row">
          <div>
            <InputWithAddOn
              label="Questions"
              value={questions}
              setValue={setquestions}
            />
          </div>

          <div>
            <InputTextArea
              label="Answer"
              value={answers}
              setValue={setanswers}
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
            <button
              style={{ float: "right" }}
              disabled={questions == "" && answers == ""}
              className="btn btn-success px-3"
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
