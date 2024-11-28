'use client';
import React, { useEffect, useState } from 'react';
import '@/components/home-component/popular-test/popular-test-bottom-portion.css';
import { useRouter } from 'next/navigation';

const PopularLinkComponent = ({ item, type }) => {
    const [data, setData] = useState(null);
    const router = useRouter();

    // Use useEffect to access localStorage in the client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const localStorageData = JSON.parse(localStorage.getItem('selectedLocation'));
            setData(localStorageData);
        }
    }, []);

    const location = (data?.selectedLocation || 'jaipur').replace(/\s+/g, '-');

    return (
        <>
            {type === 'test' ? (
                <div className='test-break-border' style={{ justifyContent: 'center' }}>
                    {(item ?? []).map((value, index) => (
                        <span
                            onClick={() => {
                                router.push(`/${location}/lab-test/test?id=${value?.value}`);
                            }}
                            className='links-test'
                            style={{ lineHeight: '1.9' }}
                            key={index}
                        >
                            {value?.label}{' '}
                            <span style={{ fontWeight: '900', fontSize: '20px' }}>|</span>{' '}
                        </span>
                    ))}
                </div>
            ) : (
                <div className='center-break-border' style={{ justifyContent: 'center' }}>
                Diagnostic Center In {(item ?? []).map((value, index) => (
                        <span className='links-test' style={{ lineHeight: '1.9' }} key={index}>
                             {value?.label}{' '}
                            <span style={{ fontWeight: '900', fontSize: '20px' }}>|</span>{' '}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
};

export default PopularLinkComponent;
