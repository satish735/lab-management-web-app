"use client"
import Addmember from "@/app/cart/addmember"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
import moment from "moment";

const Mymember = () => {
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);


    const [updatemember, setUpdatemember] = useState({})
    const [ismember, setIsmember] = useState(false)
    const [membersResponse, membersHandler] = useAPI(
        {
            url: "/member/list",
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
                "Something went wrong while Getting members!",
                e
            ));
            return e
        }
    );



    const [deletememberResponse, deletememberHandler] = useAPI(
        {
            url: `/member/`,
            method: "DELETE",

        },
        (e) => {

            membersHandler()
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting member!",
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
                {membersResponse?.fetching ? <div style={{ textTransform: "capitalize" }} className="  text-center my-3" > {<Spinner size="xl" />} </div> : <div className="mmy-2" >
                    <div className="row my-3 " style={{ borderBottom: "1px solid #97978", textTransform: "capitalize" }} >
                        <div className="col-6 " >
                            <span className="mx-3 " style={{ fontWeight: "700", fontSize: "1.1rem" }} >My member</span>
                        </div>
                        <div className="col-6 text-end " >
                            <button onClick={() => {
                                setIsmember(false)
                                setModal2(true)
                            }} className="card-button-2 mr-2 small" > + Add New member</button>
                        </div>
                    </div>

                    <div className="row my-2  px-3" style={{ textTransform: "capitalize" }} >

                        {(membersResponse?.data ?? [])?.map((item, key) => {
                            return <div key={key} className="col-sm-4 col-12 px-3 py-3 my-2 shadow " style={{ border: "1px solid #97979" }} >

                                <div className="px-2" >
                                    <img src="/assets/images/male.png" style={{ width: "35px", heigit: "35px", marginRight: "18px" }} alt="" />

                                    <span className="px-2" style={{ fontWeight: "600", fontSize: "1.1rem" }}> {item?.name ?? ""}</span>
                                </div>

                                <div className="my-3 px-2">
                                    <p className="small my-1" ><span style={{ fontWeight: "700", fontSize: "0.9rem" }} >Email : </span> {" "} {item?.email ?? ""}</p>
                                    <p className="small my-1" ><span style={{ fontWeight: "700", fontSize: "0.9rem" }} >Relation : </span> {" "} {item?.relation ?? ""}</p>
                                </div>



                                <div className="my-2">
                                    <button onClick={() => {
                                        setUpdatemember(item ?? {})
                                        setIsmember(true)
                                        setModal2(true)
                                    }} className="card-button-2 mx-2" >
                                        Edit member
                                    </button>
                                    <button onClick={() => {
                                        setdeleteid(item?._id)
                                        deletememberHandler({
                                            url: `/member/${item?._id}`
                                        })
                                    }} className="btn btn-danger mx-2" >
                                        {(deletememberResponse?.fetching && deleteid == item?._id) ? <Spinner size="sm" /> : "Delete"}
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>

                    <Addmember
                        modal={modal2}
                        toggle={toggle2}
                        refresh={membersHandler}
                        isupdate={ismember}
                        update={updatemember}
                    />
                </div>}</div>
        </div>

    </>
}

export default Mymember