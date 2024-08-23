"use client"
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaMapMarkerAlt } from "react-icons/fa";
import "./MapComponent.css"
import toast from 'react-hot-toast';
import MapComponent2 from '../MapComponent2';
const MapComponentModal = ({ update, defaultValue }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [pointerPosition, setPointerPosition] = useState({});
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPointerPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting location', error);
                    toast.error('Unable to retrieve your location');
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    }
    useEffect(() => {
        if (defaultValue?.lat && defaultValue?.lng && modal) {
            setPointerPosition({
                lat: defaultValue?.lat,
                lng: defaultValue?.lng,
            })
        }
        else if (modal) {
            getCurrentLocation()
        }
    }, [defaultValue, modal])
    return (
        <>
            <FaMapMarkerAlt className="form-location-button" onClick={toggle} />
            {modal && <Modal isOpen={modal} toggle={toggle} fullscreen={true} className='map-modal '>
                <ModalHeader toggle={toggle} className='py-0'>
                    <h1 className="main-heading">Search for Location</h1>
                    <p className="sub-heading">Enter location address on input to search for location</p>
                </ModalHeader>
                <ModalBody className='py-0'>
                    <MapComponent2 />
                </ModalBody>
                <ModalFooter className=''>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>}
        </>
    )
}

export default MapComponentModal
