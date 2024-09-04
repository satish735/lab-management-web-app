import PopularTest from '@/components/home-component/popular-test/PopularTest'
import PartnerWithUs from '@/components/partner-with-us/PartnerWithUs'
 import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
    return (
        <UserLayout>
            <PartnerWithUs />
            <PopularTest />

        </UserLayout>
    )
}

export default page