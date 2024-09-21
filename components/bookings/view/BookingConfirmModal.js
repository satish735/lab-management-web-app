"use client"
import useAPI from '@/hooks/useAPI'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const BookingConfirmModal = ({ isOpen = false, setIsOpen = () => { }, successHandler = () => { }, bookingDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const [confirmBookingResponse, confirmBookingAPIHandler] = useAPI(
        {
            url: `/bookings/${bookingDetails?.id}`,
            method: "put",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Booking comfirmed successfully!");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Confirming Booking!", e)
            );
            return e;
        }
    );
    const confirmBookingHandler = async () => {
        if (!bookingDetails?.id) {
            toast.error("Booking details not found while confirming!")
            return
        }
        await confirmBookingAPIHandler({
            body: {
                type: "confirmation"
            }
        })

    }
    return (
        <Modal size="lg" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Confirm Booking</h1>
                <p className="modal-sub-heading">Confirmation for confirming Booking {bookingDetails?.bookingId}</p>
            </ModalHeader>
            <ModalBody className='py-2'>
                <p>Are you sure you want to Confirm booking for <br />Booking Id :<strong>{bookingDetails?.bookingId}</strong> !!!</p>
            </ModalBody>
            <ModalFooter className=''>
                <button className="me-2 btn btn-theme secondary-outline" onClick={toggle} disabled={confirmBookingResponse?.fetching} >Cancel</button>
                <button className="me-2 btn btn-theme primary" style={{ minWidth: "80px" }} disabled={confirmBookingResponse?.fetching} onClick={confirmBookingHandler}>{confirmBookingResponse?.fetching ? (
                    <Spinner size={"sm"} />
                ) : (
                    "Confirm"
                )}</button>
            </ModalFooter>
        </Modal>
    )
}

export default BookingConfirmModal
