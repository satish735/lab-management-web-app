import SvgIcon from '@/components/home-component/SvgIcon'
import SkeletonTextLoder from '@/components/SkeletonLoders/SkeletonTextLoder'
import React from 'react'

const TestsDetails = ({ packageData }) => {
   
  return (
    <div className='px-3 py-3 global-background-gradient' style={{  borderRadius: '13px' }}>

      <p style={{ fontSize: '24px', fontWeight: '600', color: 'white' }}>
        {packageData?.name ?? ''}
      </p>

      <hr style={{ color: 'white' }} />
      <p style={{ fontSize: '18px', fontWeight: '500', color: 'white' }}>
        Requirements
      </p>

      <div>
        <div className='d-flex gap-2'>
          <div className='pt-3'><span style={{ padding: '10px', backgroundColor: '#21cdad', borderRadius: '10px' }}> <SvgIcon setColor={'white'} /></span>
          </div>
          <div> <p className='mb-1' style={{ fontSize: '18px', color: '#21cdad', fontWeight: '400' }}>Sample Required</p>
             

            {(packageData?.sampleCollection) ?
              <p style={{ fontSize: '13px', color: 'white', fontWeight: '400' }}>{packageData?.sampleCollection ?? ''}</p>
              :
              <SkeletonTextLoder />
            }
          </div>
        </div>


        <div className='d-flex gap-2'>
          <div className='pt-3'><span style={{ padding: '10px', backgroundColor: '#21cdad', borderRadius: '10px' }}> <SvgIcon setColor={'white'} /></span>
          </div>
          <div> <p className='mb-1' style={{ fontSize: '18px', color: '#21cdad', fontWeight: '400' }}>Preperations Required</p>
           

            {(packageData?.preparation) ?
              <p style={{ fontSize: '13px', color: 'white', fontWeight: '400' }}>{packageData?.preparation ?? ''}</p>
              :
              <SkeletonTextLoder />
            }
          </div>
        </div>



        <div className='d-flex gap-2'>
          <div className='pt-3'><span style={{ padding: '10px', backgroundColor: '#21cdad', borderRadius: '10px' }}> <SvgIcon setColor={'white'} /></span>
          </div>
          <div> <p className='mb-1' style={{ fontSize: '18px', color: '#21cdad', fontWeight: '400' }}>Gender</p>
            

            {(packageData?.gender) ?
              <p style={{ fontSize: '13px', color: 'white', fontWeight: '400' }}>{packageData?.gender === 'both' ? 'Male & Female' : packageData?.gender}</p>
              :
              <SkeletonTextLoder />
            }
          </div>
        </div>



        <div className='d-flex gap-2'>
          <div className='pt-3'><span style={{ padding: '10px', backgroundColor: '#21cdad', borderRadius: '10px' }}> <SvgIcon setColor={'white'} /></span>
          </div>
          <div> <p className='mb-1' style={{ fontSize: '18px', color: '#21cdad', fontWeight: '400' }}>Age Group</p>
           

            {(packageData?.toAge) ?
              <p style={{ fontSize: '13px', color: 'white', fontWeight: '400' }}>{packageData?.fromAge ?? ''} - {packageData?.toAge ?? ''} years</p>
              :
              <SkeletonTextLoder />
            }
          </div>
        </div>




        <div className='d-flex gap-2 mb-2'>
          <div className='pt-3'><span style={{ padding: '10px', backgroundColor: '#21cdad', borderRadius: '10px' }}> <SvgIcon setColor={'white'} /></span>
          </div>
          <div> <p className='mb-1' style={{ fontSize: '18px', color: '#21cdad', fontWeight: '400' }}>Collection At</p>
           

            {(packageData) ?
              <p style={{ fontSize: '13px', color: 'white', fontWeight: '400' }}>{packageData?.homeCollection ? 'Home & Lab' : 'Lab'}</p>
              :
              <SkeletonTextLoder />
            }
          </div>
        </div>





      </div><Card packageData={packageData} />
      <div>

      </div>
    </div>
  )
}

export default TestsDetails



const Card = ({ packageData }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '13px' }}>
      <div style={{ backgroundColor: '#21cdad', padding: '10px', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>

        <div className='d-flex justify-content-between'>
          <p><span style={{ color: 'white' }}> ₹ {packageData?.rate ?? ''}</span>  <span style={{ textDecoration: 'line-through', color: 'red' }}> ₹ {packageData?.rate ?? ''}</span></p>

          <div>
            <button className='card-button-package-card-light'>
              Add to Cart
            </button>
          </div>

        </div>

        <hr />

        <div className='row'>
          <div className='col-4'>
            <div className='row'>
              <div className='col-lg-4 col-md-4 col-sm-12 pt-2  mb-3'>
                <span className='p-2 ' style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                  <SvgIcon setColor='#7c7c7c' />

                </span>

              </div>
              <div className='col-lg-8 col-md-8 col-sm-12  ps-3' style={{ color: 'white', fontSize: '12px' }}>
                Free Home  collection


              </div>

            </div>
          </div>
          <div className='col-4'>
            <div className='row'>
              <div className='col-lg-4 col-md-4 col-sm-12 pt-2  mb-3'>
                <span className='   p-2 ' style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                  <SvgIcon setColor='#7c7c7c' />

                </span>

              </div>
              <div className='col-lg-8 col-md-8 col-sm-12  ps-3' style={{ color: 'white', fontSize: '12px' }}>
                {(packageData?.itemId ?? []).length} tests

                included


              </div>

            </div>
          </div>

          <div className='col-4'>
            <div className='row'>
              <div className='col-lg-4 col-md-4 col-sm-12  pt-2 mb-3'>
                <span className='   p-2 ' style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                  <SvgIcon setColor='#7c7c7c' />

                </span>

              </div>
              <div className='col-lg-8 col-md-8 col-sm-12  ps-3 ' style={{ color: 'white', fontSize: '12px' }}>
                Results with in {packageData?.reportGenerationHours } Hours


              </div>

            </div>
          </div>
        </div>

      </div>

      <div className='row ps-3 pe-4 py-3'>
        <div className='col-7' style={{ color: '#7c7c7c' }}>
          <span style={{ color: '#7c7c7c', fontWeight: '700' }}>10% off</span>   New user? Enjoy 10% off up to <span style={{ color: '#7c7c7c', fontWeight: '700' }}>Rs 200</span> on all tests and health packages.
        </div>
        <div className='col-5'>
          <div className='py-2 px-3' style={{ backgroundColor: "linear-gradient(180deg, rgba(136, 209, 110, .14), rgba(35, 151, 6, .14))", border: '1px solid #7c7c7c', borderRadius: '13px' }}>
            Use Code: <span style={{ color: '#7c7c7c', fontWeight: '700' }}>NEW10</span>

          </div>
        </div>
      </div>
    </div>
  )
}
