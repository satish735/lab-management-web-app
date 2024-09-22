"use client";
import LoaderAndNoContent from "@/components/loaders/LoaderAndNoContent";
import useAPI from "@/hooks/useAPI";
import useTopLoader from "@/hooks/useTopLoader";
import transformErrorDefault from "@/utils/transformErrorDefault";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "../../bookings/view/BookingPage.css";
import moment from "moment";
import { Accordion, AccordionBody, AccordionItem, AccordionHeader } from "reactstrap";
import ActivityTimeLine from "../../bookings/view/ActivityTimeLine";
import { useRouter } from "next/navigation";
const HomeCollectionPage = ({ CollectionId = null }) => {
    const router = useRouter();
    const [getHomeCollectionResponse, getHomeCollectionHandler] = useAPI(
        {
            url: `/home-collections/${CollectionId}`,
            method: "get",
            sendImmediately: true,
        },
        (e) => {
            if (!e) {
                toast.error("Home Collection details not found in database!");
            }
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while loading Home Collection details!", e)
            );
            return e;
        }
    );
    const toploaderhook = useTopLoader(getHomeCollectionResponse?.fetching);
    var homeCollection = getHomeCollectionResponse?.data
    var AddressDetails = getHomeCollectionResponse?.data?.addressId
    const [activityAccordionOpen, setActivityAccordionOpen] = useState('1');
    const toggleActivityAccordion = (id) => {
        if (activityAccordionOpen === id) {
            setActivityAccordionOpen();
        } else {
            setActivityAccordionOpen(id);
        }
    };
    return (
        <div className="w-100 booking-details-section">
            <LoaderAndNoContent
                noContentMessage="Home Collections details not found"
                state={
                    getHomeCollectionResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getHomeCollectionResponse?.data)
                            ? "no-content"
                            : "none"
                }
            />
            {!getHomeCollectionResponse?.fetching &&
                !getHomeCollectionResponse?.error &&
                getHomeCollectionResponse?.data && (
                    <div className="row p-0 m-0">
                        {/* Home Collection Section */}
                        {homeCollection && <div className="col-12 p-0">
                            <div className="general-details row m-0 p-0 mb-2">
                                <div className="col-12 py-2 m-0">
                                    <span className="full-name">
                                        Home Collection
                                    </span>{" "}
                                    <span className="gender">
                                        Status : <span className={`booking-badge  ${homeCollection?.collectionStatus}`}>{homeCollection?.collectionStatus}</span>,
                                    </span>{" "}
                                    <span className="dob">
                                        Date :{" "}
                                        {moment(homeCollection?.selectedCollectionDate).format("DD MMMM YYYY")} {homeCollection?.selectedCollectionTime}
                                    </span>{" "}
                                </div>
                                <hr className="m-0" />
                                <div className="col-12 py-2 m-0 general-details-2">
                                    <div className="section">
                                        <p className="heading">Sample To be Collected</p>
                                        {homeCollection?.samplesToBeCollected?.map?.((item, index) => {
                                            return <p className="values" key={index}>{item}</p>;
                                        })}
                                    </div>
                                    <div className="section">
                                        <p className="heading">Samples Collected</p>
                                        {homeCollection?.samplesCollected?.map?.((item, index) => {
                                            return <p className="values" key={index}>{item}</p>;
                                        })}
                                    </div>
                                    {homeCollection?.originalCollectionDate && <div className="section">
                                        <p className="heading">Original Pickup</p>
                                        <p className="values">{moment(homeCollection?.originalCollectionDate).format("DD MMMM YYYY")} {homeCollection?.originalCollectionTime}</p>
                                    </div>}
                                </div>
                                <hr className="m-0" />
                                <div className="col-12 py-2 m-0 general-details-2">
                                    <div className="section">
                                        <p className="heading">Collection By Name</p>
                                        <p className="values" >{homeCollection?.collectedByName}</p>

                                    </div>
                                    <div className="section">
                                        <p className="heading">Collection By Contact</p>
                                        <p className="values" >{homeCollection?.collectedByContact}</p>
                                    </div>
                                </div>
                                <hr className="m-0" />
                                <div className="col-12 py-2 m-0 general-details-2">
                                    <div className="section">
                                        <p className="heading">Address Type</p>
                                        <p className="values" >{AddressDetails?.addressType}</p>
                                    </div>
                                    <div className="section">
                                        <p className="heading">Contact</p>
                                        <p className="values" >{AddressDetails?.phone}</p>
                                    </div>
                                    <div className="section">
                                        <p className="heading">Address</p>
                                        <p className="values" >{AddressDetails?.houseNo}, {AddressDetails?.addressLine1}, {AddressDetails?.city}, {AddressDetails?.state}, {AddressDetails?.pincode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="col-12 p-0">
                            <Accordion open={activityAccordionOpen} toggle={toggleActivityAccordion}>
                                {homeCollection && Array.isArray(homeCollection?.activities) && homeCollection?.activities.length > 0 && <AccordionItem>
                                    <AccordionHeader targetId="1">Home Collection Activity</AccordionHeader>
                                    <AccordionBody accordionId="1" className="booking-activity-timeline">
                                        <ActivityTimeLine timelineList={homeCollection?.activities} />
                                    </AccordionBody>
                                </AccordionItem>}
                            </Accordion>
                        </div>
                    </div>
                )
            }
            <pre>
                {/* {JSON.stringify({ testReports }, null, 2)} */}
            </pre></div >
    );
};

export default HomeCollectionPage;
