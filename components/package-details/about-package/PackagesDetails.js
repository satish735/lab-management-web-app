import SvgIcon from '@/components/home-component/SvgIcon'
import React from 'react'

const PackagesDetails = () => {
  return (
    <div className='px-3 py-3' style={{ background:'linear-gradient(180deg, rgb(1 7 63) , #004e92)', borderRadius: '13px' }}>

      <p style={{ fontSize: '24px', fontWeight: '600', color: 'white' }}>
        SCREENING SURAKSHA PACKAGE*
      </p>

      <hr style={{ color: 'white' }} />
      <p style={{ fontSize: '18px', fontWeight: '500', color: 'white' }}>
        Requirements
      </p>

      <div>
        {
          (list ?? []).map((item,index) => {
            return <Listing item={item} key={index} />
          })
        }

      </div><Card />
      <div>

      </div>
    </div>
  )
}

export default PackagesDetails


const Listing = ({ item }) => {
  return (
    <div className='d-flex gap-2'>
      <div className='pt-3'><span style={{ padding: '10px', backgroundColor: '#21cdad', borderRadius: '10px' }}> <SvgIcon setColor={'white'} /></span>
      </div>
      <div> <p className='mb-1' style={{ fontSize: '18px', color: '#21cdad', fontWeight: '400' }}>{item?.title}</p>
        <p style={{ fontSize: '13px', color: 'white', fontWeight: '400' }}>{item?.desc}</p>
      </div>
    </div>
  )
}

const Card = () => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '13px' }}>
      <div style={{ backgroundColor: '#21cdad', padding: '10px', borderTopLeftRadius: '13px', borderTopRightRadius: '13px' }}>

        <div className='d-flex justify-content-between'>
          <p><span style={{ color: 'white' }}> ₹ 890</span>  <span style={{ textDecoration: 'line-through', color: 'red' }}> ₹ 1500</span></p>

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
              <div className='col-4 pt-2'>
                <span className='p-2 ' style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                  <SvgIcon setColor='#7c7c7c' />

                </span>

              </div>
              <div className='col-8 ps-3' style={{ color: 'white', fontSize: '12px' }}>
                Free Home  collection


              </div>

            </div>
          </div>
          <div className='col-4'>
            <div className='row'>
              <div className='col-4 pt-2'>
                <span className='p-2 ' style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                  <SvgIcon setColor='#7c7c7c' />

                </span>

              </div>
              <div className='col-8 ps-3' style={{ color: 'white', fontSize: '12px' }}>
                8 tests

                included


              </div>

            </div>
          </div>

          <div className='col-4'>
            <div className='row'>
              <div className='col-4 pt-2'>
                <span className='p-2 ' style={{ backgroundColor: 'white', borderRadius: '5px' }}>
                  <SvgIcon setColor='#7c7c7c' />

                </span>

              </div>
              <div className='col-8 ps-3' style={{ color: 'white', fontSize: '12px' }}>
                Results with in
                24 Hours


              </div>

            </div>
          </div>
        </div>

      </div>

      <div className='row ps-3 pe-4 py-3'>
        <div className='col-8' style={{ color: '#7c7c7c' }}>
          <span style={{ color: '#7c7c7c', fontWeight: '700' }}>10% off</span>   New user? Enjoy 10% off up to <span style={{ color: '#7c7c7c', fontWeight: '700' }}>Rs 200</span> on all tests and health packages.
        </div>
        <div className='col-4'>
          <div className='py-2 px-3' style={{ backgroundColor:"linear-gradient(180deg, rgba(136, 209, 110, .14), rgba(35, 151, 6, .14))", border: '1px solid #7c7c7c', borderRadius: '13px' }}>
            Use Code: <span style={{ color: '#7c7c7c', fontWeight: '700' }}>NEW10</span>

          </div>
        </div>
      </div>
    </div>
  )
}
let list = [
  {
    title: 'Sample Required', desc: `EDTA  Blood,Plasma,Serum`
  },
  {
    title: 'Preperations Required', desc: 'Minimum 10-12 hours fasting is mandatory'
  }, {
    title: 'Gender', desc: 'Male & Female'
  }, {
    title: 'Age Group', desc: '0 - 99 Years'
  }, {
    title: 'Collection At', desc: 'Home & Lab'
  }
]