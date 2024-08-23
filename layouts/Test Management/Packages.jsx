"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn"
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect"
import InputSelect from "@/components/formInput/select/InputSelect"
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea"
import InputTextAreaMultiple from "@/components/formInput/InputTextAreaMultiple"
import useInputComponent from "@/hooks/useInputComponent";


const Packages = ({ children }) => {



    const Price = useInputComponent('');
    const PriceValidater = (value) => {
        if (value == "" || !value) {
            Price.setFeedbackMessage(
                "Field required!"
            );
            Price.setMessageType("error");
            return false;
        }
        Price.setFeedbackMessage("");
        Price.setMessageType("none");
        return true;
    };


    const [MedicalConditions, setMedicalConditions] = useState();
    const [MedicalConditionsIsTouch, setMedicalConditionsIsTouch] = useState(false);

    const [MedicalConditionsMessage, setMedicalConditionsMessage] = useState({
        type: "info",
        message: "",
    });
    const MedicalConditionsSelectValidater = (value) => {
        if (value === "" || !value) {
            setMedicalConditionsMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setMedicalConditionsMessage({ type: "info", message: "" });

        return true;
    };


    return (<>
        <div className="row">


            <div className="col-lg-4 col-md-4 col-sm-12 ">

                <InputWithAddOn
                    label="Price"
                    className="loginInputs"

                    setValue={Price.setEnteredValue}
                    value={Price.enteredValue}
                    feedbackMessage={Price.feedbackMessage}
                    feedbackType={Price.messageType}
                    isTouched={Price.isTouched}
                    setIsTouched={Price.setIsTouched}

                    validateHandler={PriceValidater}
                    reset={Price.reset}
                    type={"number"}
                    isRequired={true}
                />


            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 ">
                <InputSelect
                    setValue={setMedicalConditions}
                    value={MedicalConditions}
                    options={[

                    ]}
                    isTouched={MedicalConditionsIsTouch}
                    setIsTouched={setMedicalConditionsIsTouch}
                    className="py-1"
                    label={"Health Condition"}
                    isRequired={true}
                    feedbackMessage={MedicalConditionsMessage?.message}
                    feedbackType={MedicalConditionsMessage?.type}
                    validateHandler={MedicalConditionsSelectValidater}
                />
            </div>




        </div>

    </>)
}

export default Packages;
