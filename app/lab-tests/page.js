import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
import LabTest from '@/components/test&packages/lab-test-component/LabTest'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
  return (
    <div className='position-relative'>

      <UserLayout>
        <LabTest />
      </UserLayout>
      <PhoneViewSlide />

    </div>

  )
}

export default page