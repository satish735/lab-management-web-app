"use client"
import useAPI from '@/hooks/useAPI';
import transformErrorDefault from '@/utils/transformErrorDefault';
import moment from 'moment'
import React from 'react'
import toast from 'react-hot-toast';
import {
    FaRegTrashCan, FaRegEye, FaDownload
} from "react-icons/fa6";
const ReportListComponent = ({ testReports = [], successHandler = () => { }, isEdit = true }) => {

    var tempGrouped = []
    testReports.forEach(testItem => {
        const group = tempGrouped.find(g => g.id === testItem?.testId?._id);
        if (group) {
            group.items.push(testItem);
        } else {
            tempGrouped.push({ id: testItem?.testId?._id, name: testItem?.testId?.name, items: [testItem] });
        }
    })
    console.log(tempGrouped)

    return (
        <div>
            {Array.isArray(tempGrouped) && tempGrouped.filter(item => Array.isArray(item?.items) && item?.items.length > 0).map((item, index) => {
                return <div key={index + item?.id}>
                    <h5 style={{ color: "var(--color-secondary)" }}>Package/Test :- {item?.name}</h5>
                    {item.items.map((reportItem, index2) => {
                        return <ReportListComponentItem isEdit={isEdit} key={index2 + index + reportItem?._id} item={reportItem} successHandler={successHandler} />
                    })}
                </div>
            })}
        </div>
    )
}

const ReportListComponentItem = ({ item = {}, successHandler = () => { }, isEdit = true }) => {

    const [getPresignedURLResponse, getPresignedURLHandler] = useAPI(
        {
            url: "/s3/get-presigned-url",
            method: "GET",
        },
        (e) => {
            window.open(e?.url, '_blank', 'noopener,noreferrer');
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong fetching Report URL!", e)
            );
            return e;
        }
    );
    const [removeReportResponse, removeReportHandler] = useAPI(
        {
            url: `/test-reports/${item?._id}`,
            method: "delete",
        },
        (e) => {
            toast.success("Report removed successfully.")
            successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went removing report!", e)
            );
            return e;
        }
    );
    return <div className='test-report-section' style={{ position: "relative" }}>
        <div className="top-right-box text-end">
            {getPresignedURLResponse?.fetching && <span style={{ fontSize: "8px", color: "gray" }}>genrating  view link ...</span>}
            {removeReportResponse?.fetching && <span style={{ fontSize: "8px", color: "gray" }}>removing report ...</span>}

            <FaRegEye className="action-icon" onClick={async () => {
                if (getPresignedURLResponse?.fetching || removeReportResponse?.fetching) {
                    toast.error("There has an process in queue please wait a while for next process!")
                    return
                }
                await getPresignedURLHandler({
                    params: {
                        file_path: item?.reportFile,
                        type: "link-view"
                    }
                })
            }} />
            {/* <FaDownload className="action-icon" onClick={open} /> */}
           {isEdit &&  <FaRegTrashCan className="action-icon text-danger" onClick={async () => {
                if (removeReportResponse?.fetching || getPresignedURLResponse?.fetching) {
                    toast.error("There has an process in queue please wait a while for next process!")
                    return
                }
                await removeReportHandler()
            }} />}

        </div>
        <div className="general-details row m-0 py-0 mb-2">

            <div className="col-12 py-2 m-0" style={{ position: "relative" }}>
                <span className="full-name">
                    {item?.reportId}
                </span>{" "}

            </div>
            <hr className="m-0" />
            <div className="col-12 py-2 m-0 general-details-2">
                <div className="section">
                    <p className="heading">Time & Date</p>
                    <p className="values" >{moment(item?.createdAt).format("DD MMMM YYYY hh:mm A")}</p>
                </div>
                <div className="section">
                    <p className="heading">Package/Test</p>
                    <p className="values" >{item?.testId?.name}</p>
                </div>
                <div className="section">
                    <p className="heading">Genrated By Name</p>
                    <p className="values" >{item?.generatedByName}</p>
                </div>
                <div className="section">
                    <p className="heading">Genrated By Contact</p>
                    <p className="values" >{item?.generatedByContact}</p>
                </div>
            </div>
        </div>
    </div>
}
export default ReportListComponent
