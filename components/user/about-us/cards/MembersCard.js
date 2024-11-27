import React from 'react'
import {
    medicalDegrees
} from "@/staticdata/staticdropdown";
import '../cards/card.css'


const MembersCard = ({ data }) => {
    return (
        <div className='col-lg-4 col-md-6 col-sm-12 my-3 scientific-team'>
            {/* <div className='scientific-team-hover-content  ' style={{  }}>
                <div className='scientific-team-hover-content-inner-div ' style={{ width:'100%',backgroundColor:'#003747'}}>
                    {'data?.qualificationDescription'}
                </div>

            </div> */}

            <img
                src={data?.image}
                alt=""
                className="scientific-team-image"
                style={{
                    height: "290px",
                    width: "100%",
                    border: "none",
                    borderRadius: "12px 12px 0 0 ",
                }}
            >


            </img>

            <div className='global-background-gradient' style={{ borderRadius: "0px 0px 12px 12px ", }}>
                <div className='row  '>
                    <div className='col-8   py-3' style={{ paddingLeft: '30px' }}>
                        <p style={{ marginBottom: '5px', fontSize: '18px', fontWeight: '400', color: '#fff' }}>

                            {data?.name}
                        </p>

                        <p style={{ marginBottom: '5px', fontSize: '12px', fontWeight: '200', color: '#fff' }}>
                             {/* {(medicalDegrees ?? [])?.filter((item) => item.value == data?.qualification)[0]?.label ?? data?.qualification} */}
                        </p>

                    </div>

                    <div className='col-4   py-3 pe-4'>
                        <p style={{ marginBottom: '5px', fontSize: '16px', fontWeight: '400', color: '#e1fba6', textAlign: 'end' }}>

                            {data?.post}
                        </p>

                        <p style={{ marginBottom: '5px', fontSize: '16px', fontWeight: '600', color: 'white', textAlign: 'end' }}>

                            In
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MembersCard