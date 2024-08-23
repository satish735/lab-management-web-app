import MemberShip from '@/components/member-ship-card/MemberShip'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
    return (
        <div>
            <UserLayout>
                <MemberShip />
                
            </UserLayout>
        </div>
    )
}

export default page