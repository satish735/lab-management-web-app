"use client"
import useAPI from '@/hooks/useAPI';
import useTopLoader from '@/hooks/useTopLoader';
import transformErrorDefault from '@/utils/transformErrorDefault';
import React from 'react'
import toast from 'react-hot-toast';
import LoaderAndNoContent from '../loaders/LoaderAndNoContent';
import '../bookings/view/BookingPage.css'
import Link from 'next/link';
const DashBoardBookings = () => {
    const [getBookingResponse, getBookingHandler] = useAPI(
        {
            url: `/bookings`,
            method: "get",
            params: {
                sortColumn: "createdAt",
                sortDirection: "desc",
                pageNo: 1,
                pageSize: 5
            },
            sendImmediately: true,
        },
        (e) => {
            return e.data ?? []
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while loading Recent Bookings!", e)
            );
            return e;
        }
    );
    const toploaderhook = useTopLoader(getBookingResponse?.fetching);
    return (
        <div className="admin-content-box booking-details-section">
            <h1 className="main-heading mb-2" style={{ fontSize: "20px" }}>Recent Bookings</h1>
            <LoaderAndNoContent
                noContentMessage="No Recent Bookings"
                state={
                    getBookingResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getBookingResponse?.data)
                            ? "no-content"
                            : "none"
                }
            />
            {!getBookingResponse?.fetching &&
                !getBookingResponse?.error &&
                getBookingResponse?.data && (

                    getBookingResponse?.data?.map?.((bItem, index) => {
                        var preprations = bItem?.packages?.filter?.(item => typeof item?.preparation == "string" && item?.preparation != "No specific Preparation Required" && item?.preparation)?.map?.((item) => item?.preparation)?.join?.(',').split(',')
                        return <div key={index} className="general-details row m-0 p-0 mb-2">
                            <div className="col-12 py-2 m-0">
                                <span className="full-name" style={{ color: "var(--color-primary)" }}>
                                    <Link href={`/admin/bookings/${bItem?.bookingId}`}>{bItem?.bookingId}</Link>
                                </span>{" "}
                                <span className="gender">
                                    Status: <span className={`booking-badge ${bItem?.status}`}>{bItem?.status}</span>,
                                </span>{" "}
                                <span className="gender">
                                    Payment Status: <span className={`booking-badge ${bItem?.paymentStatus}`}>{bItem?.paymentStatus}</span>,
                                </span>{" "}
                                <span className="gender">
                                    Collection Type: {bItem?.collectionType}
                                </span>{" "}
                            </div>
                            {/* <hr className="m-0" /> */}
                            {/* <div className="col-12 py-2 m-0 general-details-2">
                                <div className="section">
                                    <p className="heading">Package/Test Included</p>
                                    {bItem?.packages?.map?.((item, index) => {
                                        return <p className="values" key={index}>{item?.name}</p>;
                                    })}
                                </div>
                                <div className="section">
                                    <p className="heading">Preparations</p>
                                    {Array.isArray(preprations) && preprations.length > 0 ? preprations?.map((item, index) => {
                                        return <p className="values" key={index}>{item}</p>;
                                    }) : <p className="values"></p>}
                                </div>
                                <div className="section">
                                    <p className="heading">Price</p>
                                    <p className="values">₹{bItem?.total}</p>
                                </div>
                            </div> */}
                        </div>
                    }
                    )
                )}
            {getBookingResponse?.data && <p className='text-end' style={{ color: "var(--color-primary)" }}><Link href={`/admin/bookings`}>View All</Link></p>}
        </div>
    )
}

export default DashBoardBookings
