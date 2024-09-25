'use client'
import React, { useState } from 'react'
import "@/app/blog/blog.css"
import '@/styles/common-card-designs/card_designs.css'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaLocationPin, FaPhone, FaXTwitter, FaYoutube } from "react-icons/fa6";
import "@/layouts/layout-components/UserFooter.css";
import "./contact-us.css";
import useAPI from '@/hooks/useAPI';
import transformErrorDefault from '@/utils/transformErrorDefault';
import toast from 'react-hot-toast';
import { Spinner } from 'reactstrap';
const ContactUs = () => {

    const [allPackageResponse, allPackageHandler] = useAPI(
        {
            url: "/centers/list",
            method: "get",
            sendImmediately: true,
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                pageNo: 1,
                pageSize: 20,
                // searchQuery: searchValue,
            },
        },
        (e) => {



            console.log(e);


            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting packages!",
                e
            ));
            return e
        }
    );







    const [name, setName] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [interestedIn, setinterestedIn] = useState()
    const [city, setcity] = useState()
    const [remark, setremark] = useState()



    // validation input 

    const [isname, setisname] = useState(false)
    const [isemail, setisemail] = useState(false)
    const [isphone, setisphone] = useState(false)
    const [isinterestedIn, setisinterestedIn] = useState(false)
    const [iscity, setiscity] = useState(false)
    const [isremark, setisremark] = useState(false)



    const [getContactWithUsResponse, getContactWithUsHandler] = useAPI(
        {
            url: "/addContactUsDetails",
            method: "post",

        },
        (e) => {

            setName()
            setemail()
            setphone()
            setinterestedIn()
            setcity()
            setremark()
            toast.success(
                "Details sended successfully.", e
            )
            return e

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
        else {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailRegex.test(email)) {
                flag = false
                setisemail(true)
            }
            else {

            }
        }
        if (!phone || phone?.length < 10) {
            flag = false
            setisphone(true)

        }


        if (!city) {
            flag = false
            setiscity(true)

        }

        if (flag) {


            getContactWithUsHandler({
                body: {
                    name: name ?? "",
                    phone: phone ?? "",
                    interestedIn: interestedIn ?? "",
                    email: email ?? "",
                    city: city ?? '',
                    message: remark ?? '',

                }
            })

        }




    }



    return (
        <div className='global-background-gradient ' style={{ paddingTop: '70px' }}>

            <div className='midbox-inner'>


                <h1 className='header-contact-us' style={{
                    color: '#fff',
                    textAlign: 'center',
                    margin: '0 auto'
                }}>
                    SSDBSHYAM Diagnostic LLP team would love to hear
                    from you!
                </h1>

                <p className=' mt-2' style={{
                    color: '#fff',

                    fontSize: '18px',
                    padding: '10px 0 60px',
                    textAlign: 'center',
                }}>
                    Our Customer Care Team will contact you shortly
                </p>

                <div className='row mt-3'>
                    <div className='col-lg-8 col-md-8 col-sm-12 px-2 py-2   '>

                        <div className='bg-white px-4  pb-4 ' style={{ paddingTop: '30px', borderRadius: '13px' }}>
                            <div className='row'>



                                <form>
                                    <div className="row" >
                                        <div className="col-6 my-3" >
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
                                        <div className="col-6 my-3" >
                                            <input
                                                className="input"
                                                placeholder="Email Address"
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
                                                    setemail(e?.target?.value)
                                                }}
                                                style={{ borderRadius: '8px' }}
                                            />

                                            {isemail && <span className="input_isrequired" >This field is required.</span>}

                                        </div>
                                        <div className="col-6 my-3" >
                                            <input
                                                className="input"
                                                placeholder="Phone"
                                                label=""
                                                type="number"
                                                value={phone ?? ''}
                                                onChange={(e) => {
                                                    if ((e?.target?.value)?.length <= 10) {

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
                                                    }
                                                }}
                                                style={{ borderRadius: '8px' }}
                                            />

                                            {isphone && <span className="input_isrequired" >This field is required.</span>}

                                        </div>
                                        <div className="col-6 my-3" >
                                            <input
                                                className="input"
                                                placeholder="Interested In"
                                                label=""
                                                type="string"
                                                value={interestedIn ?? ''}
                                                onChange={(e) => {

                                                    setinterestedIn(e.target.value)
                                                }}
                                                style={{ borderRadius: '8px' }}
                                            />

                                            {isinterestedIn && <span className="input_isrequired" >This field is required.</span>}

                                        </div>
                                        <div className="col-12 my-3" >
                                            <input
                                                className="input"
                                                placeholder="City"
                                                label=""
                                                type="string"
                                                value={city ?? ''}
                                                onChange={(e) => {

                                                    if (e?.target?.value) {

                                                        if (iscity === true) {
                                                            setiscity(false)
                                                        }

                                                    }
                                                    else {

                                                        if (iscity === false) {
                                                            setiscity(true)

                                                        }
                                                    }
                                                    setcity(e.target.value)
                                                }}
                                                style={{ borderRadius: '8px' }}
                                            />

                                            {iscity && <span className="input_isrequired" >This field is required.</span>}

                                        </div>

                                        <div className="col-12 my-3 py-2" >
                                            <textarea

                                                className="input textarea "
                                                placeholder="Your message goes here..."
                                                label=""
                                                type="textarea"
                                                autoComplete="off"
                                                value={remark ?? ''}
                                                name="textarea"
                                                rows="5"
                                                cols="15"
                                                onChange={(e) => {
                                                    setremark(e.target.value)
                                                }}
                                                style={{ borderRadius: '8px' }}
                                            />



                                        </div>


                                    </div>
                                </form>
                                <div className="call-button slide-item" >
                                    <button onClick={() => { submitHandler() }} type="button  " className=" py-2  px-3    card-button-2" style={{ fontSize: '14px', fontWeight: '500' }}>
                                        {(getContactWithUsResponse?.fetching) ? <Spinner size={"sm"} /> : 'Send your message'}
                                    </button>

                                </div>

                                <p className='mt-3' style={{ fontSize: '12px', color: '#505050' }}>
                                    By clicking, you agree to our <span style={{
                                        color: '#46b902',
                                        fontSize: '12px',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}> Terms & Conditions, Privacy & Policy</span>
                                </p>



                            </div>

                        </div>

                    </div>

                    <div className='col-lg-4 col-md-4 col-sm-12 px-2 py-2  ' style={{ minHeight: '100%' }}>
                        <div className='bg-white  px-4  pb-4 ' style={{ paddingTop: '40px', borderRadius: '13px', height: '100%' }}>

                            <h3 style={{
                                color: ' #202833',
                                fontSize: '22px',
                                fontWeight: '500',
                                marginBottom: '8px',
                            }}>
                                Corporate Office and Central Laboratory
                            </h3>

                            <p style={{

                                color: '#97979a',
                                textAlign: 'left',
                                fontSize: '16px',
                                marginBottom: '50px',
                                padding: '0',
                            }}>
                                SSDBSHYAM Diagnostic LLP, D6-Opposite, Chamatkareshwar Mahadev, Banipark, Jaipur, 302016
                            </p>


                            <h3 style={{
                                color: '#202833',
                                fontSize: '22px',
                                fontWeight: '500',
                                marginBottom: '8px',
                            }}>
                                Email

                            </h3>
                            <p>
                                <a href=" " style={{ color: '#46b902' }}>customercare@SSDBSHYAM.com</a>
                            </p>


                            <h3 style={{
                                color: '#202833',
                                fontSize: '22px',
                                fontWeight: '500',
                                marginBottom: '8px',
                                marginTop: '25px'
                            }}>
                                Phone

                            </h3>
                            <p>
                                <a href=" " style={{ color: '#46b902' }}>+91-9739923174</a>
                            </p>



                            <div className='mt-5'>
                                <hr />
                            </div>

                            <div className="d-flex  ">

                                <span className='me-4' ><FaFacebookF style={{ color: '#46b902', fontSize: '19px' }} /></span>
                                <span className='mx-4' ><FaYoutube style={{ color: '#46b902', fontSize: '19px' }} /></span>
                                <span className='mx-4' ><FaXTwitter style={{ color: '#46b902', fontSize: '19px' }} />  </span>
                                <span className='mx-4' ><FaInstagram style={{ color: '#46b902', fontSize: '19px' }} /></span>
                                <span className='mx-4' ><FaLinkedinIn style={{ color: '#46b902', fontSize: '19px' }} /></span>


                            </div>

                        </div>
                    </div>


                </div>

            </div>


            <div className='midbox-inner mt-5 pb-5' style={{ backgroundColor: '#f1f6ee' }}>

                <h1>
                    <br />
                    <strong>
                        Address
                    </strong>
                </h1>
                <h1>

                    <strong>
                        Corporate Office and Central Laboratory
                    </strong></h1>


                <h3 className='mt-4' style={{ fontWeight: '600' }}>Jaipur</h3>
                <p className='center-contact-listing'>6E, Malviya Industrial Area, Malviya Nagar, Jaipur</p>
                <p className='center-contact-listing'>customercare@blallab.com</p>
                <p className='center-contact-listing'>+91-9166125555

                </p>

                <hr />

                <h1>Regional Laboratory</h1>


                {allPackageResponse?.fetching ? (
                    <div className='text-center my-5'>

                        <Spinner size={"lg"} />
                    </div>

                ) : (
                    <>

                        {
                            (allPackageResponse?.data?.data ?? []).map((itemValue, index) => {
                                return <CenterList itemValue={itemValue} key={index} />
                            })
                        }
                    </>)
                }

            </div>
        </div>
    )
}

export default ContactUs

const CenterList = ({ itemValue, key }) => {
    return (
        <div key={key}>
            <hr />
            <h3 className='mt-4' style={{ fontWeight: '600' }}>{itemValue?.city}</h3>
            <p className='center-contact-listing'>{itemValue?.address}</p>
            <p className='center-contact-listing'>{itemValue?.email}</p>
            <p className='center-contact-listing'>{itemValue?.contact}

            </p>

        </div>
    )
}