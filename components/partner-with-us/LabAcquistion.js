import useAPI from '@/hooks/useAPI'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Spinner } from 'reactstrap'

const LabAcquistion = ({content}) => {


    const [ownerName, setName] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [age, setage] = useState()
    const [currentLabName, setcurrentLabName] = useState()
    const [alternativeNumber, setalternativeNumber] = useState()

    const [city, setcity] = useState()
    const [state, setstate] = useState()
    const [remark, setremark] = useState()



    // validation input 

    const [isownerName, setisownerName] = useState(false)
    const [isemail, setisemail] = useState(false)
    const [isphone, setisphone] = useState(false)
    const [iscurrentLabName, setiscurrentLabName] = useState(false)
    const [isalternativeNumber, setisalternativeNumber] = useState(false)
    const [isage, setisage] = useState(false)
    const [iscity, setiscity] = useState()
    const [isstate, setisstate] = useState()
    const [isremark, setisremark] = useState()

    const [isexperienced, setisexperienced] = useState(false)


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
            setcurrentLabName()
            setalternativeNumber()
            setage()

            setcity()
            setstate()
            setremark()

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

        if (!ownerName) {
            flag = false
            setisownerName(true)
        }
        if (!email) {
            flag = false
            setisemail(true)

        }
        if (!phone) {
            flag = false
            setisphone(true)

        }
        if (!currentLabName) {
            flag = false
            setiscurrentLabName(true)

        }

        if (!age) {
            flag = false
            setisage(true)

        }
        if (!city) {
            flag = false
            setiscity(true)

        }
        if (!state) {
            flag = false
            setisstate(true)

        }




        if (flag) {
            getPartnerWithUsHandler({
                body: {
                    name: ownerName ?? "",
                    labName: currentLabName ?? "",
                    number: phone ?? "",
                    alternateNumber: alternativeNumber ?? "",
                    emailAddress: email ?? "",
                    enquireType: 'lab_acquistion' ?? '',
                    city: city ?? "",
                    state: state ?? "",
                    isExperienced: isexperienced,
                    otherDetails: remark || "",

                }
            })

        }




    }




    return (

        <div className='row'>



            <div className='col-lg-8 col-md-8 col-sm-12 px-2'>
            {content?.text ? (
                    <div dangerouslySetInnerHTML={{ __html: content.text }} />
                ) : (
                    <p>Loading content...</p> 
                )}
            </div>

            <div className='col-lg-4 col-md-4 col-sm-12 px-2 pt-5'>
                <div className='job-form-box bg-white'>
                    <h4>Enquire Now</h4>

                    <div className='row'>



                        <form className='career-form-box'>
                            <div className="row" >

                                <div className=" col-lg-6 col-md-6 col-sm-12  my-3" >
                                    <input
                                        className="input"
                                        placeholder="Current Lab Name"
                                        label=""
                                        type="string"
                                        value={currentLabName ?? ''}
                                        onChange={(e) => {
                                            if (e?.target?.value) {

                                                if (iscurrentLabName === true) {
                                                    setiscurrentLabName(false)
                                                }

                                            }
                                            else {

                                                if (iscurrentLabName === false) {
                                                    setiscurrentLabName(true)

                                                }
                                            }
                                            setcurrentLabName(e.target.value)
                                        }}
                                        style={{ borderRadius: '8px' }}
                                    />

                                    {iscurrentLabName && <span className="input_isrequired" >This field is required.</span>}

                                </div>


                                <div className=" col-lg-6 col-md-6 col-sm-12  my-3" >
                                    <input
                                        className="input"
                                        placeholder="Owner's Name"
                                        label=""
                                        value={ownerName ?? ''}
                                        onChange={(e) => {
                                            if (e?.target?.value) {

                                                if (isownerName === true) {
                                                    setisownerName(false)
                                                }

                                            }
                                            else {

                                                if (isownerName === false) {
                                                    setisownerName(true)

                                                }
                                            }
                                            setName(e.target.value)
                                        }}
                                        style={{ borderRadius: '8px' }}
                                    />

                                    {isownerName && <span className="input_isrequired" >This field is required.</span>}

                                </div>




                                <div className=" col-lg-6 col-md-6 col-sm-12    my-3" >
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
                                <div className=" col-lg-6 col-md-6 col-sm-12    my-3" >
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
                                <div className=" col-lg-6 col-md-6 col-sm-12    my-3" >
                                    <input
                                        className="input"
                                        placeholder="Age"
                                        label=""
                                        type="string"
                                        value={age ?? ''}
                                        onChange={(e) => {
                                            if (e?.target?.value) {

                                                if (isage === true) {
                                                    setisage(false)
                                                }

                                            }
                                            else {

                                                if (isage === false) {
                                                    setisage(true)

                                                }
                                            }
                                            setage(e.target.value)
                                        }}
                                        style={{ borderRadius: '8px' }}
                                    />

                                    {isage && <span className="input_isrequired" >This field is required.</span>}

                                </div>

                                <div className="  col-lg-6 col-md-6 col-sm-12    my-3" >
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

                                <div className='my-2'>
                                    <p className='radios'>
                                        Proposed Location Details:
                                    </p>
                                </div>



                                <div className=" col-lg-6 col-md-6 col-sm-12    my-3" >
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

                                <div className="  col-lg-6 col-md-6 col-sm-12    my-3" >
                                    <input
                                        className="input"
                                        placeholder="State"
                                        label=""
                                        type="string"
                                        value={state ?? ''}
                                        onChange={(e) => {
                                            if (e?.target?.value) {

                                                if (isstate === true) {
                                                    setisstate(false)
                                                }

                                            }
                                            else {

                                                if (isstate === false) {
                                                    setisstate(true)

                                                }
                                            }
                                            setstate(e.target.value)
                                        }}
                                        style={{ borderRadius: '8px' }}
                                    />

                                    {isstate && <span className="input_isrequired" >This field is required.</span>}

                                </div>

                                <div className='my-2'>
                                    <p className='radios'>
                                        Experience in Pathology/Pharmacy/Healthcare *
                                    </p>
                                </div>

                                <div className='d-flex gap-3'>
                                    <div className='d-flex gap-3'>
                                        <input type="radio" id="yes" name="fav_language" value={isexperienced} onChange={(e) => { setisexperienced(true) }} /><div style={{ paddingTop: '10px', boxSizing: 'border-box' }}><label for="yes">Yes</label>
                                        </div>


                                    </div>
                                    <div className='d-flex gap-3'>
                                        <input type="radio" id="no" name="fav_language" value={!isexperienced} onChange={(e) => { setisexperienced(false) }} />
                                        <div style={{ paddingTop: '10px', boxSizing: 'border-box' }}>
                                            <label for="no">No</label>
                                        </div>
                                    </div>



                                </div>


                                <div className="col-12 my-3 py-2 career-form-box" >
                                    <textarea

                                        className="input textarea "
                                        placeholder="Your message goes here..."
                                        label=""
                                        type="textarea"
                                        autoComplete="off"
                                        value={remark ?? ''}
                                        name="textarea"
                                        rows="7"
                                        cols="15"
                                        onChange={(e) => {
                                            setremark(e.target.value)
                                        }}
                                        style={{ borderRadius: '8px', height: '100px' }}
                                    />



                                </div>



                            </div>
                        </form>

                        <div className="call-button slide-item" >

                            <button type="button" onClick={() => { submitHandler() }} className=" py-2  px-3    card-button-2" style={{ width: '100%', fontSize: '19px', fontWeight: '500' }}> {(getPartnerWithUsResponse?.fetching) ? <Spinner size={"sm"} /> : 'Submit Now '}</button>

                        </div>



                    </div>

                </div>
            </div>

        </div>

    )
}

export default LabAcquistion