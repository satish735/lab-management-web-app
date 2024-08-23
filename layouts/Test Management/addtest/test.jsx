"use client";
import InputWithAddOn from "@/components/formInput/InputWithAddOn"
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect"
import InputSelect from "@/components/project-main-component/input-component/InputSelect"
import { useEffect, useState } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea"
import InputTextAreaMultiple from "@/components/formInput/InputTextAreaMultiple"

import { BodyParts, SampleTypes, Observations_List } from "@/staticdata/staticdropdown"
import useInputComponent from "@/hooks/useInputComponent";
import uuid from "react-uuid";

const Test = () => {

    const [isSubmit, setisSubmit] = useState(false)





    const [createTestResponse, createTestHandler] = useAPI(
        {
            url: "/test/createtest",
            method: "post",

        },
        (e) => {
            // toast.success("");
            // setisSubmit(false)
        },
        (e) => {
            // setisSubmit(false)
            //  transformErrorDefault(
            //     "Something went wrong while creating Test Case!",
            //     e
            // );
        }
    );


    const [TestOrPackage, setTestOrPackage] = useState();
    const [TestOrPackageIsTouch, setTestOrPackageIsTouch] = useState(false);

    const [TestOrPackageMessage, setTestOrPackageMessage] = useState({
        type: "info",
        message: "",
    });
    const TestOrPackageSelectValidater = (value) => {
        if (value === "" || !value) {
            setTestOrPackageMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setTestOrPackageMessage({ type: "info", message: "" });

        return true;
    };
    const TestOrPackageOption = [
        { label: "Select", value: "" },

        { label: "Test", value: "Test", },
        { label: "Package", value: "Package" },


    ]

    const TestNameInput = useInputComponent('');
    const TestNameInputValidater = (value) => {
        if (value === "" || !value) {
            TestNameInput.setFeedbackMessage(
                "Field required!"
            );
            TestNameInput.setMessageType("error");
            return false;
        }
        TestNameInput.setFeedbackMessage("");
        TestNameInput.setMessageType("none");
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
    const [BodyPartType, setBodyPartType] = useState();
    const [BodyPartTypeIsTouch, setBodyPartTypeIsTouch] = useState(false);

    const [BodyPartTypeMessage, setBodyPartTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const BodyPartTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setBodyPartTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setBodyPartTypeMessage({ type: "info", message: "" });

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


    const Price = useInputComponent('');
    const PriceValidater = (value) => {
        if (value === "" || !value) {
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

    const [TestType, setTestType] = useState();
    const [TestTypeIsTouch, setTestTypeIsTouch] = useState(false);

    const [TestTypeMessage, setTestTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const TestTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setTestTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setTestTypeMessage({ type: "info", message: "" });

        return true;
    };

    const test_type_option = [

        { label: "Test", value: "test", },
        { label: "Test Package", value: "test package" }

    ]
    const [GenderType, setGenderType] = useState();
    const [GenderTypeIsTouch, setGenderTypeIsTouch] = useState(false);

    const [GenderTypeMessage, setGenderTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const GenderTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setGenderTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setGenderTypeMessage({ type: "info", message: "" });

        return true;
    };

    const genderoption = [

        { label: "Male", value: "male", },
        { label: "Female", value: "female" },
        { label: "Male & Female", value: "Male & Female" },

    ]





    const AgeGroup = useInputComponent('');
    const AgeGroupValidater = (value) => {
        if (value === "" || !value) {
            AgeGroup.setFeedbackMessage(
                "Field required!"
            );
            AgeGroup.setMessageType("error");
            return false;
        }
        AgeGroup.setFeedbackMessage("");
        AgeGroup.setMessageType("none");
        return true;
    };



    const ObservationsInput = useInputComponent('');
    const ObservationsInputValidater = (value) => {
        if (value === "" || !value) {
            ObservationsInput.setFeedbackMessage(
                "Field required!"
            );
            ObservationsInput.setMessageType("error");
            return false;
        }
        ObservationsInput.setFeedbackMessage("");
        ObservationsInput.setMessageType("none");
        return true;
    };



    const SampleRequired = useInputComponent('');
    const SampleRequiredValidater = (value) => {
        if (value === "" || !value) {
            SampleRequired.setFeedbackMessage(
                "Field required!"
            );
            SampleRequired.setMessageType("error");
            return false;
        }
        SampleRequired.setFeedbackMessage("");
        SampleRequired.setMessageType("none");
        return true;
    };


    const PreparationRequired = useInputComponent('');
    const PreparationRequiredValidater = (value) => {
        if (value === "" || !value) {
            PreparationRequired.setFeedbackMessage(
                "Field required!"
            );
            PreparationRequired.setMessageType("error");
            return false;
        }
        PreparationRequired.setFeedbackMessage("");
        PreparationRequired.setMessageType("none");
        return true;
    };



    const [CollectionAt, setCollectionAt] = useState();
    const [CollectionAtIsTouch, setCollectionAtIsTouch] = useState(false);

    const [CollectionAtMessage, setCollectionAtMessage] = useState({
        type: "info",
        message: "",
    });
    const CollectionAtSelectValidater = (value) => {
        if (value === "" || !value) {
            setCollectionAtMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setCollectionAtMessage({ type: "info", message: "" });

        return true;
    };

    const collectionAtOption = [

        { label: "Home", value: "home", },
        { label: "Lab", value: "Lab" },
        { label: "Home & Lab", value: "Home & Lab" },

    ]


    const [HomeCollection, setHomeCollection] = useState();
    const [HomeCollectionIsTouch, setHomeCollectionIsTouch] = useState(false);

    const [HomeCollectionMessage, setHomeCollectionMessage] = useState({
        type: "info",
        message: "",
    });
    const HomeCollectionSelectValidater = (value) => {
        if (value === "" || !value) {
            setHomeCollectionMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setHomeCollectionMessage({ type: "info", message: "" });

        return true;
    };
    const homeCollectionOption = [

        { label: "Yes", value: "yes", },
        { label: "No", value: "No" },


    ]



    const TestIncluded = useInputComponent('');
    const TestIncludedValidater = (value) => {
        if (value === "" || !value) {
            TestIncluded.setFeedbackMessage(
                "Field required!"
            );
            TestIncluded.setMessageType("error");
            return false;
        }
        TestIncluded.setFeedbackMessage("");
        TestIncluded.setMessageType("none");
        return true;
    };
    const ResultWithinHours = useInputComponent('');
    const ResultWithinHoursValidater = (value) => {
        if (value === "" || !value) {
            ResultWithinHours.setFeedbackMessage(
                "Field required!"
            );
            ResultWithinHours.setMessageType("error");
            return false;
        }
        ResultWithinHours.setFeedbackMessage("");
        ResultWithinHours.setMessageType("none");
        return true;
    };







    const SubmitHandler = () => {


        let TestNameInputValidate = commonValidate(TestNameInput.enteredValue);
        let DescriptionInputValidate = commonValidate(DescriptionInput.enteredValue);
        let BodyPartTypeSelectValidate = commonValidate(BodyPartType);
        let MedicalConditionsSelectValidate = commonValidate(MedicalConditions);
        let PriceValidate = commonValidate(Price.enteredValue);
        let TestTypeSelectValidate = commonValidate(TestType);
        let GenderTypeSelectValidate = commonValidate(GenderType);
        let AgeGroupValidate = commonValidate(AgeGroup.enteredValue);
        let SampleRequiredValidate = commonValidate(SampleRequired.enteredValue);
        let ObservationsInputValidate = commonValidate(ObservationsInput.enteredValue);
        let PreparationRequiredValidate = commonValidate(PreparationRequired.enteredValue);
        let CollectionAtSelectValidate = commonValidate(CollectionAt);
        let HomeCollectionSelectValidate = commonValidate(HomeCollection);
        // let ObservationTitleTypeSelectValidate = commonValidate(ObservationTitleType);
        let TestIncludedValidate = commonValidate(TestIncluded.enteredValue);
        let ResultWithinHoursValidate = commonValidate(ResultWithinHours.enteredValue);




        if (!TestNameInputValidate ||
            !DescriptionInputValidate ||
            !BodyPartTypeSelectValidate ||
            // !MedicalConditionsSelectValidate ||
            !PriceValidate ||
            !TestTypeSelectValidate ||
            !GenderTypeSelectValidate ||
            !AgeGroupValidate ||
            !SampleRequiredValidate ||
            !ObservationsInputValidate ||
            !PreparationRequiredValidate ||
            !CollectionAtSelectValidate ||
            !HomeCollectionSelectValidate ||

            !TestIncludedValidate ||
            !ResultWithinHoursValidate) {


            console.log('Validation failed for one or more inputs.');
        } else {

            console.log({
                body: {
                    name: TestNameInput.enteredValue ?? null,
                    description: DescriptionInput.enteredValue ?? null,
                    body_parts_type: BodyPartType ?? null,
                    observations: ObservationsInput ?? null,
                    medical_conditions: MedicalConditions ?? null,
                    price: Price.enteredValue ?? null,
                    test_type: TestType ?? null,
                    gender: GenderType ?? null,
                    age_group: AgeGroup.enteredValue ?? null,
                    requirements: null,
                    features: {
                        SampleRequiredValidate: SampleRequired.enteredValue ?? null,
                        PreparationRequiredValidate: PreparationRequired.enteredValue ?? null,
                        CollectionAtSelectValidate: CollectionAt ?? null,
                        HomeCollectionSelectValidate: HomeCollection ?? null,
                        TestIncludedValidate: TestIncluded.enteredValue ?? null,
                        ResultWithinHoursValidate: ResultWithinHours.enteredValue ?? null,
                    }

                }
            });
            // createTestHandler(
            //     {
            //         body: {
            //             name: TestNameInput.enteredValue ?? null,
            //             description: DescriptionInput.enteredValue ?? null,
            //             body_parts_type: BodyPartType ?? null,
            //             observations: ObservationsInput ?? null,
            //             medical_conditions: MedicalConditions ?? null,
            //             price: Price.enteredValue ?? null,
            //             test_type: TestType ?? null,
            //             gender: GenderType ?? null,
            //             age_group: AgeGroup.enteredValue ?? null,
            //             requirements: null,
            //             features: {
            //                 SampleRequiredValidate: SampleRequired.enteredValue ?? null,
            //                 PreparationRequiredValidate: PreparationRequired.enteredValue ?? null,
            //                 CollectionAtSelectValidate: CollectionAt ?? null,
            //                 HomeCollectionSelectValidate: HomeCollection ?? null,
            //                 TestIncludedValidate: TestIncluded.enteredValue ?? null,
            //                 ResultWithinHoursValidate: ResultWithinHours.enteredValue ?? null,
            //             }

            //         }
            //     }
            // )
            console.log('All validations passed successfully.');
        }


    }


    useEffect(() => {

        if (isSubmit) {

            TestNameInputValidater(TestNameInput.enteredValue)
            DescriptionInputValidater(DescriptionInput.enteredValue)
            BodyPartTypeSelectValidater(BodyPartType)
            MedicalConditionsSelectValidater(MedicalConditions)
            PriceValidater(Price.enteredValue)
            TestTypeSelectValidater(TestType)
            GenderTypeSelectValidater(GenderType)
            AgeGroupValidater(AgeGroup.enteredValue)
            SampleRequiredValidater(SampleRequired.enteredValue)
            ObservationsInputValidater(ObservationsInput.enteredValue)
            PreparationRequiredValidater(PreparationRequired.enteredValue)
            CollectionAtSelectValidater(CollectionAt)
            HomeCollectionSelectValidater(HomeCollection)
            // ObservationTitleTypeSelectValidater(ObservationTitleType)
            TestIncludedValidater(TestIncluded.enteredValue)
            ResultWithinHoursValidater(ResultWithinHours.enteredValue)
        }

    }, [isSubmit])
    return (<>

        <div className='bg-white pt-2 pb-3 mt-2' style={{ borderRadius: '5px' }}>

            <h3 className="mb-3 px-3 py-2 mt-2  " >

                Create Test
            </h3>

            <div className=" mt-3  py-0 px-3"  >


                <div>
                    <InputSelect
                        setValue={setTestOrPackage}
                        value={TestOrPackage}
                        options={TestOrPackageOption ?? []}
                        isTouched={TestOrPackageIsTouch}
                        setIsTouched={setTestOrPackageIsTouch}
                        className="py-1"
                        label={"Select Test Or Package"}
                        isRequired={true}
                        feedbackMessage={TestOrPackageMessage?.message}
                        feedbackType={TestOrPackageMessage?.type}
                        validateHandler={TestOrPackageSelectValidater}
                    />
                </div>
            </div>

            {
                TestOrPackage === 'Package' &&

                <>
                    <h5 className="mb-3 px-3 py-2 mt-2  " >

                        Add Package Details
                    </h5>
                    <div className=" mb-3  py-0 px-3"  >

                    </div>
                </>

            }


            {
                TestOrPackage === 'Test' &&
                <>
                    <h5 className="mb-3 px-3 py-2 mt-2  " >

                        Add Test Details
                    </h5>
                    <div className=" mb-3   py-0 px-3"  >

                        <div className="row my-3">

                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Test Name"
                                    className="loginInputs"

                                    setValue={TestNameInput.setEnteredValue}
                                    value={TestNameInput.enteredValue}
                                    feedbackMessage={TestNameInput.feedbackMessage}
                                    feedbackType={TestNameInput.messageType}
                                    isTouched={TestNameInput.isTouched}
                                    setIsTouched={TestNameInput.setIsTouched}

                                    validateHandler={TestNameInputValidater}
                                    reset={TestNameInput.reset}
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


                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setBodyPartType}
                                    value={BodyPartType}
                                    options={BodyParts ?? []}
                                    isTouched={BodyPartTypeIsTouch}
                                    setIsTouched={setBodyPartTypeIsTouch}
                                    className="py-1"
                                    label={"Body Part"}
                                    isRequired={true}
                                    feedbackMessage={BodyPartTypeMessage?.message}
                                    feedbackType={BodyPartTypeMessage?.type}
                                    validateHandler={BodyPartTypeSelectValidater}
                                />
                            </div>

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
                                    isRequired={true}
                                    type='number'
                                />


                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setTestType}
                                    value={TestType}
                                    options={test_type_option ?? []}
                                    isTouched={TestTypeIsTouch}
                                    setIsTouched={setTestTypeIsTouch}
                                    className="py-1"
                                    label={"Test Type"}
                                    isRequired={true}
                                    feedbackMessage={TestTypeMessage?.message}
                                    feedbackType={TestTypeMessage?.type}
                                    validateHandler={TestTypeSelectValidater}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setGenderType}
                                    value={GenderType}
                                    options={genderoption ?? []}
                                    isTouched={GenderTypeIsTouch}
                                    setIsTouched={setGenderTypeIsTouch}
                                    className="py-1"
                                    label={"Gender"}
                                    isRequired={true}
                                    feedbackMessage={GenderTypeMessage?.message}
                                    feedbackType={GenderTypeMessage?.type}
                                    validateHandler={GenderTypeSelectValidater}
                                />
                            </div>











                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputWithAddOn
                                    label="Age Group"
                                    className="loginInputs"

                                    setValue={AgeGroup.setEnteredValue}
                                    value={AgeGroup.enteredValue}
                                    feedbackMessage={AgeGroup.feedbackMessage}
                                    feedbackType={AgeGroup.messageType}
                                    isTouched={AgeGroup.isTouched}
                                    setIsTouched={AgeGroup.setIsTouched}

                                    validateHandler={AgeGroupValidater}
                                    reset={AgeGroup.reset}
                                    isRequired={true}
                                    type='number'
                                />

                            </div>




                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setCollectionAt}
                                    value={CollectionAt}
                                    options={collectionAtOption ?? []}
                                    isTouched={CollectionAtIsTouch}
                                    setIsTouched={setCollectionAtIsTouch}
                                    className="py-1"
                                    label={"Collection At"}
                                    isRequired={true}
                                    feedbackMessage={CollectionAtMessage?.message}
                                    feedbackType={CollectionAtMessage?.type}
                                    validateHandler={CollectionAtSelectValidater}
                                />
                            </div>


                            <div className="col-lg-4 col-md-4 col-sm-12 ">
                                <InputSelect
                                    setValue={setHomeCollection}
                                    value={HomeCollection}
                                    options={homeCollectionOption ?? []}
                                    isTouched={HomeCollectionIsTouch}
                                    setIsTouched={setHomeCollectionIsTouch}
                                    className="py-1"
                                    label={"Home Collection"}
                                    isRequired={true}
                                    feedbackMessage={HomeCollectionMessage?.message}
                                    feedbackType={HomeCollectionMessage?.type}
                                    validateHandler={HomeCollectionSelectValidater}
                                />
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="No Of Test Included"
                                    className="loginInputs"

                                    setValue={TestIncluded.setEnteredValue}
                                    value={TestIncluded.enteredValue}
                                    feedbackMessage={TestIncluded.feedbackMessage}
                                    feedbackType={TestIncluded.messageType}
                                    isTouched={TestIncluded.isTouched}
                                    setIsTouched={TestIncluded.setIsTouched}

                                    validateHandler={TestIncludedValidater}
                                    reset={TestIncluded.reset}
                                    isRequired={true}
                                    type='number'
                                />

                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-12 ">

                                <InputWithAddOn
                                    label="Result Within Hours"
                                    className="loginInputs"

                                    setValue={ResultWithinHours.setEnteredValue}
                                    value={ResultWithinHours.enteredValue}
                                    feedbackMessage={ResultWithinHours.feedbackMessage}
                                    feedbackType={ResultWithinHours.messageType}
                                    isTouched={ResultWithinHours.isTouched}
                                    setIsTouched={ResultWithinHours.setIsTouched}

                                    validateHandler={ResultWithinHoursValidater}
                                    reset={ResultWithinHours.reset}
                                    isRequired={true}
                                    type='number'
                                />


                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 ">

                                <InputTextArea
                                    label="Sample Required"
                                    className="loginInputs"

                                    setValue={SampleRequired.setEnteredValue}
                                    value={SampleRequired.enteredValue}
                                    feedbackMessage={SampleRequired.feedbackMessage}
                                    feedbackType={SampleRequired.messageType}
                                    isTouched={SampleRequired.isTouched}
                                    setIsTouched={SampleRequired.setIsTouched}

                                    validateHandler={SampleRequiredValidater}
                                    reset={SampleRequired.reset}
                                    isRequired={true}
                                />
                            </div>



                            <div className="col-lg-6 col-md-6 col-sm-12 ">

                                <InputTextArea
                                    label="Preparation Required"
                                    className="loginInputs"

                                    setValue={PreparationRequired.setEnteredValue}
                                    value={PreparationRequired.enteredValue}
                                    feedbackMessage={PreparationRequired.feedbackMessage}
                                    feedbackType={PreparationRequired.messageType}
                                    isTouched={PreparationRequired.isTouched}
                                    setIsTouched={PreparationRequired.setIsTouched}

                                    validateHandler={PreparationRequiredValidater}
                                    reset={PreparationRequired.reset}
                                    isRequired={true}
                                />
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 ">
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


                            <div className="col-lg-6 col-md-6 col-sm-12 ">
                                <InputTextArea
                                    label="Observations"
                                    className="loginInputs"

                                    setValue={ObservationsInput.setEnteredValue}
                                    value={ObservationsInput.enteredValue}
                                    feedbackMessage={ObservationsInput.feedbackMessage}
                                    feedbackType={ObservationsInput.messageType}
                                    isTouched={ObservationsInput.isTouched}
                                    setIsTouched={ObservationsInput.setIsTouched}

                                    validateHandler={ObservationsInputValidater}
                                    reset={ObservationsInput.reset}
                                    isRequired={true}
                                />

                            </div>




                        </div>
                    </div>
                </>


            }
            <div className=" my-3  text-end  ">
                <button onClick={() => { SubmitHandler(); setisSubmit(true) }} className="btn btn-success px-4 mx-5">Create</button>
            </div>

        </div>

    </>
    )


}

export default Test;

export const commonValidate = (value) => {
    if (value === "" || !value) {
        return {
            message: "Field is required!",
            type: "error",
            valid: false,
        };
    }
    return { message: "", type: "none", valid: true };
}



