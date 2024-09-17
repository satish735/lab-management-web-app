"use client"
import InputTextArea from '@/components/formInput/InputTextArea'
import InputSelect from '@/components/formInput/select/InputSelect'
import useAPI from '@/hooks/useAPI'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const CreateActivityModal = ({ isOpen = false, setIsOpen = () => { }, successHandler = () => { }, bookingDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    var statusChangeOptions = [
        // { label: "Created", value: "created", sequence: 1,disabled:true },
        { label: "Confirmed", value: "confirmed", sequence: 2 },
        { label: "Process Assigned", value: "process_assigned", sequence: 3 },
        { label: "Started", value: "started", sequence: 4 },
        { label: "Collection Done", value: "collection_done", sequence: 5 },
        { label: "Sample Reached", value: "sample_reached", sequence: 6 },
        { label: "Report Approved", value: "report_approved", sequence: 7 },
        { label: "Completed", value: "completed", sequence: 8 },
        { label: "Cancelled", value: "cancelled", sequence: 9 },
    ];
    var getCurrentStatusSequence = statusChangeOptions.find((item) => item?.value == bookingDetails?.status)?.sequence ?? 0
    statusChangeOptions = statusChangeOptions.map((item) => { return { ...item, disabled: getCurrentStatusSequence >= item?.sequence ? true : false } })
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
    const [updateStatusResponse, updateStatusAPIHandler] = useAPI(
        {
            url: `/bookings/${bookingDetails?.id}`,
            method: "put",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Booking Status updated successfully.");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Updating Booking Status!", e)
            );
            return e;
        }
    );
    const updateStatusHandler = async () => {
        if (!bookingDetails?.id) {
            toast.error("Booking details not found while Updating Status!")
            return
        }
        var SelectedStatusIsValid = statusValidator(selectedStatus)
        if (!SelectedStatusIsValid) {
            toast.error("Please validate all fields before continuing!")
            return
        }
        if (selectedStatus == "cancelled") {
            await updateStatusAPIHandler({
                body: {
                    type: "cancellation",
                    description: description
                }
            })
        } else {
            await updateStatusAPIHandler({
                body: {
                    type: "update-status",
                    new_status: selectedStatus,
                    old_status: bookingDetails?.status,
                    description: description
                }
            })
        }
    }
    return (
        <Modal size="md" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Update Booking Status</h1>
                <p className="modal-sub-heading">Update booking status in system.</p>
            </ModalHeader>
            <ModalBody className='py-2'>
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
                <InputTextArea
                    label="Remarks"
                    setValue={setDescription}
                    value={description} />
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

export default CreateActivityModal
