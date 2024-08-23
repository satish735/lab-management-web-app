import React from 'react'
import '@/components/home-component/full-body-checkup/full-body-checkup.css'
import { useRouter } from "next/navigation";
const HealthBlogCardComponent = ({ item }) => {
    const router = useRouter();
    return (
        <div className='col-lg-3 col-md-6 col-sm-12 px-2'>
            <div className='health-blog-box'>

                <div onClick={()=>{
                    router.push("/blog/1")
                }} >
                    <img src={item?.image} alt="" className="" style={{ height: '150px', width: '100%', border: 'none', borderRadius: '10px' }}></img>
                </div>

                <div className='px-2 py-3'>
                    <h3 style={{
                        color: '#1e1e2f',
                        padding: ' 10px 20px 5px',
                        fontSize: '16px',
                        fontWeight: '500',
                        height: '60px'
                    }}>
                        {item?.title}

                    </h3>

                    <h4 style={{
                        color: '#000',
                        padding: '10px 20px 5px',
                        fontSize: ' 13px'
                    }}>

                        Medically Reviewed By: <span style={{ color: '#68b92e' }}>{item?.reviewed_by}</span>

                    </h4>

                    <p style={{
                        color: '#4b4b59',
                        padding: '10px 20px 5px',
                        fontSize: '14px'
                    }}>

                        {item?.description}
                    </p>

                    <div>
                        <button  className='health-blog-time-span'>{item?.created_at}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthBlogCardComponent