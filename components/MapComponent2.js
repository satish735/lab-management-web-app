"use client";
import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { FaLocationCrosshairs, FaLocationArrow } from "react-icons/fa6";
import { MdLocationOff, MdLocationOn } from "react-icons/md";

const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
  minHeight:"70vh"
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent2 = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState({});
  const [position, setPosition] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [markPositionOn, setMarkPositionOn] = useState(false)
  const setMarkPositionOnToggle = () => setMarkPositionOn(!markPositionOn)

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setPosition({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setAddress(place);
   
      }
    }
  };

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const getCurrentLocation = () => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setPosition({ lat: latitude, lng: longitude });
          if (map) {
            map?.setZoom(15);
          }
          fetchAddress(latitude, longitude); // Fetch address for current location
        },
        () => {
          console.error('Geolocation request failed.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.status === 'OK') {
       
        setAddress(response.data.results[0]);
      } else {
        setAddress({error:'Address not found'});
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress({error:'Error fetching address'});
    }
  };

  const goToLiveLocation = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
      map.setZoom(15);
    }
  };

  useEffect(() => {
    if (position?.lat === defaultCenter?.lat && position?.lng === defaultCenter?.lng) {
      getCurrentLocation();
    }

    if (autocomplete) {
      const listener = autocomplete?.addListener('place_changed', onPlaceChanged);
      return () => {
        listener.remove();
      };
    }
  }, [autocomplete, position]);
  const handleMapClick = (event) => {
    if (markPositionOn) {
      const latLng = event.latLng.toJSON();
      setPosition(latLng);
      fetchAddress(latLng.lat, latLng.lng); // Optionally fetch the address of the clicked position
    }
  };
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div style={{ position: 'relative', height: '400px' }}>
        <Autocomplete onLoad={onLoadAutocomplete}>
          <input
            type="text"
            placeholder="Search address"
            className='map-search-input form-control'
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={15}
          onLoad={onLoad}
          onClick={handleMapClick}
        >
          <FaLocationCrosshairs onClick={getCurrentLocation} style={{ left: "10px" }}
            className={`map-buttons ${position?.lat == userLocation?.lat && position?.lng == userLocation?.lng ? "active" :""}`} />
          <FaLocationArrow onClick={goToLiveLocation} style={{ left: "60px" }}
            className={`map-buttons`} />
          {!markPositionOn ? <MdLocationOff onClick={setMarkPositionOnToggle} style={{ left: "110px" }} className='map-buttons ' /> :
            <MdLocationOn onClick={setMarkPositionOnToggle} style={{ left: "110px" }} className='map-buttons active' />}
          <Marker position={position} />
        </GoogleMap>
        <div>Address :- {address?.formatted_address}</div>
      </div>
    </LoadScript>
  );
};

export default MapComponent2;
