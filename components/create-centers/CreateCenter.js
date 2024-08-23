"use client";

import React, { useEffect, useState } from 'react'
import InputWithAddOn from '../formInput/InputWithAddOn';
import useInputComponent from '@/hooks/useInputComponent';
import InputTextArea from '../formInput/InputTextArea';
import InputSelect from '../project-main-component/input-component/InputSelect';
import uuid from 'react-uuid';

const CreateCenter = () => {



    const [facilitiesData, setFacilitiesData] = useState([{ facility: '', id: uuid() }]);



    const CenterName = useInputComponent('');
    const CenterNameValidater = (value) => {
        if (value === "" || !value) {
            CenterName.setFeedbackMessage(
                "Field required!"
            );
            CenterName.setMessageType("error");
            return false;
        }
        CenterName.setFeedbackMessage("");
        CenterName.setMessageType("none");
        return true;
    };

    const CenterAddress = useInputComponent('');
    const CenterAddressValidater = (value) => {
        if (value === "" || !value) {
            CenterAddress.setFeedbackMessage(
                "Field required!"
            );
            CenterAddress.setMessageType("error");
            return false;
        }
        CenterAddress.setFeedbackMessage("");
        CenterAddress.setMessageType("none");
        return true;
    };
    const Timing = useInputComponent('');
    const TimingValidater = (value) => {
        if (value === "" || !value) {
            Timing.setFeedbackMessage(
                "Field required!"
            );
            Timing.setMessageType("error");
            return false;
        }
        Timing.setFeedbackMessage("");
        Timing.setMessageType("none");
        return true;
    };

    const ContactEmail = useInputComponent('');
    const ContactEmailValidater = (value) => {
        if (value === "" || !value) {
            ContactEmail.setFeedbackMessage(
                "Field required!"
            );
            ContactEmail.setMessageType("error");
            return false;
        }
        ContactEmail.setFeedbackMessage("");
        ContactEmail.setMessageType("none");
        return true;
    };

    const ContactPhone = useInputComponent('');
    const ContactPhoneValidater = (value) => {
        if (value === "" || !value) {
            ContactPhone.setFeedbackMessage(
                "Field required!"
            );
            ContactPhone.setMessageType("error");
            return false;
        }
        ContactPhone.setFeedbackMessage("");
        ContactPhone.setMessageType("none");
        return true;
    };


    const Longitude = useInputComponent('');
    const LongitudeValidater = (value) => {
        if (value === "" || !value) {
            Longitude.setFeedbackMessage(
                "Field required!"
            );
            Longitude.setMessageType("error");
            return false;
        }
        Longitude.setFeedbackMessage("");
        Longitude.setMessageType("none");
        return true;
    };

    const Latitude = useInputComponent('');
    const LatitudeValidater = (value) => {
        if (value === "" || !value) {
            Latitude.setFeedbackMessage(
                "Field required!"
            );
            Latitude.setMessageType("error");
            return false;
        }
        Latitude.setFeedbackMessage("");
        Latitude.setMessageType("none");
        return true;
    };



    const Pincode = useInputComponent('');
    const PincodeValidater = (value) => {
        if (value === "" || !value) {
            Pincode.setFeedbackMessage(
                "Field required!"
            );
            Pincode.setMessageType("error");
            return false;
        }
        Pincode.setFeedbackMessage("");
        Pincode.setMessageType("none");
        return true;
    };

    const [StateType, setStateType] = useState('');
    const [StateTypeIsTouch, setStateTypeIsTouch] = useState(false);

    const [StateTypeMessage, setStateTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const StateTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setStateTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setStateTypeMessage({ type: "info", message: "" });

        return true;
    };


    const [CityType, setCityType] = useState('');
    const [CityTypeIsTouch, setCityTypeIsTouch] = useState(false);

    const [CityTypeMessage, setCityTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const CityTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setCityTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setCityTypeMessage({ type: "info", message: "" });

        return true;
    };

    const SubmitHandler = () => {

        CenterNameValidater(CenterName.enteredValue);
        CenterAddressValidater(CenterAddress.enteredValue);
        ContactEmailValidater(ContactEmail.enteredValue);
        ContactPhoneValidater(ContactPhone.enteredValue);
        // FacilitiesValidater(Facilities.enteredValue);
        LongitudeValidater(Longitude.enteredValue);
        LatitudeValidater(Latitude.enteredValue);
        CityTypeSelectValidater(CityType);
        StateTypeSelectValidater(StateType);
        PincodeValidater(Pincode.enteredValue);

        console.log(CenterName.enteredValue, CenterAddress.enteredValue, ContactEmail.enteredValue, ContactPhone.enteredValue, Longitude.enteredValue, Latitude.enteredValue, Pincode.enteredValue, CityType, StateType);

        let CenterNameValidator = commonValidate(CenterName.enteredValue);
        let CenterAddressValidator = commonValidate(CenterAddress.enteredValue);
        let ContactEmailValidator = commonValidate(ContactEmail.enteredValue);
        let ContactPhoneValidator = commonValidate(ContactPhone.enteredValue);
        // let FacilitiesValidator = commonValidate(Facilities.enteredValue);
        let LongitudeValidator = commonValidate(Longitude.enteredValue);
        let LatitudeValidator = commonValidate(Latitude.enteredValue);
        let CityValidator = commonValidate(CityType);
        let StateValidator = commonValidate(StateType);
        let PincodeValidator = commonValidate(Pincode.enteredValue);

        if (!CenterNameValidator ||
            !CenterAddressValidator ||
            !ContactEmailValidator ||
            !ContactPhoneValidator ||
            !facilitiesData ||
            !LongitudeValidator ||
            !LatitudeValidator ||
            !CityValidator ||
            !StateValidator ||
            !PincodeValidator) {
            // Handle validation failure, e.g., show error messages or prevent form submission
            console.log("Validation failed for one or more fields.");
        } else {
            // All fields passed validation
            console.log("All fields passed validation.");
        }


    }


    return (
        <div className='bg-white pt-2 mt-2' style={{ borderRadius: '5px' }}>
            <h3 className="mb-4 px-3 py-2 mt-2  " >
                Center Details
            </h3>


            <div className=" my-3  py-4 px-3"  >

                <div className='row'>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Center Name"
                            className="loginInputs"

                            setValue={CenterName.setEnteredValue}
                            value={CenterName.enteredValue}
                            feedbackMessage={CenterName.feedbackMessage}
                            feedbackType={CenterName.messageType}
                            isTouched={CenterName.isTouched}
                            setIsTouched={CenterName.setIsTouched}

                            validateHandler={CenterNameValidater}
                            reset={CenterName.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Centers Timing"
                            className="loginInputs"

                            setValue={Timing.setEnteredValue}
                            value={Timing.enteredValue}
                            feedbackMessage={Timing.feedbackMessage}
                            feedbackType={Timing.messageType}
                            isTouched={Timing.isTouched}
                            setIsTouched={Timing.setIsTouched}

                            validateHandler={TimingValidater}
                            reset={Timing.reset}
                            isRequired={true}
                        />
                    </div>


                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Contact Email"
                            className="loginInputs"

                            setValue={ContactEmail.setEnteredValue}
                            value={ContactEmail.enteredValue}
                            feedbackMessage={ContactEmail.feedbackMessage}
                            feedbackType={ContactEmail.messageType}
                            isTouched={ContactEmail.isTouched}
                            setIsTouched={ContactEmail.setIsTouched}

                            validateHandler={ContactEmailValidater}
                            reset={ContactEmail.reset}
                            isRequired={true}
                        />

                    </div>


                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Contact Phone"
                            className="loginInputs"

                            setValue={ContactPhone.setEnteredValue}
                            value={ContactPhone.enteredValue}
                            feedbackMessage={ContactPhone.feedbackMessage}
                            feedbackType={ContactPhone.messageType}
                            isTouched={ContactPhone.isTouched}
                            setIsTouched={ContactPhone.setIsTouched}

                            validateHandler={ContactPhoneValidater}
                            reset={ContactPhone.reset}
                            isRequired={true}
                        />


                    </div>






                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Longitude"
                            className="loginInputs"

                            setValue={Longitude.setEnteredValue}
                            value={Longitude.enteredValue}
                            feedbackMessage={Longitude.feedbackMessage}
                            feedbackType={Longitude.messageType}
                            isTouched={Longitude.isTouched}
                            setIsTouched={Longitude.setIsTouched}

                            validateHandler={LongitudeValidater}
                            reset={Longitude.reset}
                            isRequired={true}
                        />


                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Latitude"
                            className="loginInputs"

                            setValue={Latitude.setEnteredValue}
                            value={Latitude.enteredValue}
                            feedbackMessage={Latitude.feedbackMessage}
                            feedbackType={Latitude.messageType}
                            isTouched={Latitude.isTouched}
                            setIsTouched={Latitude.setIsTouched}

                            validateHandler={LatitudeValidater}
                            reset={Latitude.reset}
                            isRequired={true}
                        />


                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">


                        <InputSelect
                            setValue={setStateType}
                            value={StateType}
                            options={[

                            ]}
                            isTouched={StateTypeIsTouch}
                            setIsTouched={setStateTypeIsTouch}
                            className="py-1"
                            label={"State"}
                            isRequired={true}
                            feedbackMessage={StateTypeMessage?.message}
                            feedbackType={StateTypeMessage?.type}
                            validateHandler={StateTypeSelectValidater}
                        />


                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <InputSelect
                            setValue={setCityType}
                            value={CityType}
                            options={[

                            ]}
                            isTouched={CityTypeIsTouch}
                            setIsTouched={setCityTypeIsTouch}
                            className="py-1"
                            label={"City"}
                            isRequired={true}
                            feedbackMessage={CityTypeMessage?.message}
                            feedbackType={CityTypeMessage?.type}
                            validateHandler={CityTypeSelectValidater}
                        />
                    </div>



                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <InputWithAddOn
                            label="Pincode"
                            className="loginInputs"

                            setValue={Pincode.setEnteredValue}
                            value={Pincode.enteredValue}
                            feedbackMessage={Pincode.feedbackMessage}
                            feedbackType={Pincode.messageType}
                            isTouched={Pincode.isTouched}
                            setIsTouched={Pincode.setIsTouched}

                            validateHandler={PincodeValidater}
                            reset={Pincode.reset}
                            isRequired={true}
                        />


                    </div>


                    <div className="col-lg-12 col-md-12 col-sm-12 ">

                        <InputTextArea
                            label="Center Address"
                            className="loginInputs"

                            setValue={CenterAddress.setEnteredValue}
                            value={CenterAddress.enteredValue}
                            feedbackMessage={CenterAddress.feedbackMessage}
                            feedbackType={CenterAddress.messageType}
                            isTouched={CenterAddress.isTouched}
                            setIsTouched={CenterAddress.setIsTouched}

                            validateHandler={CenterAddressValidater}
                            reset={CenterAddress.reset}
                            isRequired={true}
                        />
                    </div>

                    <div className='col-12'>
                        <div className=''>
                            <hr />

                        </div>

                        <h5 className="mb-4 mt-2">
                            Add Facilities
                        </h5>


                    </div>
                </div>

                {(facilitiesData ?? []).map((facilityItem, index) => {
                    return <FacilitiesSection facilityItem={facilityItem} key={index} setFacilitiesData={setFacilitiesData} />
                })}


                <div className='my-2 '>
                    <p>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setFacilitiesData(prev => { return [...prev, { facility: '', id: uuid() }] }) }}>
                            <span style={{ backgroundColor: 'blue', color: 'white', borderRadius: '50%', padding: '0px 5px 1px 6px' }}>+</span> <span style={{ color: 'blue', fontSize: '18px', fontWeight: '500' }}>Add more facilities</span>
                        </span>

                    </p>
                </div>


                <div className="mt-5 text-end">
                    <button onClick={() => { SubmitHandler(); setisSubmit(true) }} className="btn btn-success px-4 ">Add Center</button>
                </div>

            </div>

        </div>


    )
}

export default CreateCenter


const FacilitiesSection = ({ facilityItem, key, setFacilitiesData }) => {
    const Facilities = useInputComponent('');
    const FacilitiesValidater = (value) => {
        if (value === "" || !value) {
            Facilities.setFeedbackMessage(
                "Field required!"
            );
            Facilities.setMessageType("error");
            return false;
        }
        Facilities.setFeedbackMessage("");
        Facilities.setMessageType("none");
        return true;
    };

    const insertFacility = (value) => {
        // console.log(sdbj);

        setFacilitiesData(prev => {

            let facilityListing = (prev ?? []).map((facilityObject) => {
                if (facilityObject?.id == facilityItem?.id) {
                    return { ...facilityObject, ['facility']: value }
                }
                else {
                    return { ...facilityObject }

                }
            })
            return facilityListing

        })
    }


    const deleteFacility = () => {

        setFacilitiesData(prev => {



            let facilityListing = (prev ?? []).filter((facilityObject) => {


                if (facilityObject?.id === facilityItem?.id) {

                }
                else {
                    return facilityObject
                }
            })
            return facilityListing


        })
    }

    useEffect(() => {
        if (facilityItem) {
            Facilities.setEnteredValue(facilityItem.facility ?? '')
        }
    }, [facilityItem])

    return (
        <>
            <div className="col-lg-8 col-md-8 col-sm-12 " key={key}>
                <div className='row'>
                    <div className='col-9'>
                        <InputWithAddOn
                            label="Facilities"
                            className="loginInputs"

                            setValue={Facilities.setEnteredValue}
                            value={Facilities.enteredValue}
                            feedbackMessage={Facilities.feedbackMessage}
                            feedbackType={Facilities.messageType}
                            isTouched={Facilities.isTouched}
                            setIsTouched={Facilities.setIsTouched}

                            validateHandler={FacilitiesValidater}
                            reset={Facilities.reset}
                            isRequired={true}
                            onBlurAction={(e) => {
                                insertFacility(e)
                            }}
                        />
                    </div>
                    <div className='col-3 ' style={{ paddingTop: '29px', boxSizing: 'border-box' }}>
                        <button onClick={() => { deleteFacility() }} className='' style={{ border: '2px solid red', borderRadius: '10px', color: 'red', fontSize: '15px', fontWeight: '500', backgroundColor: 'white', padding: '2px 10px' }}>X <span>Remove</span></button>


                    </div>

                </div>

            </div>
        </>
    )
}