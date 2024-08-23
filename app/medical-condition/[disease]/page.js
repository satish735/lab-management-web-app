import MedicalCondition from '@/components/test&packages/medical-condition-component/MedicalCondition'
import React from 'react'

import PopularTest from '@/components/home-component/popular-test/PopularTest';
import UserLayout from '@/layouts/UserLayout';

const page = () => {
  return (
    <UserLayout >
      

        <MedicalCondition />

        <PopularTest />

       
    </UserLayout>
  )
}

export default page