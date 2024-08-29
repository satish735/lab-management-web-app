import React from 'react'
import '@/components/package-details/total-test-include/totalTestInclude.css'
import TestListing from './TestListing'
import SvgIcon from '@/components/home-component/SvgIcon'
import PackageCardDesign from '../test-card/TestCardDesign'
const TotalTestInclude = ({ total_test }) => {
  return (
    <>
      <div className='test-include-div bg-white py-4' style={{ borderRadius: '10px' }}>
        <h2 className='heading-text px-3'>
          {total_test?.name ?? ''}
        </h2>

        <div className='px-3' >
          <TestListing item={total_test?.observation}   />

        </div>
        

      </div>

      <div className='no-of-test-done'>
        <div className='overlap-div-no-of-test-done'>

          <div className='row px-3 '>


            <div className='px-2 col-lg-3 col-md-3 col-sm-12'>
              <div className=' bg-white d-flex pt-3' style={{ borderRadius: '7px' }}>
                <div className='pt-2'>

                  <span className='  ps-2 pe-2' style={{}}>
                    <SvgIcon />

                  </span>
                </div>

                <p style={{ color: '#7c7c7c', fontSize: '15px' }}>
                  <span>
                    10,000 +

                  </span>
                  <br />
                  <span style={{ fontWeight: '600' }}>
                    Test Done
                  </span>
                </p>

              </div>
            </div>

            <div className='px-2 col-lg-3 col-md-3 col-sm-12'>
              <div className=' bg-white d-flex pt-3' style={{ borderRadius: '7px' }}>
                <div className='pt-2'>

                  <span className='  ps-2 pe-2' style={{}}>
                    <SvgIcon />

                  </span>
                </div>

                <p style={{ color: '#7c7c7c', fontSize: '15px' }}>
                  <span>
                    Trusted By

                  </span>
                  <br />
                  <span style={{ fontWeight: '600' }}>
                    Doctors
                  </span>
                </p>

              </div>
            </div>

            <div className='px-2 col-lg-3 col-md-3 col-sm-12'>
              <div className=' bg-white d-flex pt-3' style={{ borderRadius: '7px' }}>
                <div className='pt-2'>

                  <span className='  ps-2 pe-2' style={{}}>
                    <SvgIcon />

                  </span>
                </div>

                <p style={{ color: '#7c7c7c', fontSize: '15px' }}>
                  <span>
                    NABL Certified

                  </span>
                  <br />
                  <span style={{ fontWeight: '600' }}>
                    Labs
                  </span>
                </p>

              </div>
            </div>

            <div className='px-2 col-lg-3 col-md-3 col-sm-12'>
              <div className=' bg-white d-flex pt-3' style={{ borderRadius: '7px' }}>
                <div className='pt-2'>

                  <span className='  ps-2 pe-2' style={{}}>
                    <SvgIcon />

                  </span>
                </div>

                <p style={{ color: '#7c7c7c', fontSize: '15px' }}>
                  <span>
                    Free Home

                  </span>
                  <br />
                  <span style={{ fontWeight: '600' }}>
                    Collection
                  </span>
                </p>

              </div>
            </div>

          </div>






        </div>
      </div>


      <div className='bg-white my-3 py-3 px-3' style={{ borderRadius: '13px', border: '2px solid #e6e8eb' }}>
        <p className='heading-text' style={{ fontSize: '22px', fontWeight: '700' }}>
          OVERVIEW
        </p>

        <p className='mt-3 justify-center' style={{ fontSize: '16px', color: '#7c7c7c' }}>
          {total_test?.desc}
        </p>

      </div>



      <div>
        <p>

        </p>


      </div>
    </>

  )
}

export default TotalTestInclude


