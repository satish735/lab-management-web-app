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


const AddCoupon = ({ toggle, modal, CouponResponse, setselectCoupon , selectCoupon }) => {
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

                    <div className='' >

                    {(CouponResponse ?? [])?.map((item , index) => {
                        return (
                            <div key={index} className={`   border border-1 rounded p-2 shadow my-2  ${item?._id == selectCoupon?._id ? "border-success" : ""} `} >
                                <div className='row'>
                                    <div className='col-sm-9 col-8 '> 
                                    <h4  style={{color:"#003747"}}  > {item?.couponCode ?? ""}</h4>

                                    </div>
                               <div className='col-sm-3 col-4'> 
                               <button  onClick={() => {
                                    setselectCoupon(item ?? {})
                                    reset()
                                }} className="btn btn-primary-theme " style={{float:"right", fontSize:"0.8rem"}}>
                                    Apply
                                </button>
                               </div>
                                 </div>   
                                <p className="small m-0" > <span className='' style={{fontWeight:"500", color:"rgb(0, 55, 71)"}} > Expiration Date -</span> {moment(item?.expirationDate)?.format("LLL") ?? ""}</p>

                                <p className="small m-0" >
                                     <span className='' style={{fontWeight:"500" , color:"rgb(0, 55, 71)"}} > 
                                        Discount -
                                        </span> 
                                        {item?.discountValue ?? 0} Percentage
                                </p>

                                <p className="small" >  {item?.descriptionShort ?? ""} </p>

                                

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