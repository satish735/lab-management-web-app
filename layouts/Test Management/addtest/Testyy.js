import InputTextArea from '@/components/formInput/InputTextArea';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from '@/components/formInput/select/InputSelect';
import useInputComponent from '@/hooks/useInputComponent';
import React from 'react'

const Testyy = () => {
    const description = useInputComponent('');
    const descriptionValidater = (value) => {
        if (value === "" || !value) {
            description.setFeedbackMessage(
                "Field required!"
            );
            description.setMessageType("error");
            return false;
        }
        description.setFeedbackMessage("");
        description.setMessageType("none");
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
        <div>

            <div className="col-lg-4 col-md-4 col-sm-12 ">

                <InputTextArea
                    label="Description"
                    className="loginInputs"

                    setValue={ResultWithinHoursValidater}
                    value={description}
                    feedbackMessage={description.feedbackMessage}
                    feedbackType={description.messageType}
                    isTouched={description.isTouched}
                    setIsTouched={description.setIsTouched}

                    validateHandler={ResultWithinHoursValidater}
                    reset={description.reset}
                    isRequired={true}
                />
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12 ">

                <InputWithAddOn
                    label="description"
                    className="loginInputs"

                    setValue={description.setEnteredValue}
                    value={description.enteredValue}
                    feedbackMessage={description.feedbackMessage}
                    feedbackType={description.messageType}
                    isTouched={description.isTouched}
                    setIsTouched={description.setIsTouched}

                    validateHandler={descriptionValidater}
                    reset={description.reset}
                    isRequired={true}
                />


            </div>


            <div className="col-lg-4 col-md-4 col-sm-12 ">

                <InputWithAddOn
                    label="description"
                    className="loginInputs"

                    setValue={description.setEnteredValue}
                    value={description.enteredValue}
                    feedbackMessage={description.feedbackMessage}
                    feedbackType={description.messageType}
                    isTouched={description.isTouched}
                    setIsTouched={description.setIsTouched}

                    validateHandler={descriptionValidater}
                    reset={description.reset}
                    isRequired={true}
                    type='number'
                />


            </div>


            <div className="col-lg-4 col-md-4 col-sm-12 ">
                <InputSelect
                    setValue={settype}
                    value={type}
                    options={[

                    ]}
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


        </div>

    )
}

export default Testyy