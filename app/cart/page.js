"use client";
import React, { useEffect, useState } from "react";
import "./cart.css"
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
import moment from "moment"

import transformErrorDefault from "@/utils/transformErrorDefault";
import { useSession } from "next-auth/react";
import AddCoupon from "@/app/cart/AddCoupon"
import LoaderGeneral from "@/components/loaders/LoaderGeneral";

const Cart = () => {

    const session = useSession()
    const router = useRouter();

    const [step, setstep] = useState(1);
    const [addtestandpackage, settestandpackage] = useState()




    const [userinfoResponse, userinfoHandler] = useAPI(
        {
            url: "/member/myfamilymember",
            method: "get",
            params: {
                loginId: session?.data?.user?.otherDetails?._id
            },
        },
        (e) => {

            let userDeatils = [session?.data?.user?.otherDetails, ...e];


            const storedData = localStorage.getItem('testpackage');
            const addtestandpackage = storedData ? JSON?.parse?.(storedData) : [];
            let testPackagedata = addtestandpackage?.item?.map((item) => { return { ...item, isselect: false } })
            let add = userDeatils?.map((item) => {
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





    useEffect(() => {

        if (session?.data) {
            userinfoHandler({
                params: {
                    loginId: session?.data?.user?.otherDetails?._id
                }
            })
        }

    }, [session?.data?.user?.otherDetails?._id])

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
    const [nearCenter, setnearCenter] = useState()
    const [selectlab, setselectlab] = useState(null)
    const [selectaddress, setselectaddress] = useState(null)


    const [iscollection, setChecked] = useState(false)
    const [islab, setislab] = useState(true)

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
                    Cart {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    {step == 1 ? "Select Team Member" : step == 2 ? "Select Location/Center" : step == 3 ? "Select Slot" : "Review Order/Payment"}
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
                        setnearCenter={setnearCenter}
                    />}



                    {step == 3 && <Step3
                        selectedSlotId={selectedSlotId}
                        setSelectedSlotId={setSelectedSlotId}
                        slotdata={slotdata}
                        setslotdata={setslotdata}
                        setstep={setstep}
                        rate={rate}
                        addtestandpackage={addtestandpackage}
                        nearCenter={nearCenter} 
                        selectlab={selectlab} 
                        islab={islab}
                    />}

                    {step == 4 && <Step4
                        setstep={setstep}
                        rate={rate}
                        addtestandpackage={addtestandpackage}
                        selectedSlotId={selectedSlotId}
                        islab={islab}
                        selectaddress={selectaddress}
                        selectlab={selectlab}
                        slotdata={slotdata}
                        nearCenter={nearCenter}
                    />}
                </div>
            }
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
        <div className="text-capitalize" style={{ textTransform: "capitalize" }}  >
            <h2 className="py-4 px-1 " style={{ fontWeight: "700", fontSize: "1.2rem" ,color:'#003747'}}> Add Patients</h2>
            <div className="row">
                <div className=" col-sm-8 col-12 ">
                    {addtestandpackage?.map((item, index) => {
                        return (
                            <div className=" py-1" key={index} >
                                <Accordion open={open} toggle={accordiontoggle}>
                                    <AccordionItem className="">
                                        <AccordionHeader targetId={index}>
                                            <button className="tablinks">

                                                <h6 className="text-capitalize" >
                                                    <img src="/assets/images/male.png" style={{ width: "35px", heigit: "35px", marginRight: "18px" }} alt="" />
                                                    {item?.name}</h6>
                                            </button>
                                        </AccordionHeader>
                                        <AccordionBody accordionId={index}>
                                            <h6 className="py-2" >Tests & Packages</h6>
                                            <div className="row" >
                                                {item?.istest?.map((key, index) => {
                                                    return (

                                                        <div key={index} style={{ height: "100%" }} className={`col-sm-6 col-12 checkbox-tests-packages-item ${key?.testType == "Test" ?
                                                            "test_backgound" : ""}   `}>
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

                                                    )
                                                })}

                                            </div>

                                            {item?.relation == "self" ? "" :
                                                <div>
                                                    <button onClick={() => {
                                                        deletememberHandler({
                                                            url: `/member/${item?._id}`
                                                        })
                                                    }} className="remove-member">{deletememberResponse?.fetching ?
                                                        <Spinner size={"sm"} /> : "Remove member"}
                                                        <img src="/assets/images/remove.png" alt="remove-member-icon" />
                                                    </button>
                                                </div>}

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


                {(rate) > 0 && <div className="checkout-mid-right col-sm-4 col-12 px-2" >
                    <div className=" " style={{ fontWeight: '700' }}>
                        <h3 style={{ fontWeight: '700'  }} className="text-capitalize">Summary</h3>
                        <div className="checkout-summary">
                            {(addtestandpackage ?? [])?.map((itemtest, index) => {

                                return (
                                    <div key={index} className="member-box"> <span style={{ fontWeight: "400" }} >{itemtest?.name} </span>
                                        <span>{(itemtest?.istest ?? [])?.filter((testtype) => testtype?.testType == "Test" && testtype?.isselect == true)?.length ?? 0}
                                            {" "} Tests, {(itemtest?.istest ?? [])?.filter((testtype) => testtype?.testType == "Package" && testtype?.isselect == true)?.length ?? 0}
                                            {" "} Package(s)</span>
                                    </div>)
                            })}
                        </div>
                        <h3 style={{ fontWeight: '700' }} className="text-capitalize">Rate Details</h3>
                        <div className="checkout-rate-details">

                            {(addtestandpackage ?? [])?.map((testrate, index) => {
                                return <div className="member-box " key={index}>
                                    <span style={{ fontWeight: "400" }} >{testrate?.name} </span>
                                    <span>₹ {(testrate?.istest ?? [])?.filter((testtype) =>
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



const Step2 = ({ setstep, rate, addtestandpackage, setselectlab,
    selectlab, setselectaddress, selectaddress,
    changecheckboxcollecion, changecheckboxlab,
    islab, iscollection, setnearCenter }) => {

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






    const findNearestLocation = (locations, target) => {
        const haversineDistance = (coords1, coords2) => {
            const toRad = (value) => (value * Math.PI) / 180;

            const lat1 = coords1.lat;
            const lon1 = coords1.lng;
            const lat2 = coords2.lat;
            const lon2 = coords2.lng;

            const R = 6371; // Radius of the Earth in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        let nearestLocation = null;
        let shortestDistance = Infinity;

        for (const location of locations) {
            const distance = haversineDistance(location, target);
            // Check if the distance is shorter than the current shortestDistance
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestLocation = location;
            }
        }

        return {
            nearestLocation,
            distance: shortestDistance
        };
    };




    useEffect(() => {
        if (labResponse?.data) {
            let locations = (labResponse?.data ?? [])?.map((item) => {
                return { ...item, lat: item?.latitude, lng: item?.longitude }
            })

            const targetLocation = selectaddress ?? {}
            const result = findNearestLocation(locations, targetLocation);

            console.log(`Nearest Location:`, result.nearestLocation);
            console.log(`Distance: ${result.distance} km`);


            if (result) {
                if (Number(result?.distance) > 15) {
                    setnearCenter(null)
                    setselectaddress()
                    toast.error("Select Area Under 15 KM")
                } else {
                    setnearCenter(result?.nearestLocation)
                }

            }



        }


    }, [selectaddress])




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

    const [AddressResponse, AddressHandler] = useAPI(
        {
            url: `/address/useraddress`,
            method: "get",
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
    useEffect(() => {
        if (session?.data) {
            AddressHandler({
                params: {
                    userId: session?.data?.user?.id
                }
            })
        }
    }, [session?.session])


    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    return (<>
        <div className="text-capitalize" >
            <div className="my-3 select-tab" style={{ display: "flex", color: "green" }} >

                <div onClick={changecheckboxcollecion} class="d-flex mx-3 bg-white py-2 px-3 border border-2 rounded">
                    <div>

                        <CheckboxInput
                            check={iscollection}
                            setChecked={changecheckboxcollecion}
                            label={''}
                        />

                    </div>
                    <div className='pt-1' >
                        {'Home Collection'}
                    </div>

                </div>
                <div onClick={changecheckboxlab} class="d-flex form-check mx-3 bg-white py-2 px-3 border border-2 rounded">
                    <div>

                        <CheckboxInput
                            check={islab}
                            setChecked={changecheckboxlab}
                            label={''}
                        />


                    </div>
                    <div className='pt-1' >
                        {'Lab'}
                    </div>

                </div>
            </div>


            <div className="row">
                {iscollection && <div className="col-sm-8 col-12 ">
                    <h2 className="p-4 " style={{ fontWeight: "700", fontSize: "1.2rem" }}> Sample Collection Address</h2>
                    <div>

                        <LoaderGeneral
                            noContentMessage="Address not found"
                            state={
                                AddressResponse?.fetching
                                    ? "loading"
                                    : [null, undefined].includes(AddressResponse?.data)
                                        ? "no-content"
                                        : "none"

                            }
                        />
                        {!AddressResponse?.fetching && <div >
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

                                            <span className="px-2 pt-0" style={{
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

                        </div>}


                    </div>
                    <button type="button" onClick={() => {
                        toggle2()
                    }} className="add_another_member_btn">Add Address</button>
                </div>
                }



                { islab && <div className="col-sm-8 col-12 my-2">

                    
                   <LoaderGeneral
                            noContentMessage="Center not found"
                            state={
                                labResponse?.fetching
                                    ? "loading"
                                    : [null, undefined].includes(labResponse?.data)
                                        ? "no-content"
                                        : "none"

                            }
                        />
                  {!labResponse?.fetching &&  <div>
                   {(labResponse?.data ?? [])?.map((item, index) => {
                        return <div key={index} className="my-1" onClick={() => {
                            setselectlab(item)
                        }} >
                            <div className="p-3 bg-white rounded border w-100 ">
                                <div className=" d-flex filter-boxleft py-2 " style={{ borderBottom: "1px solid #dee2db ", width: "100%" }}>
                                    <div>

                                        <CheckboxInput
                                            check={selectlab?._id == item?._id}
                                            setChecked={() => {
                                                setselectlab(item)
                                            }}
                                            label={''}
                                        />
                                    </div>

                                    <div className='pt-1 px-2' style={{ fontSize: "1.1rem", fontWeight: "700" }} >
                                        {item?.centre ?? ""}
                                    </div>

                                </div>

                            

                            <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                {item?.address ?? ""}
                            </div>

                        </div>
                        </div>

                })}
                    </div>}
            </div>}

            <div className="checkout-mid-right col-sm-4 col-12" >
                <div className="summary" style={{ fontWeight: '700' }}>
                    <h3 style={{ fontWeight: '700' }} className="text-capitalize">Summary</h3>
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
                    <h3 style={{ fontWeight: '700' }} className="text-capitalize">Rate Details</h3>
                    <div className="checkout-rate-details">

                        {(addtestandpackage ?? [])?.map((testrate, index) => {
                            return <div className="member-box" key={index}>
                                <span style={{ fontWeight: "400" }} >{testrate?.name}</span>
                                <span>₹ {(testrate?.istest ?? [])?.filter((testtype) =>
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
                        }} className="btn btn-primary-theme  w-100 block  "  >Back</button>
                    </div>

                </div>
            </div>

        </div>



        <Address
            modal={modal2}
            toggle={toggle2}
            AddressHandler={AddressHandler}
        />

    </div >
    </>)
}


const Step3 = ({ selectedSlotId, setSelectedSlotId, slotdata, setslotdata, setstep, rate, addtestandpackage , nearCenter , selectlab , islab}) => {



    return (<>

        <div className="text-capitalize" >
            <div className="row" >
                <div className="col-sm-8 col-12" >
                    <UpcomingSlots 
                    selectedSlot={selectedSlotId} 
                    selectedCenter={islab ? selectlab?._id : nearCenter?._id} 
                    onChange={setSelectedSlotId} 
                    setslotdata={setslotdata} 
                    />
                </div>
                {<div className="checkout-mid-right col-sm-4 col-12" >
                    <div className="summary" style={{ fontWeight: '700' }} >
                        <h3 style={{ fontWeight: '700' }} className="text-capitalize">Summary</h3>
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
                        <h3 style={{ fontWeight: '700' }} className="text-capitalize">Rate Details</h3>
                        <div className="checkout-rate-details">

                            {(addtestandpackage ?? [])?.map((testrate, index) => {
                                return <div className="member-box" key={index}>
                                    <span style={{ fontWeight: "400" }} >{testrate?.name}</span>
                                    <span>₹ {(testrate?.istest ?? [])?.filter((testtype) =>
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
                        }} className="btn btn-primary-theme  w-100 block  " >Back</button>
                    </div>
                </div>}
            </div>
        </div>
    </>
    )
}

const Step4 = ({ setstep, rate, addtestandpackage, selectedSlotId, islab, selectaddress,
     selectlab, slotdata, nearCenter }) => {




    // step 4 

    const router = useRouter();


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
            localStorage?.setItem('testpackage', JSON.stringify({}));


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
                localStorage?.setItem('testpackage', JSON.stringify({}));
                router.push("/");
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



    const [CouponResponse, CouponHandler] = useAPI(
        {
            url: "/bookings/getcoupon",
            method: "get",
            body: {

            }
        },
        (e) => {

            return e?.data

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



    useEffect(() => {

        if (session?.data) {
            CouponHandler()
        }
    }, [session?.data])




    const submit = async () => {

        let bookingtest = await (addtestandpackage ?? [])
            .filter((item) => (item?.istest ?? []).some((key) => key?.isselect === true))
            .map((item) => ({
                member_id: item?._id,
                packages: item?.istest?.map((key) => key?._id)
            }));

        BookingHandler({
            body: {
                team_members: bookingtest,
                center_id: islab ? selectlab?._id : nearCenter?._id,
                payment_type: ispayonline ? "online" : "cash",
                collection_type: islab ? "lab" : "home",
                slot_id: selectedSlotId,
                discount: totalDiscount,
                home_collection_charge: 0,
                total: totalPrice,
                address_id: islab == false ? selectaddress._id : null ?? null,
                coupon_id: selectCoupon?._id ?? null,
            }
        })
    }



    const [selectCoupon, setselectCoupon] = useState({})

    const [iscouponcode, setisCouponcode] = useState(false)
    const CouponToggle = () => {
        setisCouponcode(!iscouponcode)
    }



    const [TestPackage, setTestPackage] = useState([])
    useEffect(() => {

        if (addtestandpackage) {
            setTestPackage(addtestandpackage)
        }

    }, [selectCoupon, addtestandpackage])


    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const calculateTotals = async () => {
        let totalPrice = 0;
        let totalDiscount = 0;

        (TestPackage ?? []).forEach((check) => {
            if (check?.istest?.some(key => key?.isselect === true)) {
                check.istest?.forEach((item) => {
                    if (item?.isselect) {
                        const price = item?.testType === "Test" ? item?.rate : item?.totalMrp;

                        const isTestConditionValid =
                            (selectCoupon?.testCondition?.[0] ?? "") === "*" ||
                            selectCoupon?.selectedCriteria?.testCondition?.some(key => key === item?._id);

                        const isPackageConditionValid =
                            (selectCoupon?.Packages?.[0] ?? "") === "*" ||
                            selectCoupon?.selectedCriteria?.Packages?.some(key => key === item?._id);

                        const discount = item?.testType === "Test"
                            ? (isTestConditionValid ? (Number(item?.rate) / Number(selectCoupon?.discountValue)) : 0)
                            : (isPackageConditionValid ? (Number(item?.totalMrp) / Number(selectCoupon?.discountValue)) : 0);

                        const finalAmount = price - discount;

                        totalPrice += finalAmount;
                        totalDiscount += discount;
                    }
                });
            }
        });

        setTotalPrice(totalPrice ?? 0);
        setTotalDiscount(totalDiscount ?? 0);
    };

    useEffect(() => {
        calculateTotals();
    }, [TestPackage, selectCoupon]);

    return (<>
        <div className="text-capitalize" >

            <div className="row my-3" >

                <div className="col-sm-8 col-12 rounded "  >

                    <div>
                        <h3 style={{ fontWeight: '700',color:'#003747' }} className="text-capitalize my-2">Summary</h3>

                        {(TestPackage ?? [])?.filter((check) => check?.istest
                            ?.some((key) => key?.isselect == true) == true)?.map((item, index) => {



                                return <div key={index} className="my-3 border border-2 p-2 rounded" >
                                    <h6 className="px-2 " style={{ fontWeight: "600" }} >{item?.name}</h6>
                                    <div className="row">
                                        {item?.istest?.filter((test) => test?.isselect == true)?.map((item, index) => {
                                            let price = item?.testType == "Test" ? item?.rate : item?.totalMrp

                                            let discount = item?.testType == "Test" ?
                                                (((selectCoupon?.testCondition ?? [])[0] ?? "") == "*" ||
                                                    selectCoupon?.selectedCriteria?.testCondition?.some(key =>
                                                        key === item?._id))
                                                    ? (Number(item?.rate)
                                                        / Number(selectCoupon?.discountValue))
                                                    : 0
                                                :
                                                (((selectCoupon?.Packages ?? [])[0] ?? "") == "*" ||
                                                    selectCoupon?.selectedCriteria?.Packages?.some(key =>
                                                        key === item?._id))
                                                    ? (Number(item?.totalMrp)
                                                        / Number(selectCoupon?.discountValue))
                                                    : 0

                                            let finalamount = price - discount

                                            return <div key={index} className="col-sm-6 col-12" >
                                                <div className={`checkbox-tests-packages-item 
                                                 ${item?.testType == "Test" ?
                                                        "test_backgound" : ""}  w-100 `}>
                                                    <img src="/assets/images/test-icon.png" />
                                                    <div className="checkbox-tests-name">
                                                        {item?.name}
                                                        <span> Price ₹ {price}</span>
                                                        <span> Discount Price  - ₹ {discount} </span>
                                                        <h6> Final Amount  - ₹ {finalamount} </h6>
                                                    </div>
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
                                                <div className="checkbox-tests-name">{key?.name}
                                                    <span>₹ {key?.testType == "Test" ? key?.rate :
                                                        key?.totalMrp}</span></div>
                                            </div>
                                        </div>)
                                    })}
                                </div>
                            </div>)
                        })}
                    </div>



                    <div>
                        <h6 style={{ fontWeight: "700", fontSize: "1.0rem",color:'#003747' }} >{islab ? "Lab" : "Home Collection"} </h6>


                        {islab ? <div className="p-3 bg-white rounded border w-100 ">
                            <div className="filter-boxleft py-2 " style={{ borderBottom: "1px solid #dee2db ", width: "100%" }}>

                                <span className="px-2" style={{ fontSize: "1.1rem", fontWeight: "700" }}>
                                    {selectlab?.centre ?? ""}</span>

                            </div>

                            <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                {selectlab?.address ?? ""}
                            </div>

                        </div> :

                            <div className="p-3 bg-white rounded border w-100 ">
                                <div className="filter-boxleft py-2 " style={{
                                    borderBottom: "1px solid #dee2db ",
                                    width: "100%"
                                }}>

                                    <span className="px-2" style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "700"
                                    }}>{selectaddress?.addressType ?? ""}</span>

                                </div>

                                <div className="checkbox-tests-name  " style={{ display: "block", paddingLeft: "15px" }}>
                                    {selectaddress?.houseNo}   {selectaddress?.addressLine1 ?? ""}
                                </div>

                            </div>
                        }




                    </div>


                    <div className="bg-white  my-4  rounded">

                        <div className="row  py-2 mt-1 rounded" style={{ background: "#f1f6ee" }} >
                            <div className="col-2 text-center" >
                                <img src="/assets/images/time.png" className="p-2 mt-2 rounded-circle" style={{ height: "40px", background: "#f1f6ee" }} />
                            </div>
                            <div className="col-10 pt-2" >
                                <h6 style={{ fontWeight: "700", fontSize: "0.9rem" }} >At {slotdata?.slotStartTime ?? ""} </h6>
                                <p className="mb-1" style={{ fontSize: "0.7rem" }}>{moment(slotdata?.date)?.format("DD MMMM YYYY")}</p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="col-sm-4 col-12  " >



                    <div>

                        {selectCoupon?.couponCode && <div className="my-3 shadow p-3" >

                            <span style={{ fontWeight: "700" }} >Appiled Coupon Code</span>
                            <span style={{ color: "#003747", float: "right", fontSize: "1.0rem", fontWeight: "600" }} >{selectCoupon?.couponCode}</span>
                        </div>}

                        <button onClick={() => {
                            CouponToggle()
                        }} className="btn btn-primary-theme  w-100">
                            Apply Coupon Code
                        </button>
                        <AddCoupon
                            modal={iscouponcode}
                            toggle={CouponToggle}
                            CouponResponse={CouponResponse?.data}
                            setselectCoupon={setselectCoupon}
                            selectCoupon={selectCoupon}
                        />



                    </div>



                    <div className="px-2 my-3" style={{ border: "2px solid #f1f6ee" }}>

                        <h5 className="p-2 rounded" style={{
                            borderBottom: "2px solid #f1f6ee",
                            fontSize: "1.0rem", fontWeight: "700"
                        }}>
                            Price Details
                        </h5>
                        {(addtestandpackage?.cart ?? [])?.map((item, index) => {
                            return (<div key={index}>
                                <div className="row my-4"  >

                                    <h5 className="col-6 px-4" style={{ fontSize: "1.0rem" }}>
                                        {item?.name ?? ""} (Price)</h5>
                                    <h6 className="col-6" style={{ textAlign: "right" }} >
                                        ₹ {(item?.istest ?? [])?.filter((key) => key?.isselect == true)?.reduce((accumulator, item) => accumulator + (item?.testType == "Test" ? item?.rate : item?.totalMrp || 0), 0)}</h6>
                                </div>


                            </div>)
                        })}


                        <div className="row px-3 py-2" style={{ borderTop: "2px solid #f1f6ee" }}>
                            <h5 className="col-6 " style={{ fontSize: "1.1rem", fontWeight: "500" }}>Total</h5>
                            <h5 className="col-6" style={{ fontSize: "1.1rem", fontWeight: "500", color: "#46bb00", textAlign: "right" }}>₹ {rate}</h5>
                            <h5 className="col-6 " style={{ fontSize: "1.1rem", fontWeight: "500" }}>Discount</h5>
                            <h5 className="col-6" style={{
                                fontSize: "1.1rem", fontWeight: "500",
                                color: "#46bb00", textAlign: "right"
                            }}>₹ {totalDiscount}</h5>
                            <h5 className="col-6 " style={{ fontSize: "1.1rem", fontWeight: "500" }}>Final Price</h5>
                            <h5 className="col-6" style={{
                                fontSize: "1.1rem", fontWeight: "500",
                                color: "#46bb00", textAlign: "right"
                            }}>₹ {totalPrice}</h5>
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
                        <button onClick={submit} className="continue_button" >
                            {(BookingResponse?.fetching || PaymentResponse?.fetching) ? <Spinner size="sm" /> : "Pay Now"}
                        </button>
                        <div className=" my-2">
                            <button onClick={() => {
                                setstep(3)
                            }} className="btn btn-primary-theme  w-100 block  " >Back</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}