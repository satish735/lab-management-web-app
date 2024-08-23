import PopularTest from '@/components/home-component/popular-test/PopularTest'
import NearBy from '@/components/user/near-by/NearBy'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
    return (
        <UserLayout>
            <NearBy />
            <PopularTest />

        </UserLayout>
    )
}

export default page