"use client";
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import useInputComponent from '@/hooks/useInputComponent';
import InputWithAddOn from '@/components/formInput/InputWithAddOn';
import InputSelect from "@/components/formInput/select/InputSelect";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import moment from "moment";
import transformErrorDefault from "@/utils/transformErrorDefault";
import { useSession } from "next-auth/react";


const AddCoupon = ({ toggle, modal, CouponResponse, setselectCoupon }) => {
    const session = useSession()




    const reset = () => {
        toggle()

    }





    return (
        <div>

            <Modal
                isOpen={modal}
                toggle={reset}
                size="lg"

            >
                <ModalHeader toggle={reset}style={{fontWeight:"700"}}>Apply Coupon Code </ModalHeader>

                <ModalBody>

                    <div className='row' >

                    {(CouponResponse ?? [])?.map((item , index) => {
                        return (
                            <div key={index} className={` col-sm-6 col-12  border border-1 rounded p-2 shadow my-2  ${item?._id == selectCoupon?._id ? "border-success" : ""} `} >
                                <h4 className='' style={{color:"#21cdad"}}  > {item?.couponCode ?? ""}</h4>
                                <p className="small" > Expiration Date - {moment(item?.expirationDate)?.format("LLL") ?? ""}</p>

                                <p className="small p-0" > Discount - {item?.discountValue ?? 0} Percentage</p>

                                <p className="small" >  {item?.descriptionShort ?? ""} </p>

                                <button onClick={() => {
                                    setselectCoupon(item ?? {})
                                    reset()
                                }} className="continue_button">
                                    Apply Now
                                </button>

                            </div>
                        )
                    })}
                     </div>   

                </ModalBody>

            </Modal>
        </div>
    );
}



export default AddCoupon;