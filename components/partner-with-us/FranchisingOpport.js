import React, { useState } from 'react'

const FranchisingOpport = () => {

    return (
        <div className='row'>



            <div className='col-lg-8 col-md-8 col-sm-12 px-2'>
                <div>

                </div>
            </div>

            <div className='col-lg-4 col-md-4 col-sm-12 px-2 pt-5'>
                <EnquireForm />
            </div>

            </div>
    )
}

export default FranchisingOpport



export const EnquireForm = () => {


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
                                value={name}
                                onChange={(e) => {
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
                                value={organizationName}
                                onChange={(e) => {
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
                                value={email}
                                onChange={(e) => {
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
                                value={phone}
                                onChange={(e) => {
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
                                value={alternativeNumber}
                                onChange={(e) => {
                                    setalternativeNumber(e.target.value)
                                }}
                                style={{ borderRadius: '8px' }}
                            />

                            {isalternativeNumber && <span className="input_isrequired" >This field is required.</span>}

                        </div>


                        <div className="call-button slide-item" >
                            <button type="button  " className=" py-2  px-3    card-button-2" style={{ width: '100%', fontSize: '19px', fontWeight: '500' }}>Submit Now </button>

                        </div>

                    </div>
                </form>





            </div>

        </div>
    )
}