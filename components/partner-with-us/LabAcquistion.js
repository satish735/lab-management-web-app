import React, { useState } from 'react'

const LabAcquistion = () => {


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





    return (

        <div className='row'>



            <div className='col-lg-8 col-md-8 col-sm-12 px-2'>
                <div>

                </div>
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
                                        value={currentLabName}
                                        onChange={(e) => {
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
                                        value={ownerName}
                                        onChange={(e) => {
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
                                        value={phone}
                                        onChange={(e) => {
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
                                        value={alternativeNumber}
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
                                        value={age}
                                        onChange={(e) => {
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
                                        value={email}
                                        onChange={(e) => {
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
                                        value={city}
                                        onChange={(e) => {
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
                                        value={state}
                                        onChange={(e) => {
                                            setemail(e.target.value)
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
                                        <input  type="radio" id="yes" name="fav_language" value="HTML" /><div style={{paddingTop:'10px',boxSizing:'border-box'}}><label for="yes">Yes</label>
                                        </div>


                                    </div>
                                    <div className='d-flex gap-3'>
                                        <input type="radio" id="no" name="fav_language" value="No" />
                                        <div style={{paddingTop:'10px',boxSizing:'border-box'}}>
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
                                        value={remark}
                                        name="textarea"
                                        rows="7"
                                        cols="15"
                                        onChange={(e) => {
                                            setremark(e.target.value)
                                        }}
                                        style={{ borderRadius: '8px',height:'100px' }}
                                    />



                                </div>

                                <div className="call-button slide-item" >
                                    <button type="button  " className=" py-2  px-3    card-button-2" style={{ width: '100%', fontSize: '19px', fontWeight: '500' }}>Submit Now </button>

                                </div>

                            </div>
                        </form>





                    </div>

                </div>
            </div>

        </div>

    )
}

export default LabAcquistion