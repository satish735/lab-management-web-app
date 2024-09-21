"use client"
import MultipleDropZone from '@/components/drop-zones/MultipleDropZone'
import InputTextArea from '@/components/formInput/InputTextArea'
import InputSelect from '@/components/formInput/select/InputSelect'
import useAPI from '@/hooks/useAPI'
import transformErrorDefault from '@/utils/transformErrorDefault'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

const AddReportsModal = ({ isOpen = false, setIsOpen = () => { }, successHandler = () => { }, bookingDetails = null }) => {
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [testPackageList, setTestPackageList] = useState([])
    const [addReportsResponse, addReportsAPIHandler] = useAPI(
        {
            url: `/test-reports`,
            method: "post",
            isAsync: true
        },
        async (e) => {
            toast.success(e?.message ?? "Test/Package Reports Added successfully.");
            await successHandler()
            return e ?? null;
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Adding Test/Package Reports!", e)
            );
            return e;
        }
    );
    const addReportsHandler = async () => {
        if (!bookingDetails?.id) {
            toast.error("Booking details not found while Adding Test/Package Reports!")
            return
        }
        var newReportList = []
        testPackageList.forEach(item => {
            if (Array.isArray(item?.files) && item?.id && item?.files.length > 0) {
                item?.files.filter(fileItem => fileItem?.uploadStatus == "uploaded").forEach(fileItem => {
                    newReportList.push({
                        reportFile: fileItem?.filePath,
                        testId: item?.id
                    })
                })
            }
        })
        console.log(newReportList)
        if (!Array.isArray(newReportList) || !(newReportList.length > 0)) {
            toast.error("There are no reports to be added in list please check it again!")
            return
        }
        await addReportsAPIHandler({
            body: {
                booking_id: bookingDetails?.id,
                new_report_list: newReportList
            }
        })
    }
    useEffect(() => {
        if (bookingDetails) {
            setTestPackageList(bookingDetails?.packages?.map?.(item => {
                return { id: item?._id, name: item?.name, type: item?.testType }
            }) ?? [])
        }
    }, [bookingDetails])
    return (
        <Modal size="lg" isOpen={isOpen} toggle={toggle} className=''>
            <ModalHeader toggle={toggle} className='py-2'>
                <h1 className="modal-main-heading">Add Reports</h1>
                <p className="modal-sub-heading">Add reports for Test & Packages.</p>
            </ModalHeader>
            <ModalBody className='py-2'>
                <div style={{ maxHeight: "65vh", overflow: "auto" }}>
                    {Array.isArray(testPackageList) && testPackageList.map((item, index) => {
                        return <AddReportItem itemNo={index + 1} packageItem={item} key={index + item?.id} updatePackageList={setTestPackageList} />
                    })}
                </div>
            </ModalBody>
            <ModalFooter className=''>
                <button className="me-2 btn btn-theme secondary-outline" onClick={toggle} disabled={addReportsResponse?.fetching} >Cancel</button>
                <button className="me-2 btn btn-theme primary" style={{ minWidth: "120px" }} disabled={addReportsResponse?.fetching} onClick={addReportsHandler}>{addReportsResponse?.fetching ? (
                    <Spinner size={"sm"} />
                ) : (
                    "Add Reports"
                )}</button>
            </ModalFooter>
        </Modal>
    )
}

const AddReportItem = ({ itemNo, packageItem = {}, updatePackageList = () => { } }) => {
    const updateFilesHandler = (newFiles) => {
        updatePackageList(prev => prev.map((item) => {
            if (item?.id == packageItem?.id) {
                return { ...item, files: newFiles }
            }
            return item
        }))
    }
    const [files, setFiles] = useState([])
    console.log(packageItem, files)
    useEffect(() => {
        updateFilesHandler(files)
    }, [files])
    return <div className='w-100 mb-2'>
        <h6 style={{ color: "var(--color-secondary)" }}>{itemNo}). {packageItem?.name}<span className='text-capitalization' style={{ fontSize: "12px", color: "var(--color-primary)" }}>{packageItem?.type}</span></h6>
        <div>
            {/* <MultipleDropZone dropZoneMessage={'Report files here'} files={Array.isArray(packageItem?.files) ? packageItem?.files : []} setFiles={updateFilesHandler} /> */}
            <MultipleDropZone dropZoneMessage={'Report files here'} files={files} setFiles={setFiles} sizeLimit={5} sizeLimitMessage={"max file size 5Mb"} fileNoAllowed={5} typeAllowed={{
                'application/pdf': ['.pdf'],
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            }} typeAllowedMessage={"Only Docs and Pdf files allowed"} filePathSuffix={`testReports/${packageItem?.id}/`} />
        </div>
    </div>
}
export default AddReportsModal
