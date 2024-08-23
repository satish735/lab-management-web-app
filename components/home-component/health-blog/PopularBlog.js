import React from 'react'
import HealthBlogCardComponent from './HealthBlogCardComponent'

const PopularBlog = () => {
    return (<div className='row'>
        {
            (array ?? []).map((item,index) => {
                if(index<4){
                    return <HealthBlogCardComponent item={item} key={index} />
                }
            })
        }
    </div>
    )
}

export default PopularBlog

let array = [
    { image: '/assets/images/vision.jpg', title: 'Eye Flu - Symptoms, Causes and Treatment', reviewed_by: 'Suchi Shekhar', description: 'The monsoon season is known for giving a much-needed respite from the scorching heat of the summer days.', created_at: '2 Year' },
    { image: '/assets/images/vision.jpg', title: 'Eye Flu - Symptoms, Causes and Treatment', reviewed_by: 'Suchi Shekhar', description: 'The monsoon season is known for giving a much-needed respite from the scorching heat of the summer days.', created_at: '2 Year' },
    { image: '/assets/images/vision.jpg', title: 'Eye Flu - Symptoms, Causes and Treatment', reviewed_by: 'Suchi Shekhar', description: 'The monsoon season is known for giving a much-needed respite from the scorching heat of the summer days.', created_at: '2 Year' },
    { image: '/assets/images/vision.jpg', title: 'Eye Flu - Symptoms, Causes and Treatment', reviewed_by: 'Suchi Shekhar', description: 'The monsoon season is known for giving a much-needed respite from the scorching heat of the summer days.', created_at: '2 Year' }
]