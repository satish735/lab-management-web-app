"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from "@/components/formInput/select/InputSelect";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import { useSession } from "next-auth/react";
import transformErrorDefault from "@/utils/transformErrorDefault";
import axios from 'axios';


const Address = ({ toggle, modal, AddressHandler, isupdate = false, update }) => {

    const session = useSession()

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



    const CityInput = useInputComponent("");
    const CityInputValidater = (value) => {
        if (value === "" || !value) {
            CityInput.setFeedbackMessage("Field required!");
            CityInput.setMessageType("error");
            return false;
        }
        CityInput.setFeedbackMessage("");
        CityInput.setMessageType("none");
        return true;
    };
    const StateInput = useInputComponent("");
    const StateInputValidater = (value) => {
        if (value === "" || !value) {
            StateInput.setFeedbackMessage("Field required!");
            StateInput.setMessageType("error");
            return false;
        }
        StateInput.setFeedbackMessage("");
        StateInput.setMessageType("none");
        return true;
    };

    const [stateListResponse, StateListHandler] = useAPI(
        {
            url: "/states/in",
            method: "get",
            sendImmediately: true,
        },
        (e) => {
            return e?.data.map((stateItem) => {
                if (stateItem?.state_code === 'RJ') {
                    return { label: stateItem?.name, value: stateItem?.state_code };

                }
                else {
                    return { label: stateItem?.name, value: stateItem?.state_code };

                }
            });
        },
        (e) => {
            toast.error(
                transformErrorDefault(
                    "Something went wrong while Loading StateInput List!",
                    e
                )
            );
            return e;
        }
    );
    const [cityListResponse, CityListHandler] = useAPI(
        {
            url: `/cities/${StateInput?.enteredValue}`,
            method: "get",
        },
        (e) => {
            return e?.data.map((cityItem) => {
                return { label: cityItem?.name, value: cityItem?.name };
            });
        },
        (e) => {
            toast.error(
                transformErrorDefault(
                    "Something went wrong while Loading City List!",
                    e
                )
            );
            return e;
        }
    );

    useEffect(() => {
        if (StateInput?.enteredValue && StateInput?.enteredValue != "") {

            CityListHandler({
                url: `/cities/${StateInput?.enteredValue}`,
            });
        }
    }, [StateInput?.enteredValue]);


    const Phone = useInputComponent("");

    const PhoneValidater = (value) => {
        const phoneRegex = /^\d{10}$/;

        if (value === "" || !value) {
            Phone.setFeedbackMessage("Required!");
            Phone.setMessageType("error");
            return false;
        }

        if (!phoneRegex.test(value)) {
            Phone.setFeedbackMessage("Invalid number!");
            Phone.setMessageType("error");
            return false;
        }

        Phone.setFeedbackMessage("");
        Phone.setMessageType("none");
        return true;
    };


    const Pincode = useInputComponent("");

    const PincodeValidater = (value) => {
        const pincodeRegex = /^\d{6}$/;

        if (value === "" || !value) {
            Pincode.setFeedbackMessage("Required!");
            Pincode.setMessageType("error");
            return false;
        }

        if (!pincodeRegex.test(value)) {
            Pincode.setFeedbackMessage("Invalid pincode!");
            Pincode.setMessageType("error");
            return false;
        }

        Pincode.setFeedbackMessage("");
        Pincode.setMessageType("none");
        return true;
    };


    const ResetModel = () => {

        HouseNO.setEnteredValue()
        Address.setEnteredValue()
        setSaveASType()
        StateInput.setEnteredValue()
        Phone.setEnteredValue()
        Pincode.setEnteredValue()
        CityInput.setEnteredValue()

        AddressHandler()

        toggle()

    }


    const [addressResponse, addressHandler] = useAPI(
        {
            url: "/address/create",
            method: "post",
        },
        (e) => {
            ResetModel()

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
            StateInput.setEnteredValue(update?.state)
            Phone.setEnteredValue(update?.phone)
            CityInput.setEnteredValue(update?.city)
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

            ResetModel()
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







    const submit =async () => {
        var isFullnameValidater = FullnameValidater(HouseNO.enteredValue)
        var isDOBValidater = DOBValidater(Address.enteredValue)
        var isSaveASTypeSelectValidater = SaveASTypeSelectValidater(SaveASType)
        var isPhoneValidater = PhoneValidater(Phone.enteredValue)
        var isPincodeValidater = PincodeValidater(Pincode.enteredValue)
        let isCityInputValidater = CityInputValidater(CityInput?.enteredValue)
        let isStateInputValidater = StateInputValidater(StateInput?.enteredValue)

        let address = `${HouseNO?.enteredValue ?? ""} ${Address?.enteredValue ?? ""} ${CityInput?.enteredValue} ${StateInput?.enteredValue} ${Pincode?.enteredValue} `


        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );


        if (!isFullnameValidater || !isDOBValidater || !isSaveASTypeSelectValidater
            || !isStateInputValidater || !isPhoneValidater || !isPincodeValidater || !isCityInputValidater) {
            toast.error(
                "Fill Required fields!"
            );
        } else {
            if (response.data.status === 'OK') {


                let latlng = response?.data?.results[0]?.geometry?.location

                if (isupdate) {
                    UpdateAddressHandler({
                        body: {
                            houseNo: HouseNO.enteredValue,
                            addressLine1: Address.enteredValue,
                            state: StateInput.enteredValue,
                            addressType: SaveASType,
                            phone: Phone?.enteredValue,
                            pincode: Pincode?.enteredValue,
                            city: CityInput?.enteredValue ?? "",
                            lat:latlng?.lat ?? null,
                            lng: latlng?.lng ?? null
                        }
                    })
                } else {
                    addressHandler({
                        body: {
                            houseNo: HouseNO.enteredValue,
                            addressLine1: Address.enteredValue,
                            state: StateInput.enteredValue,
                            addressType: SaveASType,
                            phone: Phone?.enteredValue,
                            pincode: Pincode?.enteredValue,
                            city: CityInput?.enteredValue ?? "",
                            userId: session?.data?.user?.id,
                            lat:latlng?.lat ?? null,
                            lng: latlng?.lng ?? null

                        }
                    })
                }

            }



        }
    }





    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={ResetModel}
                size="lg"

            >
                <ModalHeader toggle={ResetModel}>Add Address</ModalHeader>
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

                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <InputSelect
                                options={stateListResponse?.data ?? []}
                                label="State "
                                className="loginInputs"
                                setValue={StateInput.setEnteredValue}
                                value={StateInput.enteredValue}
                                feedbackMessage={StateInput.feedbackMessage}
                                feedbackType={StateInput.messageType}
                                isTouched={StateInput.isTouched}
                                setIsTouched={StateInput.setIsTouched}
                                validateHandler={StateInputValidater}
                                reset={StateInput.reset}
                                isRequired={true}
                                isLoading={stateListResponse?.fetching}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputSelect
                                options={cityListResponse?.data ?? []}
                                label="City"
                                className="loginInputs"
                                setValue={CityInput.setEnteredValue}
                                value={CityInput.enteredValue}
                                feedbackMessage={CityInput.feedbackMessage}
                                feedbackType={CityInput.messageType}
                                isTouched={CityInput.isTouched}
                                setIsTouched={CityInput.setIsTouched}
                                validateHandler={CityInputValidater}
                                reset={CityInput.reset}
                                isRequired={true}
                                isLoading={cityListResponse?.fetching}
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
                    <Button color="secondary" onClick={ResetModel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}



export default Address;