"use client";
import React, { useEffect, useState } from "react";

import "../cart/cart.css"

import Addmember from "@/app/cart/addmember"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";

import CheckboxInput from "@/components/formInput/CheckboxInput.jsx"
import Address from "@/app/address/create/page"

const Cart = ({ params: { _id } }) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);





    const [addtestandpackage, settestandpackage] = useState()

    useEffect(() => {
        const storedData = localStorage.getItem('cart');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        settestandpackage(parsedData?.cart ?? [])
    }, [])





    const [rate, setrate] = useState(0)

    useEffect(() => {

        let totalrate = 0;
        (addtestandpackage ?? [])?.map((item) => {
            totalrate += (item?.istest ?? [])?.filter((testtype) =>
                testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item.rate || 0), 0)
        })
        setrate(totalrate ?? 0)
    }, [addtestandpackage])




    const [iscollection, setChecked] = useState(true)
    const [islab, setislab] = useState(false)

    const changecheckboxcollecion = () => {
        if (iscollection == false) {
            setChecked(!iscollection)
            setislab(!islab)
        }
    }

    const changecheckboxlab = () => {
        if (islab == false) {
            setChecked(!iscollection)
            setislab(!islab)
        }

    }


    const [labResponse, labHandler] = useAPI(
        {
            url: "/centers/list",
            method: "get",
            sendImmediately: true,
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                // pageNo: 1,
                // pageSize: 20,
                // searchQuery: searchValue,
            },
        },
        (e) => {




            return e?.data?.filter((item) => item?.publishedAt != null || item?.publishedAt != 'null' || item?.publishedAt != undefined)
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting Lab!",
                e
            ));
            return e
        }
    );


    const [selectlab, setselectlab] = useState({})

    const [selectaddress, setselectaddress] = useState({})


    const [AddressResponse, AddressHandler] = useAPI(
        {
            url: "/address/list",
            method: "get",
            sendImmediately: true,
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                // pageNo: 1,
                // pageSize: 20,
                // searchQuery: searchValue,
            },
        },
        (e) => {




            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting Address!",
                e
            ));
            return e
        }
    );


    return (
        <div className="midbox-inner" style={{ backgroundColor: "white", textTransform: "capitalize" }}>
            <div className="text-center py-3" style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                <span className="px-2">
                    Home {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    Address
                </span>
            </div>


            <div className="my-3 select-tab" style={{ display: "flex", color: "green" }} >

                <div onClick={changecheckboxcollecion} class=" mx-3 bg-white py-2 px-3 border border-2 rounded">
                    <CheckboxInput
                        check={iscollection}
                        setChecked={changecheckboxcollecion}
                        label={'Home Collection'}
                    />

                </div>
                <div onClick={changecheckboxlab} class="form-check mx-3 bg-white py-2 px-3 border border-2 rounded">
                    <CheckboxInput
                        check={islab}
                        setChecked={changecheckboxlab}
                        label={'Lab'}
                    />

                </div>
            </div>


            <div className="row">
                {iscollection && <div className="col-sm-7 col-12 ">
                    <h2 className="p-4 " style={{ fontWeight: "700", fontSize: "1.2rem" }}> Sample Collection Address</h2>
                    <div>
                        <div >
                            {(AddressResponse?.data ?? [])?.map((item, index) => {
                                return <div className="py-1" key={index}>

                                    <div onClick={() => {
                                        setselectaddress(item)
                                    }} className="p-3 bg-white rounded border w-100 ">
                                        <div className="filter-boxleft py-2 " style={{
                                            borderBottom: "1px solid #dee2db ",
                                            width: "100%"
                                        }}>
                                            <CheckboxInput
                                                check={selectaddress?._id == item?._id}
                                                setChecked={() => {
                                                    setselectaddress(item)
                                                }}
                                                label={''}
                                            />
                                            <span className="px-2" style={{
                                                fontSize: "1.1rem",
                                                fontWeight: "700"
                                            }}>{item?.addressType ?? ""}</span>

                                        </div>

                                        <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                            {item?.houseNo}   {item?.addressLine1 ?? ""}
                                        </div>

                                    </div>
                                </div>

                            })}

                        </div>


                    </div>
                    <button type="button" onClick={() => {
                        toggle()
                    }} className="add_another_member_btn">Add Address</button>
                </div>}


                {islab && <div className="col-sm-7 col-12 my-2">
                    {(labResponse?.data ?? [])?.map((item, index) => {
                        return <div key={index} className="my-1" onClick={() => {
                            setselectlab(item)
                        }} >
                            <div className="p-3 bg-white rounded border w-100 ">
                                <div className="filter-boxleft py-2 " style={{ borderBottom: "1px solid #dee2db ", width: "100%" }}>
                                    <CheckboxInput
                                        check={selectlab?._id == item?._id}
                                        setChecked={() => {
                                            setselectlab(item)
                                        }}
                                        label={''}
                                    />
                                    <span className="px-2" style={{ fontSize: "1.1rem", fontWeight: "700" }}>{item?.centre ?? ""}</span>

                                </div>

                                <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                    {item?.address ?? ""}
                                </div>

                            </div>
                        </div>

                    })}
                </div>}

                {(rate) > 0 && <div className="checkout-mid-right col-sm-4 col-12" >
                    <div className="summary"><h3>Summary</h3>
                        <div className="checkout-summary">
                            {(addtestandpackage ?? [])?.map((itemtest, index) => {

                                return (
                                    <div key={index} className="member-box">{itemtest?.name}
                                        <span>{(itemtest?.istest ?? [])?.filter((testtype) => testtype?.testType == "Test" && testtype?.isselect == true)?.length ?? 0}
                                            {" "} Tests, {(itemtest?.istest ?? [])?.filter((testtype) => testtype?.testType == "Package" && testtype?.isselect == true)?.length ?? 0}
                                            {" "} Package(s)</span>
                                    </div>)

                            })}

                        </div>
                        <h3>Rate Details</h3>
                        <div className="checkout-rate-details">

                            {(addtestandpackage ?? [])?.map((testrate, index) => {
                                return <div className="member-box" key={index}>{testrate?.name} (rate) <span>₹ {(testrate?.istest ?? [])?.filter((testtype) =>
                                    testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0)}</span></div>
                            })}

                        </div>
                        <div className="checkout-rate-total my-2 py-2 " style={{ borderTop: "1px solid #dee2db" }} >Total <span style={{ float: "right" }} >₹ {(addtestandpackage ?? [])?.reduce((totalprice, sum) => totalprice + (sum?.istest ?? [])?.filter((testtype) =>
                            testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0), 0)}</span>
                        </div>
                    </div>
                    <div className="checkout-proceed">
                        <div className="filter-boxleft text-center">
                            {/* <label className="container-checkbox"><input type="checkbox" /> By clicking this, I agree to Dr. Endo Labs Terms  Conditions and Privacy Policy
                                <span className="checkmark" >
                                </span>
                            </label> */}
                            <button className="continue_button" >Continue</button>
                        </div>



                    </div>
                </div>}


            </div>



            <Address
                modal={modal}
                toggle={toggle}
            />
        </div >
    );
};

export default Cart;
