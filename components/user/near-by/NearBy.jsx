'use client'
import React, { useState, useEffect } from 'react'
import './nearby.css'
import '@/styles/common-card-designs/card_designs.css'

import { FaAngleDown, FaPhone, FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import useAPI from '@/hooks/useAPI';
import { Spinner } from 'reactstrap';

const NearBy = () => {

    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState({
        latitude: null,
        longitude: null
    });
    const [centerData, setCenterData] = useState([])
    const [state, setState] = useState('rajasthan');
    const [city, setCity] = useState('jaipur');



    const [inputSearch, setInputSearch] = useState('')
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



            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {

                        setCoordinates({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude

                        })

                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }



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


    useEffect(() => {

        if (coordinates?.latitude !== null && coordinates?.longitude !== null && allPackageResponse) {



            let data = (allPackageResponse?.data?.data ?? []).map((item) => {

                const distance = getDistanceFromLatLonInKm(Number(coordinates.latitude), Number(coordinates.longitude), Number(item?.latitude), Number(item?.longitude))


                return { ...item, distanceFromLocation: distance }


            })
            setCenterData(data ?? [])

        }
    }, [coordinates])

    const inputChange = (e) => {
        setInputSearch(e.target.value)
        allPackageHandler({
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                pageNo: 1,
                pageSize: 20,
                searchQuery: e.target.value,
            },
        })
    }

    return (
        <div style={{ position: 'relative' }}>

            <iframe
                width="100%"
                height="500"
                src="https://maps.google.com/maps?q=Jaipur,+Rajasthan&t=&z=12&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                // style="border:0"
                allowfullscreen
                aria-hidden="false"
                tabindex="0"
                title="Map of Jaipur"
            ></iframe>

            <div className='floating-map-div'>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '342px' }}>

                    <div style={{ color: 'white', fontSize: '20px', fontWeight: '600', padding: '15px 10px', borderRadius: '5px', backgroundColor: '#003747' }} >
                        <div className="search-box">
                            <button className="btn-search"><FaSearch /></button>

                            <input type="text" className="input-search" placeholder="Type to Search..." onChange={(e) => { inputChange(e) }} />
                        </div>
                        {/* <span >Offices and Main Labs</span> */}

                    </div>
                    {allPackageResponse?.fetching ? (
                        <div className='text-center my-5'>

                            <Spinner size={"lg"} />
                        </div>

                    ) : (
                        <div className='scroll-div'>


                            {
                                (centerData ?? []).map((itemValue, index) => {
                                    return <LocationCard itemValue={itemValue} key={index} />
                                })
                            }

                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default NearBy


const LocationCard = ({ itemValue }) => {

    const [showDiv, setShowDiv] = useState(false)
    const [viewFacilities, setviewFacilities] = useState(false)
    const [ViewTimings, setViewTimings] = useState(false)


    function openGoogleMaps(lat, lng) {
        // console.log('...........................................');

        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
    }



    return (

        <div className='w-100' style={{ padding: '15px 20px', cursor: 'pointer' }}>
            <div className={`row ${showDiv ? ' noraml-lab-details-text-selected ' : ' noraml-lab-details-text'} `} style={{ fontSize: '18px', fontWeight: '500' }}>
                <p onClick={() => { setShowDiv(!showDiv) }} className='col-10'>
                    {itemValue?.centre}


                </p>
                <p onClick={() => { setShowDiv(!showDiv) }} className='col-2'>
                    <span className={` ${showDiv ? ' noraml-lab-details-text-icon-selected ' : 'noraml-lab-details-text-icon'}  `} style={{ padding: '0px 4px 0px 4px', color: 'white', fontWeight: '700', borderRadius: '50%' }}>
                        +
                    </span>

                </p>
            </div>

            {
                showDiv &&
                <div>
                    <hr style={{ border: '2px solid #003747' }} />

                    <div className='row'>
                        <p className='col-8' style={{ color: '#86868a', fontSize: '16px' }}>
                            {itemValue?.address}

                        </p>
                        <p className='col-4 text-end' style={{ color: '#46b902', fontSize: '13px', fontWeight: '500' }}>
                            {(itemValue?.distanceFromLocation)?.toFixed() ?? ''} Km Away
                        </p>
                    </div>



                    <div className='row w-100 ' >
                        <p className='col-12' style={{ fontSize: '15px' }}>

                            <p className='mb-2' onClick={() => { setviewFacilities(!viewFacilities) }} style={{ fontSize: '15px' }}>
                                View Facilities <FaAngleDown />
                                {viewFacilities &&
                                    <div style={{ fontSize: '13px', color: '#86868a' }}>
                                        All Pathology Services
                                    </div>

                                }




                            </p>
                            <p onClick={() => { setViewTimings(!ViewTimings) }} className='' style={{ fontSize: '15px' }}>
                                Timings <FaAngleDown />

                                {ViewTimings &&
                                    <div style={{ fontSize: '13px', color: '#86868a' }} >

                                        {itemValue.labOpeningTime} - {itemValue.labClosingTime}

                                    </div>

                                }


                            </p>

                        </p>

                        <p className='col-12 d-flex gap-4' style={{ fontSize: '15px' }}>
                            <div className='mb-2'>
                                <button className='d-flex gap-1 py-1 px-2   card-button-2' style={{
                                    borderRadius:
                                        '10px', color: 'white', fontWeight: '600'
                                }}><p className='mb-0'><FaPhone /></p><span>{itemValue.contact}</span></button>


                            </div>
                            <div className=' '>
                                <button onClick={() => {
                                    openGoogleMaps(Number(itemValue?.latitude), Number(itemValue?.longitude))

                                }} className='d-flex gap-1 py-1 px-2  card-button-2' style={{
                                    borderRadius: '10px', color: 'white', fontWeight: '600'
                                }}>

                                    <p className='mb-0' style={{ paddingTop: '0px' }}><FaArrowsSplitUpAndLeft /></p>
                                    <span>View_Directions</span>
                                </button>
                            </div>



                        </p>



                    </div>


                </div>
            }



        </div>
    )
}

let array = [
    { centername: 'Jaipur Diaganostics', distance: '145 KM', address: 'Chandra Colony Bengali Wale gali Near Nagar Palika Nadbai, Bharatpur ,Bharatpur', openAt: '07:30 AM', close: '07:30 PM', contact: '', direction: '' },
    { centername: 'Dr. B. Lal Lab - Gulzar Bagh', distance: '145 KM', address: 'Chandra Colony Bengali Wale gali Near Nagar Palika Nadbai, Bharatpur ,Bharatpur', openAt: '07:30 AM', close: '07:30 PM', contact: '', direction: '' },
    { centername: 'Nadbai Center', distance: '145 KM', address: 'Chandra Colony Bengali Wale gali Near Nagar Palika Nadbai, Bharatpur ,Bharatpur', openAt: '07:30 AM', close: '07:30 PM', contact: '', direction: '' },
    { centername: 'Jaipur Diaganostics', distance: '145 KM', address: 'Chandra Colony Bengali Wale gali Near Nagar Palika Nadbai, Bharatpur ,Bharatpur', openAt: '07:30 AM', close: '07:30 PM', contact: '', direction: '' },
]




function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1); // Difference in latitude
    const dLon = deg2rad(lon2 - lon1); // Difference in longitude
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Helper function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}



