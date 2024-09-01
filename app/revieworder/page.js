"use client";
import React, { useEffect, useState } from "react";
import "@/app/cart/cart.css"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CheckboxInput from "@/components/formInput/CheckboxInput.jsx"

const Home = ({  }) => {

    const router = useRouter();

    const[parsedData, setparsedData]= useState([])

    useEffect(() => {
        const storedData = localStorage.getItem('cart');
        const parsed = storedData ? JSON.parse(storedData) : [];
        setparsedData(parsed);
    }, []);



    const [ispayonline, setChecked] = useState(true)
    const [ispaycash, setispaycash] = useState(false)

    const changecheckboxpayonline = () => {
        if (ispayonline == false) {
            setChecked(!ispayonline)
            setispaycash(!ispaycash)
        }
    }

    const changecheckboxpaycash = () => {
        if (ispaycash == false) {
            setChecked(!ispayonline)
            setispaycash(!ispaycash)
        }

    }




    // const [PaymentResponse, PaymentHandler] = useAPI(
    //     {
    //         url: "/bookings/create-transaction",
    //         method: "post",
    //     },
    //     (e) => {
    //         toast.success("transaction successfully")
    //         router.push(e?.url);

    //     },
    //     (e) => {

    //         return toast.error(
    //             transformErrorDefault(
    //                 "Something went wrong while creating your order!",
    //                 e
    //             )
    //         );
    //         return e;
    //     }
    // );

    const [BookingResponse, BookingHandler] = useAPI(
        {
            url: "/bookings",
            method: "post",
        },
        (e) => {

            console.log("eeeeeeeeeeee", e)
            let bookingid = (e?.bookings ?? [])?.map((item) => {
                return item._id
            })
            toast.success("Booking created successfully")
            // PaymentHandler({
            //     body: {
            //         booking_ids: bookingid ?? []
            //     }
            // })

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
        let bookingtest = (parsedData?.cart ?? [])
            .filter((item) => (item?.istest ?? []).some((key) => key?.isselect === true))
            .map((item) => ({
                member_id: item?._id,
                packages: item?.istest?.map((key) => key?._id)
            }));


        console.log("parsedData", bookingtest)
        BookingHandler({
            body: {
                team_members: bookingtest,
                center_id: "66d2f3a4ec819eaf2ac4bcfc",
                payment_type: "cash",
                collection_type: "lab",
                slot_id: "66d43539f993be8ad9766010",
                discoun: 0,
                home_collection_charge: 0,
                total: 10,
                address_id: null,
                coupon_id: null,
                membership_id: null

            }
        })
    }

    return (
        <div className="midbox-inner" style={{ backgroundColor: "white", textTransform: "capitalize" }}>
            <div className="text-center py-3" style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                <span className="px-2">
                    Home {">"}
                </span>
                <span style={{ color: "#828599" }}>
                    Review Booking
                </span>
            </div>

            <h5 className="my-2 " style={{ fontSize: "1.2rem", fontWeight: "600" }}>Review your order</h5>

            <div className="row my-3" >

                <div className="col-sm-8 col-12 rounded " style={{ background: "#f1f6ee" }} >

                    <div className="bg-white p-3 my-4 mx-2 rounded" >
                        {(parsedData?.cart ?? [])?.map((item, index) => {
                            return (<div key={index}>
                                <div  className="row my-4" style={{ borderBottom: "2px solid #f1f6ee" }}  >

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


                    <div className="bg-white p-3 my-4 mx-2 rounded">
                        <h5 style={{ borderBottom: "2px solid #f1f6ee", fontSize: "1.0rem" }}>Sample payonline</h5>
                        <div className="row  py-2 mt-3 rounded" style={{ background: "#f1f6ee" }} >
                            <div className="col-2 text-center" >
                                <img src="/assets/images/locationicon.png" className="p-2 mt-2 rounded-circle" style={{ height: "40px", background: "#f1f6ee" }} />
                            </div>
                            <div className="col-10" >
                                <h6 style={{ fontWeight: "700", fontSize: "0.9rem" }} >From Others</h6>
                                <p className="" style={{ fontSize: "0.7rem" }}>dbcbcb, WQ2G+XCW, Bhagat Vatika, Civil Lines, Jaipur, Rajasthan 302007, India Jaipur, Rajasthan, 302007</p>
                            </div>

                        </div>


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
                    <div className="bg-white py-3 my-4 rounded" style={{ border: "2px solid #f1f6ee" }}>
                        <h5 className="p-2" style={{ borderBottom: "2px solid #f1f6ee", fontSize: "1.0rem" }}>Memberships</h5>
                        <div className="row  py-2 mt-3 mx-2 rounded" style={{ border: "2px solid #f1f6ee" }}>
                            <div className="col-2 text-center" >
                                <img src="/assets/images/test-icon.png" className="p-2 mt-2 rounded-circle" style={{ height: "40px", background: "#f1f6ee" }} />
                            </div>
                            <div className="col-10" >
                                <h6 style={{ fontWeight: "700", fontSize: "0.9rem" }} >Purchase a membership card for even greater discounts!</h6>
                                <p  style={{ fontSize: "0.7rem" }}>Click View All to explore the latest membership cards.</p>
                            </div>

                        </div>





                    </div>



                    <div className="px-2" style={{ border: "2px solid #f1f6ee" }}>

                        <h5 className="p-2 rounded" style={{ borderBottom: "2px solid #f1f6ee", fontSize: "1.0rem" }}>Price Details</h5>
                        {(parsedData?.cart ?? [])?.map((item, index) => {
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
                            <h5 className="col-6" style={{ fontSize: "1.1rem", fontWeight: "700", color: "#46bb00", textAlign: "right" }}>₹ 13580</h5>
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
                        <button onClick={submit} className="continue_button" >Pay Now</button>
                    </div>
                </div>

            </div>


        </div >
    );
};

export default Home;
