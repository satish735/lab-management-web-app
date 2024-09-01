"use client";
import React, { useEffect, useState } from "react";
// import apiRequest from "../../utils/apiRequest"; tet
import "./cart.css"
import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '../../components/formInput/InputWithAddOn';
import Addmember from "@/app/cart/addmember"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

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



    const [initialProducts, setinitialProducts] = useState([])











    const CouponCode = useInputComponent('');
    const CouponCodeVal_idater = (value) => {
        if (value === "" || !value) {
            CouponCode.setFeedbackMessage(
                "Field required!"
            );
            CouponCode.setMessageType("error");
            return false;
        }
        CouponCode.setFeedbackMessage("");
        CouponCode.setMessageType("none");
        return true;
    };


    const [addtestandpackage, settestandpackage] = useState()


    const [userinfoResponse, userinfoHandler] = useAPI(
        {
            url: "/member/list",
            method: "get",
            sendImmediately: true,
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                // pageNo: pageNo,
                // pageSize: pageSize,
                // searchQuery: searchValue,
            },
        },
        (e) => {

            const storedData = localStorage.getItem('testpackage');
            const parsedData = storedData ? JSON.parse(storedData) : [];
            let testPackagedata = parsedData?.item?.map((item) => { return { ...item, isselect: false } })
            let add = e?.data?.map((item) => {
                return { ...item, istest: testPackagedata }
            })
            setinitialProducts(testPackagedata ?? [])
            settestandpackage(add ?? [])
            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting userinfo!",
                e
            ));
            return e
        }
    );


    const [rate, setrate] = useState(0)

    useEffect(() => {

        let totalrate = 0;
        (addtestandpackage ?? [])?.map((item) => {
            totalrate += (item?.istest ?? [])?.filter((testtype) =>
                testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0)
        })
        setrate(totalrate ?? 0)
    }, [addtestandpackage])



    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({ cart: addtestandpackage ?? [] }));
    }, [addtestandpackage])



    return (
        <div className="midbox-inner" style={{ backgroundColor: "white" }}>
            <div className="text-center py-3" style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                <span className="px-2">
                    Home {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    Cart
                </span>
            </div>

            <h2 className="p-4 " style={{ fontWeight: "700", fontSize: "1.2rem" }}> Add Patients</h2>
            <div className="row">
                <div className=" col-sm-8 col-12 ">
                    {userinfoResponse?.data?.map((item, index) => {
                        return (
                            <div className=" py-1" key={index} >
                                <Accordion open={open} toggle={accordiontoggle}>
                                    <AccordionItem className="">
                                        <AccordionHeader targetId={index}>
                                            <button className="tablinks">
                                                {/* <div className="filter-boxleft">
                                                    <label className="container-checkbox" >
                                                        <input type="checkbox" />
                                                    </label>
                                                </div> */}
                                                <h6  >
                                                    <img src="/assets/images/male.png" style={{ width: "35px", heigit: "35px", marginRight: "18px" }} alt="" />
                                                    {item?.name}</h6>
                                            </button>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={index}>
                                            <h6 className="py-2" >Tests & Packages</h6>
                                            <div className="row" >
                                                {initialProducts?.map((key, index) => {
                                                    return (
                                                        <div key={index} className="col-sm-6 col-12" >
                                                            <div className="checkbox-tests-packages-item w-100 ">
                                                                <div className="filter-boxleft">
                                                                    <label className="container-checkbox" >
                                                                        <input type="checkbox" className="p-2" onClick={() => {
                                                                            const testdata = addtestandpackage.map((testnew) => {
                                                                                if (item._id == testnew?._id) {
                                                                                    const changepermission = testnew.istest?.map((changecheckbox) => {
                                                                                        if (changecheckbox?._id == key?._id) {
                                                                                            return { ...changecheckbox, isselect: !changecheckbox?.isselect }
                                                                                        } else {
                                                                                            return changecheckbox;
                                                                                        }
                                                                                    })


                                                                                    return { ...testnew, istest: changepermission }

                                                                                } else {
                                                                                    return testnew
                                                                                }
                                                                            })




                                                                            settestandpackage(testdata);



                                                                        }} />
                                                                        <span className="checkmark" ></span>

                                                                    </label>

                                                                </div>
                                                                <img
                                                                    src="/assets/images/test-icon.png"

                                                                />
                                                                <div className="checkbox-tests-name">{key?.name} <span>₹ {key?.testType == "Test" ? key?.rate : key?.totalMrp}</span></div>

                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <div>
                                                <button className="remove-member"> Remove member <img src="/assets/images/remove.png" alt="remove-member-icon" /></button>
                                            </div>

                                        </AccordionBody>
                                    </AccordionItem>

                                </Accordion>
                            </div>
                        )
                    })}

                </div >
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
                                    testtype?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0)}</span></div>


                            })}

                        </div><div className="checkout-rate-total my-2 py-2" style={{ borderTop: "1px solid #dee2db" }}>Total <span style={{ float: "right" }} >₹ {rate}</span>
                        </div>
                    </div>
                    <div className="checkout-proceed">
                        <div className="filter-boxleft text-center">

                            <a href="/cart-address" className="continue_button" style={{ textDecoration: "none" }} >Continue</a>
                        </div>



                    </div>
                </div>}
            </div>
            <button type="button" onClick={() => {
                toggle()
            }} className="add_another_member_btn">Add Another Member</button>
            <Addmember
                modal={modal}
                toggle={toggle}
            />
        </div >
    );
};

export default Cart;
