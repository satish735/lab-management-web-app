 
import PopularTest from '@/components/home-component/popular-test/PopularTest'
import AboutUs from '@/components/user/about-us/AboutUs'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
    return (
        <UserLayout>
        <div>

            <AboutUs />
            <PopularTest />

        </div>
        </UserLayout>
    )
}

export default page