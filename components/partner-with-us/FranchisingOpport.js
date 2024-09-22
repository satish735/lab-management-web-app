"use client";

import useAPI from '@/hooks/useAPI';
import transformErrorDefault from '@/utils/transformErrorDefault';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Spinner } from 'reactstrap';

const FranchisingOpport = ({ content }) => {




    return (
        <div className='row'>



            <div className='col-lg-8 col-md-8 col-sm-12 px-2'  >
                {content?.text ? (
                    <div dangerouslySetInnerHTML={{ __html: content.text }} />
                ) : (
                    <p>Loading content...</p> // Fallback or placeholder while content is loading
                )}

            </div>

            <div className='col-lg-4 col-md-4 col-sm-12 px-2 pt-5'>
                <EnquireForm enquireType={'frachising-opportunities'} />
            </div>

        </div>
    )
}

export default FranchisingOpport



export const EnquireForm = ({ enquireType }) => {



    const [name, setName] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [organizationName, setorganizationName] = useState()
    const [alternativeNumber, setalternativeNumber] = useState()



    // validation input 

    const [isname, setisname] = useState(false)
    const [isemail, setisemail] = useState(false)
    const [isphone, setisphone] = useState(false)
    const [isorganizationName, setisorganizationName] = useState(false)
    const [isalternativeNumber, setisalternativeNumber] = useState(false)


    const [getPartnerWithUsResponse, getPartnerWithUsHandler] = useAPI(
        {
            url: "/addPartnersEnquire",
            method: "post",

        },
        (e) => {

            toast.success(
                "Details added successfully.",
                e
            )
            setName()
            setemail()
            setphone()
            setorganizationName()
            setalternativeNumber()
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while saving details!",
                e
            ));
        }
    );







    const submitHandler = () => {


        let flag = true;

        if (!name) {
            flag = false
            setisname(true)
        }
        if (!email) {
            flag = false
            setisemail(true)

        }
        if (!phone) {
            flag = false
            setisphone(true)

        }
        if (!organizationName) {
            flag = false
            setisorganizationName(true)

        }

        if (flag) {
            getPartnerWithUsHandler({
                body: {
                    name: name ?? "",
                    organizationName: organizationName ?? "",
                    number: phone ?? "",
                    alternateNumber: alternativeNumber ?? "",
                    emailAddress: email ?? "",
                    enquireType: enquireType ?? ''

                }
            })

        }




    }

    return (
        <div className='job-form-box bg-white'>
            <h4>Enquire Now</h4>

            <div className='row'>



                <form className='career-form-box'>
                    <div className="row" >
                        <div className="  my-3" >
                            <input
                                className="input"
                                placeholder="Your Name"
                                label=""
                                value={name ?? ''}
                                onChange={(e) => {
                                    if (e?.target?.value) {

                                        if (isname === true) {
                                            setisname(false)
                                        }

                                    }
                                    else {

                                        if (isname === false) {
                                            setisname(true)

                                        }
                                    }
                                    setName(e.target.value)
                                }}
                                style={{ borderRadius: '8px' }}
                            />

                            {isname && <span className="input_isrequired" >This field is required.</span>}

                        </div>


                        <div className="  my-3" >
                            <input
                                className="input"
                                placeholder="Organization Name"
                                label=""
                                type="string"
                                value={organizationName ?? ''}
                                onChange={(e) => {
                                    if (e?.target?.value) {

                                        if (isorganizationName === true) {
                                            setisorganizationName(false)
                                        }

                                    }
                                    else {

                                        if (isorganizationName === false) {
                                            setisorganizationName(true)

                                        }
                                    }
                                    setorganizationName(e.target.value)
                                }}
                                style={{ borderRadius: '8px' }}
                            />

                            {isorganizationName && <span className="input_isrequired" >This field is required.</span>}

                        </div>
                        <div className="  my-3" >
                            <input
                                className="input"
                                placeholder="Email Id"
                                label=""
                                type="email"
                                value={email ?? ''}
                                onChange={(e) => {
                                    if (e?.target?.value) {

                                        if (isemail === true) {
                                            setisemail(false)
                                        }

                                    }
                                    else {

                                        if (isemail === false) {
                                            setisemail(true)

                                        }
                                    }
                                    setemail(e.target.value)
                                }}
                                style={{ borderRadius: '8px' }}
                            />

                            {isemail && <span className="input_isrequired" >This field is required.</span>}

                        </div>
                        <div className="  my-3" >
                            <input
                                className="input"
                                placeholder="Number"
                                label=""
                                type="number"
                                value={phone ?? ''}
                                onChange={(e) => {
                                    if (e?.target?.value) {

                                        if (isphone === true) {
                                            setisphone(false)
                                        }

                                    }
                                    else {

                                        if (isphone === false) {
                                            setisphone(true)

                                        }
                                    }
                                    setphone(e.target.value)
                                }}
                                style={{ borderRadius: '8px' }}
                            />

                            {isphone && <span className="input_isrequired" >This field is required.</span>}

                        </div>
                        <div className="  my-3" >
                            <input
                                className="input"
                                placeholder="Alternative Number"
                                label=""
                                type="string"
                                value={alternativeNumber ?? ''}
                                onChange={(e) => {
                                    setalternativeNumber(e.target.value)
                                }}
                                style={{ borderRadius: '8px' }}
                            />

                            {isalternativeNumber && <span className="input_isrequired" >This field is required.</span>}

                        </div>




                    </div>
                </form>
                <div className="call-button slide-item" >
                    <button onClick={() => { submitHandler() }} type="button  " className=" py-2  px-3    card-button-2" style={{ width: '100%', fontSize: '19px', fontWeight: '500' }}>{(getPartnerWithUsResponse?.fetching) ? <Spinner size={"sm"} /> : 'Submit Now '}</button>

                </div>





            </div>

        </div>
    )
}