
import MedicalCondition from '@/components/test&packages/medical-condition-component/MedicalCondition'
import React  from 'react'

import PopularTest from '@/components/home-component/popular-test/PopularTest';
import UserLayout from '@/layouts/UserLayout';
 

const page = ({ searchParams }) => {
 
  return (
    <UserLayout >


      <MedicalCondition searchParams={searchParams} type={'testcondition'} />

      <PopularTest />


    </UserLayout>
  )
}

export default page