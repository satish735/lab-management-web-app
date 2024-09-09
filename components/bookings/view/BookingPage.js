"use client"
import LoaderAndNoContent from '@/components/loaders/LoaderAndNoContent';
import useAPI from '@/hooks/useAPI'
import useTopLoader from '@/hooks/useTopLoader';
import transformErrorDefault from '@/utils/transformErrorDefault';
import React from 'react'
import toast from 'react-hot-toast';
import "./BookingPage.css"
const BookingPage = ({ bookingNumber = null }) => {
    const [getBookingResponse, getBookingHandler] = useAPI(
        {
            url: `/bookings/${bookingNumber}`,
            method: "get",
            sendImmediately: true,
        },
        (e) => {
            if (!e) {
                toast.error("Booking number not found in database!")
            }
            return e ?? null
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Booking Details!",
                e
            ));
            return e
        }
    );
    const toploaderhook = useTopLoader(getBookingResponse?.fetching)
    return (
        <div className='w-100'>
            <LoaderAndNoContent noContentMessage="Booking details not found" state={getBookingResponse?.fetching ? "loading" : [null, undefined].includes(getBookingResponse?.data) ? "no-content" : "none"} />
            {
                !getBookingResponse?.fetching && !getBookingResponse?.error && getBookingResponse?.data && <div className='w-100 booking-page'>
                    <div className='user-details'>

                    </div>
                </div>
            }
        </div>
    )
}

export default BookingPage
