"use client"
import moment from 'moment';
import React from 'react'

const ActivityTimeLine = ({ timelineList = [] }) => {
    return <ul class={`timeline`}>
        {
            timelineList?.sort?.((b, a) => new Date(b?.activityDate) - new Date(a?.activityDate))?.map?.((item, index) => {
                return <li className="completed w-100" key={index}>
                    <div style={{ display: "inline-block" }} dangerouslySetInnerHTML={{ __html: item?.activityType }}>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
                    <div className='w-100 text-end'><span style={{ fontSize: "12px", color: "var(--color-primary)",fontWeight:"400" }}> {moment(item?.activityDate).calendar()}</span></div>
                </li>;
            })
        }
    </ul >

}

export default ActivityTimeLine
