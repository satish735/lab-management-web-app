import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
import HealthPackage from '@/components/test&packages/health-package-component/HealthPackage'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
  return (
    <div className='position-relative'>

      <UserLayout>
        <HealthPackage />
      </UserLayout>
      <PhoneViewSlide />

    </div>

  )
}

export default page