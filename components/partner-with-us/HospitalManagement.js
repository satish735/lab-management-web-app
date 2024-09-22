import React from 'react'
import { EnquireForm } from './FranchisingOpport'

const HospitalManagement = ({content}) => {
  return (
    <div className='row'>



      <div className='col-lg-8 col-md-8 col-sm-12 px-2'>
      {content?.text ? (
                    <div className='ckeditor-content-div'  dangerouslySetInnerHTML={{ __html: content.text }} />
                ) : (
                    <p>Loading content...</p> // Fallback or placeholder while content is loading
                )}
      </div>

      <div className='col-lg-4 col-md-4 col-sm-12 px-2 pt-5'>
        <EnquireForm enquireType={'hospital-management'} />
      </div>

    </div>
  )
}

export default HospitalManagement