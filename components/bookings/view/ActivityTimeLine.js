"use client"
import React from 'react'

const ActivityTimeLine = (timelineList = []) => {
    return <ul class={`timeline`}>
        {
            timelineList.reverse().map((item) => {
                let className = "completed";
                return <li className={className} key={item?.sequence}>{item?.label}</li>;
            })
        }
    </ul >

}

export default ActivityTimeLine
