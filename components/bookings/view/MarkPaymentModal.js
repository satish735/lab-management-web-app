"use client"
import useAPI from '@/hooks/useAPI'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const MarkPaymentModal = ({ isOpen = false, setIsOpen = () => { }, successHandler = () => { }, bookingDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const [markPaymentResponse, confirmBookingAPIHandler] = useAPI(
        {
            url: `/bookings/${bookingDetails?.id}`,
            method: "put",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Booking Payment is marked as paid successfully.");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Marking Payment as Paid!", e)
            );
            return e;
        }
    );
    const markPaymentHandler = async () => {
        if (!bookingDetails?.id) {
            toast.error("Booking details not found while Marking Payment as Paid!")
            return
        }
        await confirmBookingAPIHandler({
            body: {
                type: "mark-payment"
            }
        })
    }
    return (
        <Modal size="lg" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Mark Payment</h1>
                <p className="modal-sub-heading">Marking Payment as paid for selected Booking</p>
            </ModalHeader>
            <ModalBody className='py-2'>
                <p>Are you sure you want to Mark Payment as paid and make it paid as cash for <br />Booking Id :<strong>{bookingDetails?.bookingId}</strong> <br /> Amount :<strong>₹{bookingDetails?.total}</strong> </p>
            </ModalBody>
            <ModalFooter className=''>
                <button className="me-2 btn btn-theme secondary-outline" onClick={toggle} disabled={markPaymentResponse?.fetching} >Cancel</button>
                <button className="me-2 btn btn-theme primary" style={{ minWidth: "120px" }} disabled={markPaymentResponse?.fetching} onClick={markPaymentHandler}>{markPaymentResponse?.fetching ? (
                    <Spinner size={"sm"} />
                ) : (
                    "Mark as Paid"
                )}</button>
            </ModalFooter>
        </Modal>
    )
}

export default MarkPaymentModal
