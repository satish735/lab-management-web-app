"use client";
import React, { useEffect, useState } from "react";

import "@/app/cart/cart.css"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


import {
    Offcanvas,
    OffcanvasBody,
    NavItem,
    Nav,
    Button
} from "reactstrap";

const Usercart = ({ isopencart, setisopencart }) => {




    const session = useSession()
    const router = useRouter();



    const [cartitem, setcartitem] = useState([])

    useEffect(() => {
        const storedData = localStorage?.getItem?.('testpackage');

        try {
            const parsedData = storedData ? JSON.parse(storedData) : null;

            setcartitem(parsedData?.item ?? []);
        } catch (error) {
            console.error('Failed to parse stored data:', error);
            setcartitem([])
        }
    }, [isopencart])

    const deleteitem = (data) => {


        let updatecart = (cartitem ?? []).filter((key) => key?._id !== data?._id);
        setcartitem(updatecart)

        if (updatecart?.length == 0) {
            setisopencart(false)
        }
        localStorage.setItem('testpackage', JSON.stringify({ item: updatecart }));
    }

    const continuenext = () => {
        if (session?.data?.user?.otherDetails) {
            router.push("/cart")
        } else {
            router.push("/login")
        }
    }

    return (
        <div className="midbox-inner" style={{ backgroundColor: "#dee2db" }}>

            <Offcanvas
                direction="end"
                toggle={() => { setisopencart(!isopencart) }}
                isOpen={isopencart}
                className="isopencart "
            >

                <OffcanvasBody style={{ padding: '0px' }}>

                    <div style={{ padding: '10px 10px', backgroundColor: '#003747', color: 'white', fontSize: '2rem', fontWeight: '700', textAlign: 'center', textDecoration: 'underline' }}>
                        Cart Details

                    </div>
                    <button type="button"
                        className="close border-0"
                        onClick={() => { setisopencart(!isopencart) }}
                        style={{ position: 'relative', float: "right", background: "white", fontSize: "1.9rem" }}>
                        &times;
                    </button>
                    <div className="px-3">

                        {(cartitem ?? [])?.length > 0 &&
                            <>
                                <div className="p-2 mt-5" >

                                    {(cartitem ?? [])?.map((item) => {
                                        return (<div className="row pt-2 my-1 rounded" style={{ border: "2px solid #003747" }}>
                                            <div className="col-2 " >
                                                <img
                                                    src="/assets/images/test-icon.png"
                                                    style={{ height: "40px", width: "40px", background: "#deead7" }}
                                                    className="p-2 mt-1 rounded-circle"
                                                />
                                            </div>
                                            <div className="col-8 mt-1" style={{ fontSize: "0.8rem" }}>
                                                <span style={{ fontWeight: "600" }}>{item?.name}</span>
                                                <p className="small pt-1" style={{ color: '#878787', fontWeight: '600' }}>₹ {item?.testType == "Test" ? item?.rate : item?.totalMrp}</p>

                                            </div>
                                            <div className="col-2" >

                                                <img
                                                    src="/assets/images/deleteicon.png"
                                                    style={{ height: "35px", width: "35px" }}
                                                    className="mt-2"
                                                    onClick={() => {
                                                        deleteitem(item)
                                                    }}

                                                />
                                            </div>
                                        </div>)
                                    })}

                                </div>


                                <div className="bg-white rounded p-3" style={{ border: "2px solid #003747" }}>
                                    <div className="row ">
                                        <div className="col-7 ">
                                            <span className="px-2 small" style={{ fontWeight: '700' }} >Price</span>
                                        </div>
                                        <div className="col-5 " style={{ float: "right", borderLeft: '2px solid #003747' }} >

                                            <span className="px-2 small" style={{ fontWeight: '700', color: '#878787' }}>₹ {(cartitem ?? []).reduce((totalprice, item) => totalprice + (item?.testType == "Test" ? item?.rate : item?.totalMrp ?? 0), 0)
                                            }</span>
                                        </div>

                                    </div>
                                </div>


                                {(cartitem ?? [])?.length && <div className="my-4 ">
                                    <button onClick={continuenext} className="btn btn-primary-theme w-100 " style={{
                                        display: "block",
                                        width: "100%",

                                        textAlign: "center",
                                        textDecoration: "none",

                                    }}>
                                        Book Now
                                    </button>
                                </div>}
                            </>}


                        {cartitem?.length == 0 &&
                            <div className="  " style={{ padding: '60px 0' }}  >
                                <p className="shadow py-4 text-center  " style={{ fontSize: '1.2rem', borderRadius: '10px' }}>
                                    No Item Selected Yet !
                                </p>
                            </div>
                        }
                    </div>

                </OffcanvasBody>
            </Offcanvas>

        </div >
    );
};

export default Usercart;
