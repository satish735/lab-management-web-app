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
                <ModalHeader toggle={reset}>Apply Coupon Code </ModalHeader>

                <ModalBody>

                    {(CouponResponse ?? [])?.map((item) => {
                        return (<>
                            <div className="border border-1 rounded p-2 shadow my-2" >
                                <h4> {item?.couponCode ?? ""}</h4>
                                <p className="small" > Expiration Date - {moment(item?.expirationDate)?.format("LLL") ?? ""}</p>

                                <p className="small" > Discount - {item?.discountValue ?? 0} Percentage</p>

                                <button onClick={() => {
                                    setselectCoupon(item ?? {})
                                }} className="continue_button">
                                    Apply Now
                                </button>

                            </div>
                        </>)
                    })}

                </ModalBody>

            </Modal>
        </div>
    );
}



export default AddCoupon;