"use client"
import React, { useEffect } from 'react'

const BootstrapClient = () => {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap');
    }, []);
    return (
        <span>
        </span>
    )
}

export default BootstrapClient
