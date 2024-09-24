"use client"
import Address from "@/app/address/create/page"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
import { FaMapMarker } from "react-icons/fa";
import { useSession } from "next-auth/react";
import LoaderGeneral from "@/components/loaders/LoaderGeneral";

import transformErrorDefault from "@/utils/transformErrorDefault";

const Page = () => {
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const session = useSession()

    const [updateaddress, setUpdateaddress] = useState({})
    const [isaddress, setIsaddress] = useState(false)
    const [addresssResponse, addresssHandler] = useAPI(
        {
            url: `/address/useraddress`,
            method: "get",
            sendImmediately: true,
            params: {
                userId: session?.data?.user?.id
            },
        },
        (e) => {

            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting addresss!",
                e
            ));
            return e
        }
    );



    const [deleteaddressResponse, deleteaddressHandler] = useAPI(
        {
            url: `/address/`,
            method: "DELETE",

        },
        (e) => {

            addresssHandler()
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting address!",
                e
            ));
            return e
        }
    );

    const [deleteid, setdeleteid] = useState()
    return <>

        <div className='main-parent-bar-div'>

            <div className='side-bar-main' style={{ backgroundColor: 'white' }}>

                <SideBarProfile />
            </div>

            <div className='item-page-section'>

                <LoaderGeneral
                    noContentMessage="records are not found"
                    state={
                        addresssResponse?.fetching
                            ? "loading"
                            : [null, undefined].includes(addresssResponse?.data)
                                ? "no-content"
                                : "none"

                    }
                />
                {!addresssResponse?.fetching  && < div className="mmy-2" >
                <div className="row my-3 " style={{ borderBottom: "1px solid #97978", textTransform: "capitalize" }} >
                    <div className="col-6 " >
                        <span className="mx-3 " style={{ fontWeight: "700", fontSize: "1.1rem" }} >My Address</span>
                    </div>
                    <div className="col-6 text-end " >
                        <button onClick={() => {
                            setIsaddress(false)
                            setModal2(true)
                        }} className="card-button-2 mr-2 small" > + Add New Address</button>
                    </div>
                </div>

                <div className="row my-2  px-3" style={{ textTransform: "capitalize" }} >

                    {(addresssResponse?.data ?? [])?.map((item, key) => {
                        return <div key={key} className="col-sm-4 col-12 px-3 py-3 my-2 shadow " style={{ border: "1px solid #97979" }} >

                            <div className="px-2" >
                                <img src="/assets/images/map.png" style={{ width: "25px", heigit: "25px", marginRight: "18px" }} alt="" />

                                <span className="px-2" style={{ fontWeight: "600", fontSize: "1.1rem" }}> {item?.addressType ?? ""}</span>
                            </div>

                            <div className="my-3 px-2">
                                {item?.houseNo} - {item?.addressLine1} {item?.city} {item?.state} : {item?.pincode}
                            </div>



                            <div className="my-2">
                                <button onClick={() => {
                                    setUpdateaddress(item ?? {})
                                    setIsaddress(true)
                                    setModal2(true)
                                }} className="card-button-2 mx-2" >
                                    Edit Address
                                </button>
                                <button onClick={() => {
                                    setdeleteid(item?._id)
                                    deleteaddressHandler({
                                        url: `/address/${item?._id}`
                                    })
                                }} className="btn btn-danger mx-2" >
                                    {(deleteaddressResponse?.fetching && deleteid == item?._id) ? <Spinner size='sm' /> : 'Delete'}
                                </button>
                            </div>
                        </div>
                    })}
                </div>

                <Address
                    modal={modal2}
                    toggle={toggle2}
                    AddressHandler={addresssHandler}
                    isupdate={isaddress}
                    update={isaddress ? updateaddress : {}}
                />
            </div>}

        </div>
    </div >

    </>
}

export default Page