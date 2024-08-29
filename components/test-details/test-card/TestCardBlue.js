import React from 'react'
import SvgIcon from '../../home-component/SvgIcon'
import '../../../styles/common-card-designs/card_designs.css'
import '../total-test-include/totalTestInclude.css'
const TestCardBlue = ({ listing,lg=6,md=6 }) => {
    return (
        <div className={`card-outer-layer-div  col-lg-${lg} col-md-${md} col-sm-12`}  >
            <div className='main-card-border   ' style={{ borderRadius: '13px', boxShadow: '0px 5px 83px 0px rgba(13, 14, 67, 0.09)' ,background:'linear-gradient(180deg, rgb(1 7 63) , #004e92)'}}>
                <div className='background-hover' style={{borderRadius: '13px'}}  >

                    <div className='w-100  ' style={{ width: '100%' }}>


                        <div style={{ height: '10px' }}>

                        </div>
                        <div className='card-description' style={{ borderRadius: '0px 0px 13px 13px' }}>

                            <div className='row'>
                                <div className='col-7'>
                                    <p className='card-heading-test' style={{color:'white'}}>{listing?.test_name}*

                                    </p>
                                </div>
                                <div className='col-5 text-end ' style={{}}>
                                    <span style={{ textDecoration: 'line-through', color: 'gray', fontWeight: '500' }}> ₹ {listing?.test_price}</span>

                                    <span style={{ color: '#e1fba6', fontWeight: '500' }}> ₹ {listing?.test_price}</span>
                                </div>
                                <div className='col-12 text-end'>
                                    <span className='px-3 py-2' style={{ border: '1px solid #ffffff36', borderRadius: '10px', color: 'white', fontWeight: '400', background: '#ffffff36' }}> 3% off</span>

                                </div>
                            </div>

                            <hr />

                            <div className='row my-2' style={{  color: '#e1fba6'}}>

                                <div className='col-6'>
                                    <div className='row'>


                                        <p className='col-3 pt-1'>
                                            <span className='  p-2' style={{ borderRadius: '5px', backgroundColor: '#ffffff36' }}>
                                                <SvgIcon setColor={'white'} />

                                            </span>
                                        </p>
                                        <p className='col-9 ps-3 ' style={{ fontSize: '12px' }}>{listing?.no_of_observation} Observation included

                                        </p>
                                    </div>

                                </div>

                                <div className='col-6'>
                                    <div className='row'>
                                        <p className='col-3 pt-1'>
                                            <span className='  p-2' style={{ borderRadius: '5px', backgroundColor: '#ffffff36' }}>
                                                <SvgIcon setColor={'white'} />

                                            </span>
                                        </p>
                                        <p className='col-9 ps-3 ' style={{ fontSize: '12px' }}>{listing?.no_of_observation}Result with in {listing?.no_of_hours}  hours

                                        </p>


                                    </div>

                                </div>
                            </div>

                            <hr />


                            <div className='row'>
                                <div className='col-6'>
                                    <button className='card-button-package-card ' style={{ fontSize: '13px',backgroundColor:'#ffffff36',color:'white' ,border:'1px solid transparent'}}>
                                        View Details <span>→</span>
                                    </button>
                                </div>
                                <div className='col-6 text-end'>
                                    <button className='card-button ' style={{ fontSize: '13px',border:'1px solid transparent' }}>
                                        Add to Cart <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    )
}

export default TestCardBlue