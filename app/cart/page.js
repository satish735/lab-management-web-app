"use client";
import React, { useEffect, useState } from "react";
// import apiRequest from "../../utils/apiRequest";
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

const Cart = ({ params: { id } }) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [open, setOpen] = useState('1');
    const accordiontoggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };



    const [initialProducts, setinitialProducts] = useState([
        {
            name: 'Natural Cacao Powder',
            price: 900.00,
            type: "test",
            id: 1,
            isselect: false

        },
        {
            name: 'Biotin Complex',
            price: 1400.00,
            type: "package",
            id: 2,
            isselect: false
        }
    ])









    const CouponCode = useInputComponent('');
    const CouponCodeValidater = (value) => {
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
            let add = e?.data?.map((item) => {
                return { ...item, istest: initialProducts }
            })

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

    useEffect(() => {
console.log("addtestandpackage", addtestandpackage)
    },[addtestandpackage])



    return (
        <div style={{ backgroundColor: "white" }}>
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
                            <div className=" py-1" >
                                <Accordion open={open} toggle={accordiontoggle}>
                                    <AccordionItem className="">
                                        <AccordionHeader targetId={index}>
                                            <button className="tablinks">
                                                <div className="filter-boxleft">
                                                    <label className="container-checkbox" >
                                                        <input type="checkbox" />
                                                    </label>
                                                </div>
                                                <h6  >
                                                    <img src="/assets/images/male.png" style={{ width: "35px", heigit: "35px", marginRight: "18px" }} alt="" />
                                                    {item?.name}</h6>
                                            </button>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={index}>
                                            <h6 className="py-2" >Tests & Packages</h6>
                                            <div className="row" >
                                                {initialProducts?.map((key) => {
                                                    return (
                                                        <div className="col-sm-6 col-12" >
                                                            <div className="checkbox-tests-packages-item w-100 ">
                                                                <div className="filter-boxleft">
                                                                    <label className="container-checkbox" >
                                                                        <input type="checkbox" className="p-2" onClick={() => {
                                                                            const testdata = addtestandpackage.map((testnew)=>{
                                                                                if(item._id == testnew?._id){
                                                                                  const changepermission =  testnew.istest?.map((changecheckbox)=>{
                                                                                        if(changecheckbox?.id == key?.id){
                                                                                            return {...changecheckbox,  isselect: !changecheckbox?.isselect}
                                                                                        }else{
                                                                                            return changecheckbox;
                                                                                        }
                                                                                    })
                                                                                    console.log("changepermission",changepermission)

                                                                                    return {...testnew,istest:changepermission?.istest}

                                                                                }else{
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
                                                                <div className="checkbox-tests-name">{key?.name} <span>₹ {key?.price}</span></div>

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
                {(addtestandpackage ?? []).length > 0 && <div className="checkout-mid-right col-sm-4 col-12" >
                    <div className="summary"><h3>Summary</h3>
                        <div className="checkout-summary">
                            <div className="member-box">SAN
                                <span>1 Tests, 1 Package(s)</span>
                            </div><div className="member-box">KAP
                                <span>0 Tests, 1 Package(s)</span>
                            </div>
                        </div>
                        <h3>Price Details</h3>
                        <div className="checkout-price-details">
                            <div className="member-box">SAN (Price) <span>₹ 4150</span></div>
                            <div className="member-box">KAP (Price) <span>₹ 4090</span></div>
                        </div><div className="checkout-price-total">Total <span>₹ 8240</span>
                        </div>
                    </div>
                    <div className="checkout-proceed">
                        <div className="filter-boxleft">
                            <label className="container-checkbox"><input type="checkbox" /> By clicking this, I agree to Dr. Endo Labs Terms  Conditions and Privacy Policy
                                <span className="checkmark" >
                                </span>
                            </label>
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
