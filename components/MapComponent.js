"use client"
import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(center);

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
        setAddress(place.formatted_address);
      }
    }
  };

  const onLoadAutocomplete = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener('place_changed', onPlaceChanged);
    }
    return () => {
      if (autocomplete) {
        autocomplete.removeListener('place_changed', onPlaceChanged);
      }
    };
  }, [autocomplete]);

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyDFncZxzZitr9ihdvIPF60fpdLs4oLd7Wg"}
      libraries={libraries}
    >
      <div>
        <Autocomplete onLoad={onLoadAutocomplete}>
          <input
            type="text"
            placeholder="Search address"
            style={{ width: '100%', height: '40px', marginBottom: '10px' }}
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={10}
          onLoad={onLoad}
        >
          <Marker position={position} />
        </GoogleMap>
        <div>{address}</div>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
