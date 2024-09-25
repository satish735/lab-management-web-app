"use client"
import InputTextArea from '@/components/formInput/InputTextArea'
import InputWithAddOn from '@/components/formInput/InputWithAddOn'
import InputMultipleSelect from '@/components/formInput/select/InputMultipleSelect'
import InputSelect from '@/components/formInput/select/InputSelect'
import useAPI from '@/hooks/useAPI'
import useInputComponent from '@/hooks/useInputComponent'
import transformErrorDefault from '@/utils/transformErrorDefault'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const UpdateHomeCollectionModal = ({ samplesToCollect = [], isOpen = false, setIsOpen = () => { }, successHandler = () => { }, homeCollectionDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    var statusChangeOptions = [
        { label: "Picked", value: "picked", sequence: 2 },
        { label: "Confirmed", value: "confirmed", sequence: 3 },
        { label: "Cancelled", value: "cancelled", sequence: 4 },
    ];
    var getCurrentStatusSequence = statusChangeOptions.find((item) => item?.value == homeCollectionDetails?.collectionStatus)?.sequence ?? 0
    statusChangeOptions = statusChangeOptions.map((item) => { return { ...item, disabled: false } })
    // getCurrentStatusSequence >= item?.sequence ? true : false 
    const [selectedStatus, setSelectedStatus] = useState(null)
    const [selectedStatusIsTouched, setSelectedStatusIsTouched] = useState(null)
    const [statusFeedBack, setStatusFeedBack] = useState({ message: "", type: "" })
    const statusValidator = (value) => {
        if (value === "" || !value) {
            setStatusFeedBack({
                message: "Field required!", type: "error"
            });

            return false;
        }
        setStatusFeedBack({
            message: "", type: "none"
        });
        return true;
    };
    const [description, setDescription] = useState("")
    const [samplesCollected, setSamplesCollected] = useState(null)
    const pickUpDate = useInputComponent();
    const pickUpDateValidater = (value) => {
        if (!value || value == "") {
            pickUpDate.setFeedbackMessage("Required Field!");
            pickUpDate.setMessageType("error");
            return false;
        }
        pickUpDate.setFeedbackMessage(null);
        pickUpDate.setMessageType("none");
        return true;
    };

    const pickUpTime = useInputComponent();
    const pickUpTimeValidater = (value) => {
        if (!value || value == "") {
            pickUpTime.setFeedbackMessage("Required Field!");
            pickUpTime.setMessageType("error");
            return false;
        }
        pickUpTime.setFeedbackMessage(null);
        pickUpTime.setMessageType("none");
        return true;
    };

    const [updateStatusResponse, updateStatusAPIHandler] = useAPI(
        {
            url: `/home-collections`,
            method: "put",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Home Collection Status updated successfully.");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Updating Home Collection Status!", e)
            );
            return e;
        }
    );
    const updateStatusHandler = async () => {
        if (!homeCollectionDetails?._id) {
            toast.error("Home Collection details not found while Updating Status!")
            return
        }
        var SelectedStatusIsValid = statusValidator(selectedStatus)
        var isPickUpdateValid = pickUpDateValidater(pickUpDate?.enteredValue)
        var isPickUpTimeValid = pickUpTimeValidater(pickUpTime?.enteredValue)
        var isSampleCollectedValid = Array.isArray(samplesCollected) && samplesCollected.length > 0
        if (!SelectedStatusIsValid) {
            toast.error("Please validate all fields before continuing!")
            return
        }
        var submitBody = { homeCollectionId: homeCollectionDetails?._id, description: description, type: selectedStatus }

        if (selectedStatus == "picked") {
            if (!isSampleCollectedValid) {
                toast.error("Please add samples collected in dropdown!")
                return
            }
            else if (!isPickUpdateValid || !isPickUpTimeValid) {
                toast.error("Please validate all fields before continuing!")
                return
            }
            submitBody.picked_date = pickUpDate.enteredValue
            submitBody.picked_time = convertTimeFormat(pickUpTime.enteredValue, "12")
            submitBody.samples_collected = samplesCollected.map(item => item?.value)

        }
        await updateStatusAPIHandler({
            body: submitBody
        })
    }
    useEffect(() => {
        if (homeCollectionDetails) {
            var timefromdb = convertTimeFormat(homeCollectionDetails?.originalCollectionTime, "24")
            var dateFromdb = homeCollectionDetails?.originalCollectionDate ? moment(homeCollectionDetails?.originalCollectionDate).format("YYYY-MM-DD") : null
            console.log(dateFromdb)
            
            setSamplesCollected(Array.isArray(homeCollectionDetails?.samplesCollected) ? homeCollectionDetails?.samplesCollected.map(item => { return { label: item, value: item } }) : [])
            pickUpDate.setEnteredValue(dateFromdb)
            pickUpTime.setEnteredValue(timefromdb)
        }
    }, [homeCollectionDetails])
    return (
        <Modal size="lg" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Update Home Collection</h1>
                <p className="modal-sub-heading">Update Home Collection  in system.</p>
            </ModalHeader>
            <ModalBody className='py-2'>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <InputSelect
                            setValue={setSelectedStatus}
                            value={selectedStatus}
                            options={statusChangeOptions ?? []}
                            isTouched={selectedStatusIsTouched}
                            setIsTouched={setSelectedStatusIsTouched}
                            className="py-1"
                            label={"Select Status To update"}
                            isRequired={true}
                            feedbackMessage={statusFeedBack?.message}
                            feedbackType={statusFeedBack?.type}
                            validateHandler={statusValidator}
                        />
                    </div>
                    {selectedStatus == "picked" && <div className='col-md-6 col-12'> <InputMultipleSelect
                        isLoading={false}
                        setValue={setSamplesCollected}
                        value={Array.isArray(samplesCollected) ? samplesCollected : []}
                        options={Array.isArray(samplesToCollect) ? samplesToCollect.map(item => {
                            return { label: item, value: item }
                        }) : []}
                        className="py-1"
                        label={"Samples Collected"}
                        isRequired={true}
                    /></div>}
                    {selectedStatus == "picked" && <div className='col-md-6 col-12'><InputWithAddOn
                        label="PickUp Date"
                        className="loginInputs"
                        rest={{ Placeholder: 'DD/MM/YYYY' }}
                        setValue={pickUpDate.setEnteredValue}
                        value={pickUpDate.enteredValue}
                        feedbackMessage={pickUpDate.feedbackMessage}
                        feedbackType={pickUpDate.messageType}
                        isTouched={pickUpDate.isTouched}
                        setIsTouched={pickUpDate.setIsTouched}
                        type={'date'}
                        validateHandler={pickUpDateValidater}
                        reset={pickUpDate.reset}
                        isRequired={true}
                    /></div>}
                    {selectedStatus == "picked" && <div className='col-md-6 col-12'>  <InputWithAddOn
                        label="PickUp Time"
                        className="loginInputs"
                        rest={{ Placeholder: 'HH:MM A' }}
                        setValue={pickUpTime.setEnteredValue}
                        value={pickUpTime.enteredValue}
                        feedbackMessage={pickUpTime.feedbackMessage}
                        feedbackType={pickUpTime.messageType}
                        isTouched={pickUpTime.isTouched}
                        setIsTouched={pickUpTime.setIsTouched}
                        type={'time'}
                        validateHandler={pickUpTimeValidater}
                        reset={pickUpTime.reset}
                        isRequired={true}
                    /></div>}
                    <div className="col-12">
                        <InputTextArea
                            label="Remarks"
                            setValue={setDescription}
                            value={description} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className=''>
                <button className="me-2 btn btn-theme secondary-outline" onClick={toggle} disabled={updateStatusResponse?.fetching} >Cancel</button>
                <button className="me-2 btn btn-theme primary" style={{ minWidth: "120px" }} disabled={updateStatusResponse?.fetching} onClick={updateStatusHandler}>{updateStatusResponse?.fetching ? (
                    <Spinner size={"sm"} />
                ) : (
                    "Update"
                )}</button>
            </ModalFooter>
        </Modal>
    )
}
const convertTimeFormat = (time = null, format = "24") => {
    if (!time) {
        return null
    }
    if (format == "24") {
        return moment(time, 'hh:mm A').format("HH:mm")
    }
    else if (format == "12") {
        return moment(time, 'HH:mm').format("hh:mm A")

    }
    return null
}
export default UpdateHomeCollectionModal
