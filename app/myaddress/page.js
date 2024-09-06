"use client"
import { FaMapMarkerAlt } from "react-icons/fa";

import Address from "@/app/address/create/page"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'

const Myaddress = () => {
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);


    const [updateAddress, setUpdateAddress] = useState({})
    const[isaddress, setIsaddress] = useState(false)
    const [addresssResponse, addresssHandler] = useAPI(
        {
            url: "/address/list",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {

            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting addresss!",
                e
            ));
            return e
        }
    );



    const [deleteAddressResponse, deleteAddressHandler] = useAPI(
        {
            url: `/address/`,
            method: "DELETE",

        },
        (e) => {

            addresssHandler()
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting Address!",
                e
            ));
            return e
        }
    );


    return <>
        {addresssResponse?.fetching ? <div style={{ textTransform: "capitalize" }} className="  text-center my-3" > {<Spinner size="xl" />} </div> : <div className="mmy-2" >
            <div className="row my-3 " style={{ borderBottom: "1px solid #97978", textTransform:"capitalize" }} >
                <div className="col-6 " >
                    <span className="mx-3 " style={{ fontWeight: "700", fontSize: "1.1rem" }} >My Address</span>
                </div>
                <div className="col-6 text-end " >
                    <button onClick={() => {
                        setIsaddress(false)
                        setModal2(true)
                    }} className="card-button-2 mx-3" > + Add New Address</button>
                </div>
            </div>

            <div className="row my-2 px-2 " style={{textTransform:"capitalize"}} >

                {addresssResponse?.data?.map((item) => {
                    return <div className="col-sm-4 col-12 px-3 py-3 my-2 shadow " style={{ border: "1px solid #97979" }} >

                        <div className="px-2" >
                            <FaMapMarkerAlt style={{ color: "#3b9d00", height: "25px", width: "25px", background: "#97979" }} />
                            <span className="px-2" style={{ fontWeight: "600", fontSize: "1.1rem" }}> {item?.addressType ?? ""}</span>
                        </div>

                        <p className="small px-2 my-3" >{item?.houseNo ?? ""} {item?.addressLine1 ?? ""} {item?.city ?? ""} {item?.state ?? ""} {item?.pincode ?? ""}</p>

                        <div className="my-2">
                            <button onClick={() => {
                                setUpdateAddress(item ?? {})
                                setIsaddress(true)
                                setModal2(true)
                            }} className="card-button-2 mx-2" >
                                Edit Address
                            </button>
                            <button onClick={() => {
                                deleteAddressHandler({
                                    url: `/address/${item?._id}`
                                })
                            }} className="btn btn-danger mx-2" >
                                Delete
                            </button>
                        </div>
                    </div>
                })}
            </div>

            <Address
                modal={modal2}
                toggle={toggle2}
                AddressHandler={addresssHandler}
                isupdate= {isaddress}
                update={updateAddress}
            />
        </div>}
    </>
}

export default Myaddress