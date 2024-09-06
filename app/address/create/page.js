"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from "@/components/formInput/select/InputSelect";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
const Address = ({ toggle, modal, AddressHandler, isupdate = false, update }) => {



    const HouseNO = useInputComponent('');
    const FullnameValidater = (value) => {
        if (value === "" || !value) {
            HouseNO.setFeedbackMessage(
                "Field required!"
            );
            HouseNO.setMessageType("error");
            return false;
        }
        HouseNO.setFeedbackMessage("");
        HouseNO.setMessageType("none");
        return true;
    };



    const Address = useInputComponent('');
    const DOBValidater = (value) => {
        if (value === "" || !value) {
            Address.setFeedbackMessage(
                "Field required!"
            );
            Address.setMessageType("error");
            return false;
        }
        Address.setFeedbackMessage("");
        Address.setMessageType("none");
        return true;
    };


    const [SaveASType, setSaveASType] = useState();
    const [SaveASTypeIsTouch, setSaveASTypeIsTouch] = useState(false);

    const [SaveASTypeMessage, setSaveASTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const SaveASTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setSaveASTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setSaveASTypeMessage({ type: "info", message: "" });

        return true;
    };

    const SaveASoption = [
        { label: "Home", value: "home" },
        { label: "Office", value: "office" },
        { label: "Others", value: "other" }
    ];




    const State = useInputComponent("");
    const StateValidater = (value) => {
        if (value === "" || !value) {
            State.setFeedbackMessage("Field required!");
            State.setMessageType("error");
            return false;
        }
        State.setFeedbackMessage("");
        State.setMessageType("none");
        return true;
    };


    const City = useInputComponent("");
    const CityValidater = (value) => {
        if (value === "" || !value) {
            City.setFeedbackMessage("Field required!");
            City.setMessageType("error");
            return false;
        }
        City.setFeedbackMessage("");
        City.setMessageType("none");
        return true;
    };


    const Phone = useInputComponent("");
    const PhoneValidater = (value) => {
        if (value === "" || !value) {
            Phone.setFeedbackMessage("Field required!");
            Phone.setMessageType("error");
            return false;
        }
        Phone.setFeedbackMessage("");
        Phone.setMessageType("none");
        return true;
    };

    const Pincode = useInputComponent("");
    const PincodeValidater = (value) => {
        if (value === "" || !value) {
            Pincode.setFeedbackMessage("Field required!");
            Pincode.setMessageType("error");
            return false;
        }
        Pincode.setFeedbackMessage("");
        Pincode.setMessageType("none");
        return true;
    };






    const [addressResponse, addressHandler] = useAPI(
        {
            url: "/address/create",
            method: "post",
        },
        (e) => {
            toggle()

            HouseNO.reset()
            Address.reset()
            State.reset()
            setSaveASType()
            State.reset()
            Phone.reset()
            Pincode.reset()
            City.reset()

            AddressHandler()

            return toast.success("Address has been added successfully");
        },
        (e) => {

            return toast.error("Something went wrong while creating Address!"
            );
            return e;
        }
    );



    useEffect(() => {
        if (update) {
            HouseNO?.setEnteredValue(update?.houseNo)
            Address.setEnteredValue(update?.addressLine1)
            State.setEnteredValue(update?.state)
            Phone.setEnteredValue(update?.phone)
            City.setEnteredValue(update?.city)
            Pincode.setEnteredValue(update?.pincode)
            setSaveASType(update?.addressType)

        }
    }, [update])


    const [UpdateAddressResponse, UpdateAddressHandler] = useAPI(
        {
            url: `/address/${update?._id}`,
            method: "put",
        },
        (e) => {

            toggle()
            toast.success("Address updated successfully");


        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating Body Part!",
                    e
                )
            );
            return e;
        }
    );



    const submit = () => {
        var isFullnameValidater = FullnameValidater(HouseNO.enteredValue)
        var isDOBValidater = DOBValidater(Address.enteredValue)
        var isSaveASTypeSelectValidater = SaveASTypeSelectValidater(SaveASType)
        var isStateValidater = StateValidater(State.enteredValue)
        var isPhoneValidater = PhoneValidater(Phone.enteredValue)
        var isPincodeValidater = PincodeValidater(Pincode.enteredValue)
        var isCityValidater = CityValidater(City.enteredValue)


        if (!isFullnameValidater || !isDOBValidater || !isSaveASTypeSelectValidater
            || !isStateValidater || !isPhoneValidater || !isPincodeValidater || !isCityValidater) {
            toast.error(
                "Fill Required fields!"
            );
        } else {
            if (isupdate) {
                UpdateAddressHandler({
                    body: {
                        houseNo: HouseNO.enteredValue,
                        addressLine1: Address.enteredValue,
                        state: State.enteredValue,
                        addressType: SaveASType,
                        phone: Phone?.enteredValue,
                        pincode: Pincode?.enteredValue,
                        city: City?.enteredValue ?? "",
                    }
                })
            } else {
                addressHandler({
                    body: {
                        houseNo: HouseNO.enteredValue,
                        addressLine1: Address.enteredValue,
                        state: State.enteredValue,
                        addressType: SaveASType,
                        phone: Phone?.enteredValue,
                        pincode: Pincode?.enteredValue,
                        city: City?.enteredValue ?? "",

                    }
                })
            }

        }
    }





    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={toggle}
                size="lg"

            >
                <ModalHeader toggle={toggle}>Add Address</ModalHeader>
                <ModalBody>
                    <div className='row'>

                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <InputSelect
                                setValue={setSaveASType}
                                value={SaveASType}
                                options={SaveASoption ?? []}
                                isTouched={SaveASTypeIsTouch}
                                setIsTouched={setSaveASTypeIsTouch}
                                className="py-1"
                                label={"Save as"}
                                isRequired={true}
                                feedbackMessage={SaveASTypeMessage?.message}
                                feedbackType={SaveASTypeMessage?.type}
                                validateHandler={SaveASTypeSelectValidater}
                            />
                        </div>


                        <div className="col-sm-6 col-12">
                            <InputWithAddOn
                                placeholder="House No/Flat No"
                                label="House No/Flat No"
                                className="loginInputs"
                                setValue={HouseNO.setEnteredValue}
                                value={HouseNO.enteredValue}
                                feedbackMessage={HouseNO.feedbackMessage}
                                feedbackType={HouseNO.messageType}
                                isTouched={HouseNO.isTouched}
                                setIsTouched={HouseNO.setIsTouched}
                                validateHandler={FullnameValidater}
                                reset={HouseNO.reset}
                                isRequired={true}
                            />
                        </div>


                        <div className="col-12">
                            <InputWithAddOn
                                placeholder="Address"
                                label="Address"
                                className="loginInputs"
                                // type="date"
                                setValue={Address.setEnteredValue}
                                value={Address.enteredValue}
                                feedbackMessage={Address.feedbackMessage}
                                feedbackType={Address.messageType}
                                isTouched={Address.isTouched}
                                setIsTouched={Address.setIsTouched}
                                validateHandler={DOBValidater}
                                reset={Address.reset}
                                isRequired={true}
                            />
                        </div>


                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputWithAddOn
                                label="Phone Number"
                                placeholder="Phone"
                                className="loginInputs"
                                type="number"
                                setValue={Phone.setEnteredValue}
                                value={Phone.enteredValue}
                                feedbackMessage={Phone.feedbackMessage}
                                feedbackType={Phone.messageType}
                                isTouched={Phone.isTouched}
                                setIsTouched={Phone.setIsTouched}
                                validateHandler={PhoneValidater}
                                reset={Phone.reset}
                                isRequired={true}
                            />
                        </div>




                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputWithAddOn
                                label="Pincode"
                                placeholder="Pincode"
                                className="loginInputs"
                                type="number"
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

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputWithAddOn
                                label="State"
                                placeholder="State"
                                className="loginInputs"
                                setValue={State.setEnteredValue}
                                value={State.enteredValue}
                                feedbackMessage={State.feedbackMessage}
                                feedbackType={State.messageType}
                                isTouched={State.isTouched}
                                setIsTouched={State.setIsTouched}
                                validateHandler={StateValidater}
                                reset={State.reset}
                                isRequired={true}
                            />
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputWithAddOn
                                label="City"
                                placeholder="City"
                                className="loginInputs"
                                // type="number"
                                setValue={City.setEnteredValue}
                                value={City.enteredValue}
                                feedbackMessage={City.feedbackMessage}
                                feedbackType={City.messageType}
                                isTouched={City.isTouched}
                                setIsTouched={City.setIsTouched}
                                validateHandler={CityValidater}
                                reset={City.reset}
                                isRequired={true}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={submit}>
                        {(addressResponse?.fetching || UpdateAddressResponse?.fetching) ? (
                            <Spinner size={"sm"} />
                        ) : (
                            isupdate ? "Update Details" : "Save Details"
                        )}
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}



export default Address;