import React from 'react'

const JobOpenings = ({ jobsType, key }) => {
  return (
    <div key={key}>
      <h5 className='mb-4 mt-5' style={{ fontWeight: '700',fontSize:'1.4rem' }}>{jobsType?.title}</h5>

      {
        (jobsType?.data ?? [])?.map?.((item, keys) => {
          return <Jobs key={keys} item={item} />
        })
      }
      <div>

      </div>
    </div>
  )
}

export default JobOpenings


const Jobs = ({ item,key }) => {

  return (
    <div key={key} className='py-3 ps-4 my-2' style={{borderRadius:'12px',border:'1px solid #aeb3b8'}}>

      <p className='' style={{fontSize:'1.1rem',fontWeight:'500',marginBottom:'5px'}}>{item?.title} {item?.date}</p>
      <p className=' mb-0' style={{fontSize:'1.07rem',fontWeight:'400',color:'#6c757d'}}>{item?.type} </p>

    </div>
  )

}

