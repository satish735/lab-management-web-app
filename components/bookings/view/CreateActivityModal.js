"use client"
import InputTextArea from '@/components/formInput/InputTextArea'
import InputWithAddOn from '@/components/formInput/InputWithAddOn'
import InputSelect from '@/components/formInput/select/InputSelect'
import useAPI from '@/hooks/useAPI'
import useInputComponent from '@/hooks/useInputComponent'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const CreateActivityModal = ({ isOpen = false, setIsOpen = () => { }, successHandler = () => { }, bookingDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    var typeSelectOptions = bookingDetails?.collectionType == "home" && bookingDetails?.homeCollection ? [
        { label: "HomeCollection", value: "home-collection" },
        { label: "Booking", value: "booking" },
    ] : [{ label: "Booking", value: "booking" }]
    const [selectedType, setSelectedType] = useState(null)
    const [selectedTypeIsTouched, setSelectedTypeIsTouched] = useState(null)
    const [TypeFeedBack, setTypeFeedBack] = useState({ message: "", type: "" })
    const typeValidator = (value) => {
        if (value === "" || !value) {
            setTypeFeedBack({
                message: "Field required!", type: "error"
            });

            return false;
        }
        setTypeFeedBack({
            message: "", type: "none"
        });
        return true;
    };
    const [description, setDescription] = useState("")

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
    const [createActivityResponse, createActivityAPIHandler] = useAPI(
        {
            url: `/bookings/activity`,
            method: "post",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Activity has been created successfully.");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Creating Activity!", e)
            );
            return e;
        }
    );
    const updateStatusHandler = async () => {

        var SelectedTypeIsValid = typeValidator(selectedType)
        var nameIsValid = NameValidater(Name?.enteredValue)
        if (!SelectedTypeIsValid || !nameIsValid) {
            toast.error("Please validate all fields before continuing!")
            return
        }
        var boookingHomeCollectionId = selectedType == "booking" ? bookingDetails?.id : bookingDetails?.homeCollection?.id
        if (!boookingHomeCollectionId) {
            toast.error("Booking details not found while Creating Activity!")
            return
        }
        await createActivityAPIHandler({
            body: {
                type: selectedType, id: boookingHomeCollectionId, name: Name?.enteredValue, description: description
            }
        })

    }
    return (
        <Modal size="lg" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Create Activity</h1>
                <p className="modal-sub-heading">Create Activity Record in system.</p>
            </ModalHeader>
            <ModalBody className='py-2'>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <InputSelect
                            setValue={setSelectedType}
                            value={selectedType}
                            options={typeSelectOptions ?? []}
                            isTouched={selectedTypeIsTouched}
                            setIsTouched={setSelectedTypeIsTouched}
                            className="py-1"
                            label={"Select Activity Type"}
                            isRequired={true}
                            feedbackMessage={TypeFeedBack?.message}
                            feedbackType={TypeFeedBack?.type}
                            validateHandler={typeValidator}
                        />
                    </div>
                    <div className='col-md-6 col-12'> </div>
                    <div className='col-md-6 col-12'> <InputWithAddOn
                        label="Activity Name"
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
                    /></div>
                    <div className='col-12'><InputTextArea
                        label="Activity Description"
                        setValue={setDescription}
                        value={description} /></div></div>
            </ModalBody>
            <ModalFooter className=''>
                <button className="me-2 btn btn-theme secondary-outline" onClick={toggle} disabled={createActivityResponse?.fetching} >Cancel</button>
                <button className="me-2 btn btn-theme primary" style={{ minWidth: "120px" }} disabled={createActivityResponse?.fetching} onClick={updateStatusHandler}>{createActivityResponse?.fetching ? (
                    <Spinner size={"sm"} />
                ) : (
                    "Create"
                )}</button>
            </ModalFooter>
        </Modal>
    )
}

export default CreateActivityModal
