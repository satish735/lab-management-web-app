const Fromto = useInputComponent('');
const FromtoValidater = (value) => {
    if (value === "" || !value) {
        Fromto.setFeedbackMessage(
            "Field required!"
        );
        Fromto.setMessageType("error");
        return false;
    }
    Fromto.setFeedbackMessage("");
    Fromto.setMessageType("none");
    return true;
};


<div className="col-lg-4 col-md-4 col-sm-12 ">

    <InputWithAddOn
        label="From To"
        className="loginInputs"
        setValue={Fromto.setEnteredValue}
        value={Fromto.enteredValue}
        feedbackMessage={Fromto.feedbackMessage}
        feedbackType={Fromto.messageType}
        isTouched={Fromto.isTouched}
        setIsTouched={Fromto.setIsTouched}
        validateHandler={FromtoValidater}
        reset={Fromto.reset}
        isRequired={true}
    />
</div>



const AgeTo = useInputComponent('');
const AgeToValidater = (value) => {
    if (value === "" || !value) {
        AgeTo.setFeedbackMessage(
            "Field required!"
        );
        AgeTo.setMessageType("error");
        return false;
    }
    AgeTo.setFeedbackMessage("");
    AgeTo.setMessageType("none");
    return true;
};


<div className="col-lg-4 col-md-4 col-sm-12 ">

    <InputWithAddOn
        label="Age To"
        className="loginInputs"
        setValue={AgeTo.setEnteredValue}
        value={AgeTo.enteredValue}
        feedbackMessage={AgeTo.feedbackMessage}
        feedbackType={AgeTo.messageType}
        isTouched={AgeTo.isTouched}
        setIsTouched={AgeTo.setIsTouched}
        validateHandler={AgeToValidater}
        reset={AgeTo.reset}
        isRequired={true}
    />
</div>