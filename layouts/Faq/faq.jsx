"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn";
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";
import InputSelect from "@/components/formInput/select/InputSelect";
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useInputComponent from "@/hooks/useInputComponent";
import { Spinner } from "reactstrap";
const Faq = ({ searchParams }) => {



  const router = useRouter();


  const [faqResponse, faqHandler] = useAPI(
    {
      url: "/faq/createfaq",
      method: "post",
    },
    (e) => {

      toast.success("FAQ has been created successfully");
      questionsInput?.reset()
      answersInput?.reset()
      router.push("/admin/faq");

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

  const submit = () => {
    let isquestionsInputValidater = questionsInputValidater(questionsInput?.enteredValue)
    let isanswersInputValidater = answersInputValidater(answersInput?.enteredValue)
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




  return (
    <>
      <div className="my-2">
        <h6> Frequently Asked Questions</h6>

        <div className="row">
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
            />
          </div>

          <div>
            <InputTextArea
              label="Answer"
              value={answersInput.enteredValue}
              feedbackMessage={answersInput.feedbackMessage}
              feedbackType={answersInput.messageType}
              isTouched={answersInput.isTouched}
              setIsTouched={answersInput.setIsTouched}
              isRequired={true}

              validateHandler={answersInputValidater}
              reset={answersInput.reset}
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
              {faqResponse?.fetching ? <Spinner size={"sm"} /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
