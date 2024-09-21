"use client"
import InputTextArea from '@/components/formInput/InputTextArea'
import InputWithAddOn from '@/components/formInput/InputWithAddOn'
import InputMultipleSelect from '@/components/formInput/select/InputMultipleSelect'
import InputSelect from '@/components/formInput/select/InputSelect'
import useAPI from '@/hooks/useAPI'
import useInputComponent from '@/hooks/useInputComponent'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const CreateHomeCollectionModal = ({ samplesToCollect = [], isOpen = false, setIsOpen = () => { }, successHandler = () => { }, bookingDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [getUserResponse, getUserHandler] = useAPI(
        {
            url: `/adminlogin/center-users?center_id=${bookingDetails?.centerId}`,
            method: "get",
            sendImmediately: true
        },
        (e) => {
            return e?.data ?? [];
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Fetching User List!", e)
            );
            return e;
        }
    );
    const Name = useInputComponent("");
    const NameValidater = (value) => {
        if (value === "" || !value) {
            Name.setFeedbackMessage("Field required!");
            Name.setMessageType("error");
            return false;
        }
        Name.setFeedbackMessage("");
        Name.setMessageType("none");
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
    useEffect(() => {
        if (Array.isArray(getUserResponse.data) && selectedUserId) {
            var userDetails = getUserResponse.data.find(item => item?._id == selectedUserId)
            Name.setEnteredValue(userDetails?.name)
            Phone.setEnteredValue(userDetails?.phone)
            PhoneValidater(userDetails?.phone)
            NameValidater(userDetails?.name)

        }
    }, [selectedUserId])
    const [createHomeCollectionResponse, createHomeCollectionAPIHandler] = useAPI(
        {
            url: `/home-collections`,
            method: "post",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Home Collection has been created Successfully.");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Creating HomeCollection!", e)
            );
            return e;
        }
    );
    const createHomeCollectionHandler = async () => {
        if (!bookingDetails?.id) {
            toast.error("Booking details not found while Creating HomeCollection!")
            return
        }
        var nameIsValid = NameValidater(Name?.enteredValue)
        var phoneIsValid = PhoneValidater(Phone?.enteredValue)

        if (!nameIsValid || !phoneIsValid) {
            toast.error("Please validate all fields before continuing!")
            return
        }
        await createHomeCollectionAPIHandler({
            body: {
                booking_id: bookingDetails?.id,
                collectedBy: selectedUserId ?? null,
                collectedByName: Name?.enteredValue,
                collectedByContact: Phone?.enteredValue,
                samples_for_pick: samplesToCollect
            }
        })

    }
    return (
        <Modal size="lg" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Create Home Collection</h1>
                <p className="modal-sub-heading">Create Home collection for booking :- <strong>{bookingDetails?.bookingId}</strong>.</p>
            </ModalHeader>
            <ModalBody className='py-2'>
                <div className='row'>
                    <div className='col-md-6 col-12'> <InputSelect
                        isLoading={getUserResponse?.fetching}
                        setValue={setSelectedUserId}
                        value={selectedUserId}
                        options={Array.isArray(getUserResponse?.data) ? getUserResponse?.data.map(item => {
                            return { label: item?.name, value: item?._id }
                        }) : []}
                        className="py-1"
                        label={"Select Collection Person from list (optional)"}
                    /></div>
                    <div className='col-md-6 col-12'> <InputMultipleSelect
                        isLoading={false}

                        setValue={() => { }}
                        value={Array.isArray(samplesToCollect) ? samplesToCollect.map(item => {
                            return { label: item, value: item }
                        }) : []}
                        options={Array.isArray(samplesToCollect) ? samplesToCollect.map(item => {
                            return { label: item, value: item }
                        }) : []}
                        className="py-1"
                        label={"Samples to collect"}
                    /></div>
                    <div className='col-md-6 col-12'> <InputWithAddOn
                        label="Collection Person Name"
                        placeholder="Name"
                        className="loginInputs"
                        type="text"
                        setValue={Name.setEnteredValue}
                        value={Name.enteredValue}
                        feedbackMessage={Name.feedbackMessage}
                        feedbackType={Name.messageType}
                        isTouched={Name.isTouched}
                        setIsTouched={Name.setIsTouched}
                        validateHandler={NameValidater}
                        reset={Name.reset}
                        isRequired={true}
                    /> </div>
                    <div className='col-md-6 col-12'> <InputWithAddOn
                        label="Collection Person Contact Phone"
                        placeholder="Phone Number"
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
                    /> </div>
                </div>

                {/* <InputTextArea
                    label="Remarks"
                    setValue={setDescription}
                    value={description} /> */}
            </ModalBody>
            <ModalFooter className=''>
                <button className="me-2 btn btn-theme secondary-outline" onClick={toggle} disabled={createHomeCollectionResponse?.fetching || getUserResponse?.fetching} >Cancel</button>
                <button className="me-2 btn btn-theme primary" style={{ minWidth: "120px" }} disabled={createHomeCollectionResponse?.fetching || getUserResponse?.fetching} onClick={createHomeCollectionHandler}>{createHomeCollectionResponse?.fetching ? (
                    <Spinner size={"sm"} />
                ) : (
                    "Create"
                )}</button>
            </ModalFooter>
        </Modal>
    )
}

export default CreateHomeCollectionModal
