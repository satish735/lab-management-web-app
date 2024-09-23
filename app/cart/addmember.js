"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from "@/components/formInput/select/InputSelect";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import moment from "moment";
import transformErrorDefault from "@/utils/transformErrorDefault";
import {  useSession } from "next-auth/react";


const Addmember = ({ toggle, modal, refresh, isupdate, update }) => {
    const session = useSession()

    var user = session?.data?.user?.otherDetails



    const Name = useInputComponent('');
    const FullnameValidater = (value) => {
        if (value === "" || !value) {
            Name.setFeedbackMessage(
                "Field required!" 
            );
            Name.setMessageType("error");
            return false;
        }
        Name.setFeedbackMessage("");
        Name.setMessageType("none");
        return true;
    };



    const DOB = useInputComponent('');
    const DOBValidater = (value) => {
        if (value === "" || !value) {
            DOB.setFeedbackMessage(
                "Field required!"
            );
            DOB.setMessageType("error");
            return false;
        }
        DOB.setFeedbackMessage("");
        DOB.setMessageType("none");
        return true;
    };


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
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];




    const Email = useInputComponent("");
    const EmailValidater = (value) => {
        if (value === "" || !value) {
            Email.setFeedbackMessage("Field required!");
            Email.setMessageType("error");
            return false;
        }
        Email.setFeedbackMessage("");
        Email.setMessageType("none");
        return true;
    };


    const relationOptions = [
        { label: "Father", value: "father" },
        { label: "Mother", value: "mother" },
        { label: "Brother", value: "brother" },
        { label: "Sister", value: "sister" },
        { label: "Husband", value: "husband" },
        { label: "Wife", value: "wife" },
        { label: "Son", value: "son" },
        { label: "Daughter", value: "daughter" },
        { label: "Uncle", value: "uncle" },
        { label: "Aunt", value: "aunt" },
        { label: "Cousin", value: "cousin" },
        { label: "Nephew", value: "nephew" },
        { label: "Niece", value: "niece" },
        { label: "Grandfather", value: "grandfather" },
        { label: "Grandmother", value: "grandmother" },
        { label: "Grandson", value: "grandson" },
        { label: "Granddaughter", value: "granddaughter" },
        { label: "Friend", value: "friend" },
    ];

    const [relationType, setrelationType] = useState();
    const [relationTypeIsTouch, setrelationTypeIsTouch] = useState(false);

    const [relationTypeMessage, setrelationTypeMessage] = useState({
        type: "info",
        message: "",
    });
    const relationTypeSelectValidater = (value) => {
        if (value === "" || !value) {
            setrelationTypeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setrelationTypeMessage({ type: "info", message: "" });

        return true;
    };

const reset = ()=> {
    toggle()
    Name.reset()
    DOB.reset()
    Email.reset()
    setGenderType()
    setrelationType()
}


    const [addmemberResponse, addmemberHandler] = useAPI(
        {
            url: "/member/create",
            method: "post",
        },
        (e) => {
            refresh()
            reset()

            return toast.success("Member has been add successfully");
        },
        (e) => {

            return toast.error(
                transformErrorDefault(
                    "Something went wrong while creating Member!",
                    e
                )
            );
            return e;
        }
    );


    useEffect(() => {
        if (isupdate) {
            Name.setEnteredValue(update?.name ?? "")
            DOB?.setEnteredValue(moment(update?.dob)?.format("YYYY-MM-DD") ?? "")
            setGenderType(update?.gender)
            Email?.setEnteredValue(update?.email ?? "")
            setrelationType(update?.relation)
        }
    }, [update])

    const [UpdateMemberResponse, UpdateMemberHandler] = useAPI(
        {
            url: `/member/${update?._id}`,
            method: "put",
        },
        (e) => {
            refresh()
            reset()
            toast.success("Member updated successfully");


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
        var isFullnameValidater = FullnameValidater(Name.enteredValue)
        var isDOBValidater = DOBValidater(DOB.enteredValue)
        var isGenderTypeSelectValidater = GenderTypeSelectValidater(GenderType)
        var isEmailValidater = EmailValidater(Email.enteredValue)
        var isrelationTypeSelectValidater = relationTypeSelectValidater(relationType)

        if (!isFullnameValidater || !isDOBValidater || !isGenderTypeSelectValidater || !isEmailValidater || !isrelationTypeSelectValidater) {
            toast.error(
                "Fill required fields!"
            );
        } else {
            if (isupdate) {
                UpdateMemberHandler({
                    body: {
                        name: Name.enteredValue,
                        dob: DOB.enteredValue,
                        gender: GenderType,
                        email: Email.enteredValue,
                        relation: relationType,
                        
                    }
                })
            } else {

                addmemberHandler({
                    body: {
                        name: Name.enteredValue,
                        dob: DOB.enteredValue,
                        gender: GenderType,
                        email: Email.enteredValue,
                        relation: relationType,
                        loginId:user?._id
                    }
                })
            }
        }
    }



    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={reset}
                size="xl"

            >
                <ModalHeader toggle={reset}>Add Member</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className="col-sm-6 col-12">
                            <InputWithAddOn
                                placeholder="Full Name"
                                label="Full Name"
                                className="loginInputs"
                                setValue={Name.setEnteredValue}
                                value={Name.enteredValue}
                                feedbackMessage={Name.feedbackMessage}
                                feedbackType={Name.messageType}
                                isTouched={Name.isTouched}
                                setIsTouched={Name.setIsTouched}
                                validateHandler={FullnameValidater}
                                reset={Name.reset}
                                isRequired={true}
                            />
                        </div>


                        <div className="col-sm-6 col-12">
                            <InputWithAddOn
                                placeholder="DOB"
                                label="DOB"
                                className="loginInputs"
                                type="date"
                                setValue={DOB.setEnteredValue}
                                value={DOB.enteredValue}
                                feedbackMessage={DOB.feedbackMessage}
                                feedbackType={DOB.messageType}
                                isTouched={DOB.isTouched}
                                setIsTouched={DOB.setIsTouched}
                                validateHandler={DOBValidater}
                                reset={DOB.reset}
                                isRequired={true}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
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

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputWithAddOn
                                label="Email"
                                placeholder="Email"
                                className="loginInputs"
                                setValue={Email.setEnteredValue}
                                value={Email.enteredValue}
                                feedbackMessage={Email.feedbackMessage}
                                feedbackType={Email.messageType}
                                isTouched={Email.isTouched}
                                setIsTouched={Email.setIsTouched}
                                validateHandler={EmailValidater}
                                reset={Email.reset}
                                isRequired={true}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <InputSelect
                                setValue={setrelationType}
                                value={relationType}
                                options={relationOptions ?? []}
                                isTouched={relationTypeIsTouch}
                                setIsTouched={setrelationTypeIsTouch}
                                className="py-1"
                                label={"relation"}
                                isRequired={true}
                                feedbackMessage={relationTypeMessage?.message}
                                feedbackType={relationTypeMessage?.type}
                                validateHandler={relationTypeSelectValidater}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={submit}>
                        {(UpdateMemberResponse?.fetching || addmemberResponse?.fetching) ? (
                            <Spinner size={"sm"} />
                        ) : (
                           isupdate ? "Update Deatils": "Save Details"
                        )}
                    </Button>{' '}
                    <Button color="secondary" onClick={reset}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}



export default Addmember;