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
import CheckboxInput from "@/components/formInput/CheckboxInput.jsx"
import Address from "@/app/address/create/page"
import { useRouter } from "next/navigation";
import { Input, Spinner } from 'reactstrap'
import UpcomingSlots from "@/components/slots/UpcomingSlots";


import transformErrorDefault from "@/utils/transformErrorDefault";
import { useSession } from "next-auth/react";


const Cart = () => {

    const session = useSession()

    
    const router = useRouter();



    const [step, setstep] = useState(4);


    const [addtestandpackage, settestandpackage] = useState()

    const [userinfoResponse, userinfoHandler] = useAPI(
        {
            url: "/member/myfamilymember",
            method: "get",
            sendImmediately: true,
            params: {
                loginId: session?.data?.user?.otherDetails?._id
            },
        },
        (e) => {


            const storedData = localStorage.getItem('testpackage');
            const addtestandpackage = storedData ? JSON?.parse?.(storedData) : [];
            let testPackagedata = addtestandpackage?.item?.map((item) => { return { ...item, isselect: false } })
            let add = e?.map((item) => {
                return { ...item, istest: testPackagedata }
            })
            settestandpackage(add ?? [])
            return e
        },
        (e) => {
            toast.error("Something went wrong while Getting userinfo!");
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





    // step 2 
    const [selectlab, setselectlab] = useState(null)
    const [selectaddress, setselectaddress] = useState(null)


    const [iscollection, setChecked] = useState(true)
    const [islab, setislab] = useState(false)

    const changecheckboxcollecion = () => {
        if (iscollection == false) {
            setChecked(!iscollection)
            setislab(!islab)
        }
    }

    const changecheckboxlab = () => {
        if (islab == false) {
            setChecked(!iscollection)
            setislab(!islab)
        }

    }


    // step 3 
    const [selectedSlotId, setSelectedSlotId] = useState(null)
    const [slotdata, setslotdata] = useState([])




    return (
        <div className="midbox-inner m_title" style={{ backgroundColor: "white", textTransform: "capitalize" }}>
            <div className="text-center py-3" style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                <span className="px-2">
                    Home {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    {step == 1 ? "Cart" : step == 2 ? "Address" : step == 4 ? "Order Review" : ""}
                </span>
            </div>

            {userinfoResponse?.fetching ? <div className="text-center my-4" ><Spinner style={{
                height: "3rem",
                width: "3rem",
                color: "#00265c",
            }} /> </div> :

                <div>


                    {step == 1 && <Step1
                        addtestandpackage={addtestandpackage}
                        setstep={setstep}
                        rate={rate}
                        settestandpackage={settestandpackage}
                        userinfoHandler={userinfoHandler}
                    />}

                    {step == 2 && <Step2
                        setstep={setstep}
                        rate={rate}
                        addtestandpackage={addtestandpackage}
                        
                        setselectlab={setselectlab}
                        selectlab={selectlab}
                        setselectaddress={setselectaddress}
                        selectaddress={selectaddress}
                        islab={islab}
                        iscollection={iscollection}

                        changecheckboxcollecion={changecheckboxcollecion}
                        changecheckboxlab={changecheckboxlab}
                    />}



                    {step == 3 && <Step3
                        selectedSlotId={selectedSlotId}
                        setSelectedSlotId={setSelectedSlotId}
                        slotdata={slotdata}
                        setslotdata={setslotdata}
                        setstep={setstep}
                        rate={rate}
                        addtestandpackage={addtestandpackage}
                    />}

                    {step == 4 && <Step4
                        setstep={setstep}
                        rate={rate}
                        addtestandpackage={addtestandpackage}
                        selectedSlotId={selectedSlotId}
                        islab={islab}
                        selectaddress={selectaddress}
                        selectlab={selectlab}
                    />}
                </div>}
        </div >
    );
};

export default Cart;



const Step1 = ({ addtestandpackage, setstep, rate, settestandpackage, userinfoHandler }) => {


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

    const [deletememberResponse, deletememberHandler] = useAPI(
        {
            url: `/member`,
            method: "DELETE",

        },
        (e) => {

            userinfoHandler()
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while Getting member!",
                e
            ));
            return e
        }
    );
    return (<>
        <div>
            <h2 className="p-4 " style={{ fontWeight: "700", fontSize: "1.2rem" }}> Add Patients</h2>
            <div className="row">
                <div className=" col-sm-8 col-12 ">
                    {addtestandpackage?.map((item, index) => {
                        return (
                            <div className=" py-1" key={index} >
                                <Accordion open={open} toggle={accordiontoggle}>
                                    <AccordionItem className="">
                                        <AccordionHeader targetId={index}>
                                            <button className="tablinks">

                                                <h6  >
                                                    <img src="/assets/images/male.png" style={{ width: "35px", heigit: "35px", marginRight: "18px" }} alt="" />
                                                    {item?.name}</h6>
                                            </button>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={index}>
                                            <h6 className="py-2" >Tests & Packages</h6>
                                            <div className="row" >
                                                {item?.istest?.map((key, index) => {
                                                    return (
                                                        <div key={index} className="col-sm-6 col-12" >
                                                            <div className="checkbox-tests-packages-item w-100 ">
                                                                <div className="filter-boxleft">
                                                                    <label className="container-checkbox" >


                                                                        <CheckboxInput
                                                                            check={key?.isselect}
                                                                            setChecked={() => {
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

                                                                            }}
                                                                        />
                                                                        <span className="checkmark" ></span>

                                                                    </label>

                                                                </div>
                                                                <img
                                                                    src="/assets/images/test-icon.png"
                                                                />
                                                                <div className="checkbox-tests-name">{key?.name}
                                                                    <span>₹ {key?.testType == "Test" ? key?.rate :
                                                                        key?.totalMrp}</span></div>

                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                            <div>
                                                <button onClick={() => {
                                                    deletememberHandler({
                                                        url: `/member/${item?._id}`
                                                    })
                                                }} className="remove-member">{deletememberResponse?.fetching ? <Spinner size={"sm"} /> : "Remove member"}   <img src="/assets/images/remove.png" alt="remove-member-icon" /></button>
                                            </div>

                                        </AccordionBody>
                                    </AccordionItem>

                                </Accordion>
                            </div>
                        )
                    })}

                    <button type="button" onClick={() => {
                        toggle()
                    }} className="add_another_member_btn">Add Another Member</button>
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

                            <button onClick={() => {
                                setstep(2)
                            }} className="continue_button" style={{ textDecoration: "none" }} >Continue</button>
                        </div>



                    </div>
                </div>}
            </div>

            <Addmember
                modal={modal}
                toggle={toggle}
                refresh={userinfoHandler}
            />
        </div>
    </>)
}



const Step2 = ({ setstep, rate , addtestandpackage , setselectlab, 
    selectlab , setselectaddress, selectaddress, 
    changecheckboxcollecion, changecheckboxlab, 
    islab, iscollection}) => {

const session = useSession()



    const [labResponse, labHandler] = useAPI(
        {
            url: "/centers/list",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {

            return e?.data?.filter((item) => item?.publishedAt != null || item?.publishedAt != 'null' || item?.publishedAt != undefined)
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting Lab!",
                e
            ));
            return e
        }
    );




    const [isselectaddresoptions, setisselectaddresoptions] = useState(false)
    useEffect(() => {

        if (islab) {
            if (selectlab == null) {
                setisselectaddresoptions(false)
            } else {
                setisselectaddresoptions(true)
            }
        } else {
            if (selectaddress == null) {
                setisselectaddresoptions(false)
            } else {
                setisselectaddresoptions(true)
            }
        }

    }, [selectlab, selectaddress, islab])

console.log("session?.data?.user?.id",session?.data?.user?.id)
    const [AddressResponse, AddressHandler] = useAPI(
        {
            url: `/address/useraddress`,
            method: "get",
            sendImmediately: true,
            params: {
                userId: session?.data?.user?.id
            }
        },
        (e) => {

            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting Address!",
                e
            ));
            return e
        }
    );


    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    return (<>
        <div>
            <div className="my-3 select-tab" style={{ display: "flex", color: "green" }} >

                <div onClick={changecheckboxcollecion} class=" mx-3 bg-white py-2 px-3 border border-2 rounded">
                    <CheckboxInput
                        check={iscollection}
                        setChecked={changecheckboxcollecion}
                        label={'Home Collection'}
                    />

                </div>
                <div onClick={changecheckboxlab} class="form-check mx-3 bg-white py-2 px-3 border border-2 rounded">
                    <CheckboxInput
                        check={islab}
                        setChecked={changecheckboxlab}
                        label={'Lab'}
                    />

                </div>
            </div>


            <div className="row">
                {iscollection && <div className="col-sm-8 col-12 ">
                    <h2 className="p-4 " style={{ fontWeight: "700", fontSize: "1.2rem" }}> Sample Collection Address</h2>
                    <div>
                        <div >
                            {(AddressResponse?.data ?? [])?.map((item, index) => {
                                return <div className="py-1" key={index}>

                                    <div onClick={() => {
                                        setselectaddress(item)
                                    }} className="p-3 bg-white rounded border w-100 ">
                                        <div className="filter-boxleft py-2 " style={{
                                            borderBottom: "1px solid #dee2db ",
                                            width: "100%"
                                        }}>
                                            <CheckboxInput
                                                check={selectaddress?._id == item?._id}
                                                setChecked={() => {
                                                    setselectaddress(item)
                                                }}
                                                label={''}
                                            />
                                            <span className="px-2" style={{
                                                fontSize: "1.1rem",
                                                fontWeight: "700"
                                            }}>{item?.addressType ?? ""}</span>

                                        </div>

                                        <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                            {item?.houseNo}   {item?.addressLine1 ?? ""}
                                        </div>

                                    </div>
                                </div>

                            })}

                        </div>


                    </div>
                    <button type="button" onClick={() => {
                        toggle2()
                    }} className="add_another_member_btn">Add Address</button>
                </div>}


                {islab && <div className="col-sm-8 col-12 my-2">
                    {(labResponse?.data ?? [])?.map((item, index) => {
                        return <div key={index} className="my-1" onClick={() => {
                            setselectlab(item)
                        }} >
                            <div className="p-3 bg-white rounded border w-100 ">
                                <div className="filter-boxleft py-2 " style={{ borderBottom: "1px solid #dee2db ", width: "100%" }}>
                                    <CheckboxInput
                                        check={selectlab?._id == item?._id}
                                        setChecked={() => {
                                            setselectlab(item)
                                        }}
                                        label={''}
                                    />
                                    <span className="px-2" style={{ fontSize: "1.1rem", fontWeight: "700" }}>{item?.centre ?? ""}</span>

                                </div>

                                <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                    {item?.address ?? ""}
                                </div>

                            </div>
                        </div>

                    })}
                </div>}

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
                        {isselectaddresoptions && <div className="filter-boxleft text-center">

                            <button onClick={() => {
                                setstep(3)

                            }} className="continue_button" style={{ textDecoration: "none" }} >Continue</button>
                        </div>}

                        <div>
                            <button onClick={() => {
                                setstep(1)
                            }} className="btn btn-outline-success block py-2 " style={{ textDecoration: "none", display: 'block', width: "100%" }} >Back</button>
                        </div>

                    </div>
                </div>}

            </div>



            <Address
                modal={modal2}
                toggle={toggle2}
                AddressHandler={AddressHandler}
            />

        </div>
    </>)
}


const Step3 = ({ selectedSlotId, setSelectedSlotId, slotdata, setslotdata, setstep, rate , addtestandpackage }) => {



    return(<>

        <div>
            <div className="row" >
                <div className="col-sm-8 col-12" >
                    <UpcomingSlots selectedSlot={selectedSlotId} onChange={setSelectedSlotId} setslotdata={setslotdata} />
                </div>
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
                    {selectedSlotId != null && <div className=" ">
                        <div className="filter- text-center">

                            <button onClick={() => {
                                setstep(4)
                            }} className="continue_button" style={{ textDecoration: "none" }} >Continue</button>

                        </div>
                    </div>}

                    <div className=" my-2">
                        <button onClick={() => {
                            setstep(2)
                        }} className="btn btn-outline-success block py-2 " style={{ textDecoration: "none", display: 'block', width: "100%" }} >Back</button>
                    </div>
                </div>}
            </div>
        </div>
        </>
        )
}

const Step4 = ({ setstep , rate , addtestandpackage , selectedSlotId , islab, selectaddress , selectlab}) => {



    // step 4 

    const session = useSession()

    const [ispayonline, setisChecked] = useState(true)
    const [ispaycash, setispaycash] = useState(false)

    const changecheckboxpayonline = () => {
        if (ispayonline == false) {
            setisChecked(!ispayonline)
            setispaycash(!ispaycash)
        }
    }

    const changecheckboxpaycash = () => {
        if (ispaycash == false) {
            setisChecked(!ispayonline)
            setispaycash(!ispaycash)
        }

    }




    const [PaymentResponse, PaymentHandler] = useAPI(
        {
            url: "/bookings/create-transaction",
            method: "post",
        },
        (e) => {
            toast.success("transaction successfully")
            router.push(e?.url);
            localStorage?.setItem('testpackage', {});


        },
        (e) => {

            return toast.error(
                transformErrorDefault(
                    "Something went wrong while creating your order!",
                    e
                )
            );
        }
    );

    const [BookingResponse, BookingHandler] = useAPI(
        {
            url: "/bookings",
            method: "post",
        },
        (e) => {

            let bookingid = (e?.bookings ?? [])?.map((item) => {
                return item._id
            })
            toast.success("Booking created successfully")

            if (ispayonline) {
                PaymentHandler({
                    body: {
                        booking_ids: bookingid ?? []
                    }
                })
            } else {
                localStorage?.setItem('testpackage', {});
                router.push("/admin/test");
            }


        },
        (e) => {

            return toast.error(
                transformErrorDefault(
                    "Something went wrong while creating your order!",
                    e
                )
            );
            return e;
        }
    );

    const submit = async () => {

        let bookingtest = (addtestandpackage ?? [])
            .filter((item) => (item?.istest ?? []).some((key) => key?.isselect === true))
            .map((item) => ({
                member_id: item?._id,
                packages: item?.istest?.map((key) => key?._id)
            }));


        BookingHandler({
            body: {
                team_members: bookingtest,
                center_id: selectlab?._id,
                payment_type: ispayonline ? "cash" : "cash",
                collection_type: islab ? "lab" : "lab",
                slot_id: selectedSlotId ,
                discoun: 0,
                home_collection_charge: 0,
                total: rate,
                address_id: islab == false ? selectaddress._id : null ?? null,
                coupon_id: null,
                teamMemberId: session?.data?.user?.otherDetails?._id
            }
        })
    }









    return (<>
        <div>

            <div className="row my-3" >

                <div className="col-sm-8 col-12 rounded "  >

                    <div>
                        <h5 className="my-2 " style={{ fontSize: "1.2rem", fontWeight: "600" }}>Order Summary                                    </h5>

                        {(addtestandpackage ?? [])?.filter((check) => check?.istest?.some((key) => key?.isselect == true) == true)?.map((item, index) => {
                            return <div key={index} className="my-3 border border-2 p-2 rounded" >
                                <h6 className="px-2 " style={{ fontWeight: "600" }} >{item?.name}</h6>
                                <div className="row">
                                    {item?.istest?.filter((test) => test?.isselect == true)?.map((item, index) => {
                                        return <div key={index} className="col-sm-6 col-12" >
                                            <div className="checkbox-tests-packages-item w-100 ">

                                                <img
                                                    src="/assets/images/test-icon.png"

                                                />
                                                <div className="checkbox-tests-name">{item?.name} <span>₹ {item?.testType == "Test" ? item?.rate : item?.totalMrp}</span></div>

                                            </div>
                                        </div>
                                    })}
                                </div>

                            </div>
                        })}

                    </div>

                    <div className="bg-white p-3 my-4 mx-2 rounded" >
                        {(addtestandpackage?.cart ?? [])?.map((item, index) => {
                            return (<div key={index}>
                                <div className="row my-4" style={{ borderBottom: "2px solid #f1f6ee" }}  >

                                    <h5 className="col-6 px-4" style={{ fontSize: "1.0rem" }}>
                                        <img src="/assets/images/male.png" style={{ width: "35px", heigit: "35px", marginRight: "18px" }} alt="" />
                                        {item?.name ?? ""}</h5>
                                    <h6 className="col-6" style={{ textAlign: "right" }} >₹ {(item?.istest ?? [])?.filter((key) => key?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0)}</h6>
                                </div>

                                <div >
                                    {(item?.istest ?? [])?.filter((key) => key?.isselect == true)?.map((key, index) => {
                                        return (<div key={index} className="col-sm-6 col-12" >
                                            <div className="checkbox-tests-packages-item w-100 ">
                                                <img src="/assets/images/test-icon.png" />
                                                <div className="checkbox-tests-name">{key?.name} <span>₹ {key?.testType == "Test" ? key?.rate : key?.totalMrp}</span></div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                            </div>)
                        })}
                    </div>


                    <div className="bg-white  my-4  rounded">
                       
                        <div className="row  py-2 mt-1 rounded" style={{ background: "#f1f6ee" }} >
                            <div className="col-2 text-center" >
                                <img src="/assets/images/time.png" className="p-2 mt-2 rounded-circle" style={{ height: "40px", background: "#f1f6ee" }} />
                            </div>
                            <div className="col-10" >
                                <h6 style={{ fontWeight: "700", fontSize: "0.9rem" }} >At 08:00 AM</h6>
                                <p className="" style={{ fontSize: "0.7rem" }}>Tuesday | September 3, 2024</p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-sm-4 col-12  " >




                    <div className="px-2" style={{ border: "2px solid #f1f6ee" }}>

                        <h5 className="p-2 rounded" style={{ borderBottom: "2px solid #f1f6ee", fontSize: "1.0rem" }}>Price Details</h5>
                        {(addtestandpackage?.cart ?? [])?.map((item, index) => {
                            return (<div key={index}>
                                <div className="row my-4"  >

                                    <h5 className="col-6 px-4" style={{ fontSize: "1.0rem" }}>
                                        {item?.name ?? ""} (Price)</h5>
                                    <h6 className="col-6" style={{ textAlign: "right" }} >₹ {(item?.istest ?? [])?.filter((key) => key?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0)}</h6>
                                </div>


                            </div>)
                        })}


                        <div className="row px-3 py-2" style={{ borderTop: "2px solid #f1f6ee" }}>
                            <h5 className="col-6 " style={{ fontSize: "1.1rem", fontWeight: "700" }}>Total</h5>
                            <h5 className="col-6" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#46bb00", textAlign: "right" }}>₹ {rate}</h5>
                        </div>

                    </div>


                    <div className="px-2 my-3" style={{ border: "2px solid #f1f6ee" }}>

                        <h5 className="p-2 rounded" style={{ borderBottom: "2px solid #f1f6ee", fontSize: "1.0rem" }}>Payment Method</h5>
                        <div className="my-3 select-tab" style={{ display: "flex", color: "green" }} >

                            <div onClick={changecheckboxpayonline} class=" mx-3 bg-white ">
                                <CheckboxInput
                                    check={ispayonline}
                                    setChecked={changecheckboxpayonline}
                                    label={'Pay Online'}
                                />

                            </div>
                            <div onClick={changecheckboxpaycash} class="form-check mx-3 bg-white " style={{ borderLeft: "2px solid red" }}>
                                <CheckboxInput
                                    check={ispaycash}
                                    setChecked={changecheckboxpaycash}
                                    label={'Pay by Cash'}
                                />

                            </div>
                        </div>
                        <button onClick={submit} className="continue_button" >{(BookingResponse?.fetching || PaymentResponse?.fetching) ? <Spinner size="sm" /> : "Pay Now"}</button>
                        <div className=" my-2">
                            <button onClick={() => {
                                setstep(3)
                            }} className="btn btn-outline-success block py-2 " style={{ textDecoration: "none", display: 'block', width: "100%" }} >Back</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}