"use client";
import React, { useEffect, useState } from "react";

import "../cart/cart.css"

import Addmember from "@/app/cart/addmember"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";


const Cart = ({ params: { _id } }) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [open, setOpen] = useState('1');
    const accordiontoggle = (_id) => {
        if (open === _id) {
            setOpen();
        } else {
            setOpen(_id);
        }
    };






    const [addtestandpackage, settestandpackage] = useState()

    useEffect(() => {
        const storedData = localStorage.getItem('cart');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        settestandpackage(parsedData?.cart ?? [])
    }, [])



    // const [userinfoResponse, userinfoHandler] = useAPI(
    //     {
    //         url: "/member/list",
    //         method: "get",
    //         sendImmediately: true,
    //         params: {
    //             // sortColumn: sort?.column,
    //             // sortDirection: sort?.direction,
    //             // pageNo: pageNo,
    //             // pageSize: pageSize,
    //             // searchQuery: searchValue,
    //         },
    //     },
    //     (e) => {

    //         return e?.data
    //     },
    //     (e) => {
    //         toast.error(transformErrorDefault(
    //             "Something went wrong while Getting userinfo!",
    //             e
    //         ));
    //         return e
    //     }
    // );


    const [rate, setrate] = useState(0)

    useEffect(() => {

        let totalrate = 0;
        (addtestandpackage ?? [])?.map((item) => {
            totalrate += (item?.istest ?? [])?.filter((testtype) =>
                testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item.rate || 0), 0)
        })
        setrate(totalrate ?? 0)
    }, [addtestandpackage])



    return (
        <div className="midbox-inner" style={{ backgroundColor: "white" }}>
            <div className="text-center py-3" style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                <span className="px-2">
                    Home {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    Address
                </span>
            </div>

            <h2 className="p-4 " style={{ fontWeight: "700", fontSize: "1.2rem" }}> Sample Collection Address</h2>
            <div className="row">
                <div className="col-sm-7 col-12 ">

                    <div>
                        <div className="checkbox-tests-packages-item bg-white border w-100 ">
                            <div className="filter-boxleft">
                                <input type="checkbox" className="p-2" />
                                <span className="px-2" style={{ fontSize: "1.1rem", fontWeight: "700" }}>Office</span>

                            </div>

                            <div className="checkbox-tests-name">

                            </div>

                        </div>
                    </div>

                </div>

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
                        <h3>rate Details</h3>
                        <div className="checkout-rate-details">

                            {(addtestandpackage ?? [])?.map((testrate, index) => {
                                return <div className="member-box" key={index}>{testrate?.name} (rate) <span>₹ {(testrate?.istest ?? [])?.filter((testtype) =>
                                    testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item.rate || 0), 0)}</span></div>


                            })}

                        </div><div className="checkout-rate-total">Total <span>₹ {(addtestandpackage ?? [])?.reduce((totalprice, sum) => totalprice + (sum?.istest ?? [])?.filter((testtype) =>
                            testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item.rate || 0), 0), 0)}</span>
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
            <button type="button" onClick={() => {
                toggle()
            }} className="add_another_member_btn">Add Address</button>
            <Addmember
                modal={modal}
                toggle={toggle}
            />
        </div >
    );
};

export default Cart;
