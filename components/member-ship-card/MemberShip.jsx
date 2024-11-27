
"use client";
import React from 'react'
import Banner from '../customdesign/Banner'
import MemberShipCard from '../customdesign/MemberShipCard'
import useAPI from "@/hooks/useAPI";
import transformErrorDefault from "@/utils/transformErrorDefault";

const MemberShip = () => {

    const [MemberShipResponse, MemberShipHandler] = useAPI(
        {
            url: "/membership/lists",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {
            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting memberships!",
                e
            ));
            return e
        }
    );
    console.log("MemberShipResponse", MemberShipResponse)


    return (
        <div>

            <Banner heading={'Care Membership Cards'} />
            <div style={{ padding: '30px 0' }}>
            <p className='mt-0 mb-2' style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: '700', color: '#003747', textDecoration: 'underline' }}> Membership Cards</p>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#97979a', width: '70%', margin: '0 auto' }}>

                        There&apos;s no reason to skip out on health when it comes with perks like comfort, convenience, and care. Become a member and take home many benefits of discounts on medicines, tests, packages and more. The SSDBC Shyam Diagnostic LLP provides membership cards to seniors and their families. We want to ensure that everyone has the opportunity to live a happy and healthy life.
                    </div>

                </div>
            </div>

            {/* <div className='' style={{ width: '94%', margin: '0 auto' }}>
                {(array ?? []).map((item, index) => {
                    return <MemberShipCardList item={item} key={index} />
                })

                }
            </div> */}

            <div className='row mb-5 px-3 m-2 mt-2 midbox-inner' >
                {(array ?? []).map((item, index) => {
                    return <div className=" col-md-4 col-sm-6 col-12 my-2" key={index}>
                        <MemberShipCard
                            card_name={item?.card_name}
                            imgsrc={item?.image}
                            description={item.description}
                            validity={item.validity}
                            price={item.price} />
                    </div>
                })

                }
            </div>

            {/* familyMembershipCard  seniorCetizen */}



            {/* MemberShipCard */}
        </div>
    )
}

export default MemberShip


const MemberShipCardList = ({ item }) => {

    return (
        <div className='row my-4 py-2' style={{ border: '1px solid #dee2db', borderRadius: '10px', backgroundColor: '#f1f6ee' }}>
            <div className='col-lg-5 col-md-5 col-sm-12'>
                <img src={item?.image} alt="" className="" style={{ height: '180px', width: '95%', border: 'none', borderRadius: '3px' }} />

            </div>

            <div className='col-lg-5 col-md-5 col-sm-12 pt-3'>
                <p className='mb-1' style={{ fontSize: '20px', color: '#000', fontWeight: '500' }}>
                    {item?.card_name}
                </p>
                <p className='mb-3' style={{ fontSize: '16px', color: '#97979a' }}>
                    (Validity: {item?.validity} )
                </p>

                <p className='mb-1' style={{ fontSize: '18px', fontWeight: '500' }}>
                    <span style={{ color: '#000' }}>
                        Price :

                    </span>
                    <span className='ms-2' style={{ color: '#46b902' }}>
                        ₹{item?.price}

                    </span>
                </p>

                <p className='mt-4' style={{ fontSize: '16px', color: '#97979a' }}>
                    {item?.description}
                </p>

            </div>


            <div className='col-lg-2 col-md-2 col-sm-12 mt-lg-4'>
                <button className='login-main-button ' style={{ padding: '6px 5px ', width: '130px' }}>
                    Learn More
                </button>
            </div>


        </div>
    )
}

let array = [{ image: '/assets/images/seniorCetizen.jpg', card_name: 'SENIOR CITIZEN CARD', validity: '1 Year', price: '100.00/-', description: 'Card for 60 years and above age' },
{ image: '/assets/images/familyMembershipCard.jpg', card_name: 'FAMILY CARE CARD', validity: '1 Year', price: '50.00/-', description: '5% discount on all tests' }

]