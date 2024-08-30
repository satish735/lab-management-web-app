"use client";
import CustomFilter from "@/components/table/CustomFilter";
import Pagination from "@/components/table/Pagination";
import PreviewFilters from "@/components/table/PreviewFilters";
import { useState } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import transformErrorDefault from "@/utils/transformErrorDefault";
import SortWithOutTable from "@/components/table/SortWithOutTable";
import ViewSlots from "@/components/slots/ViewSlots";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";

export default function Home() {
    const router = useRouter();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(10);
    const [sort, setSort] = useState({ direction: "desc", column: "createdAt" });
    const [searchValue, setSearchValue] = useState("");
    const sortAction = (c, d) => {
        // getSlotsHandler({
        //     params: {
        //         sortColumn: c,
        //         sortDirection: d,
        //         pageNo: pageNo,
        //         pageSize: pageSize,
        //         searchQuery: searchValue,
        //     },
        // });
        setSort({ column: c, direction: d });
    };
    const changePageAndRows = (page, rows) => {
        getSlotsHandler({
            params: {
                sortColumn: sort?.column,
                sortDirection: sort?.direction,
                pageNo: page,
                pageSize: rows,
                searchQuery: searchValue,
            },
        });
        setPageNo(page);
        setPageSize(rows);
    };
    const changeSearchValue = (e) => {
        getSlotsHandler({
            params: {
                sortColumn: sort?.column,
                sortDirection: sort?.direction,
                pageNo: pageNo,
                pageSize: pageSize,
                searchQuery: e,
            },
        });
        setSearchValue(e);
    };
    const [getSlotsResponse, getSlotsHandler] = useAPI(
        {
            url: "/centers/list",
            method: "get",
            sendImmediately: true,
            params: {
                sortColumn: sort?.column,
                sortDirection: sort?.direction,
                pageNo: pageNo,
                pageSize: pageSize,
                searchQuery: searchValue,
            },
        },
        (e) => {
            setTotalRows(e?.total);
            return e.data ?? []
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Getting slots!", e)
            );
            return e;
        }
    );

    const [selectedSlotList, setSelectedSlotList] = useState([])
    const [toEditSlots, setToEditSlots] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editSlotSelected, setEditSlotSelected] = useState([])
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [confirmType, setConfirmType] = useState("enable")
    return (
        <div>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Slots", link: "/admin/slots", active: true },


                ]}
            />
            <div className="admin-content-box">
                <h1 className="main-heading">Slots</h1>
                <p className="sub-heading">Listing page for slots added.</p>
                <div className="text-end my-2">
                    {
                        selectedSlotList.length > 0 && <>
                            <button
                                className=" btn btn-theme secondary-outline me-2"
                                onClick={() => {
                                    setToEditSlots(selectedSlotList)
                                    setEditModalOpen(true)
                                }}
                                type="button"
                            >
                                {" "}
                                Edit Selected
                            </button>
                            <button
                                className=" btn btn-theme secondary-outline me-2"
                                onClick={() => {
                                    setConfirmType("enable")
                                    setConfirmModalOpen(true)
                                }}
                                type="button"
                            >
                                {" "}
                                Enable Slots
                            </button>
                            <button
                                className=" btn btn-theme secondary-outline me-2"
                                onClick={() => {
                                    setConfirmType("enable")
                                    setConfirmModalOpen(true)
                                }}
                                type="button"
                            >
                                {" "}
                                Disable Slots
                            </button>

                        </>
                    }
                    <button
                        className=" btn btn-theme secondary-outline"
                        onClick={() => {
                            router.push("/admin/slots/create");
                        }}
                        type="button"
                    >
                        {" "}
                        Add Slots
                    </button>
                </div>

                <div className="d-flex justify-content-between">
                    <CustomFilter
                        hasSearch={true}
                        changeSearchValue={changeSearchValue}
                    />
                    <SortWithOutTable
                        sortAction={sortAction}
                        sort={sort}
                        options={[
                            { label: "Slot Date", value: "date" },
                            { label: "Status", value: "status" },
                            { label: "Created At", value: "createdAt" },
                            { label: "Updated At", value: "updatedAt" },
                        ]} />
                </div>
                <br />
                <ViewSlots slots={[
                    {
                        _id: "64e0c3e4c9d3e7000a0b8d1b",
                        date: "2024-08-28T00:00:00.000Z",
                        centerId: "64e0c3e4c9d3e7000a0b8d1a",
                        status: "active",
                    },
                    {
                        _id: "64e0c3e4c9d3e7000a0b8d1b",
                        date: "2024-08-27T00:00:00.000Z",
                        centerId: "64e0c3e4c9d3e7000a0b8d1a",
                        status: "disabled",
                    }, {
                        _id: "64e0c3e4c9d3e7000a0b8d1b",
                        date: "2024-08-29T00:00:00.000Z",
                        centerId: "64e0c3e4c9d3e7000a0b8d1a",
                        status: "active",
                        slotTimes: [
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d28",
                                slotStartTime: "08:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 19
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d29",
                                slotStartTime: "10:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 19
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d29",
                                slotStartTime: "12:00 PM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 50
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d29",
                                slotStartTime: "02:00 PM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 50
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d29",
                                slotStartTime: "04:00 PM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 19
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d29",
                                slotStartTime: "10:00 PM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 19
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d29",
                                slotStartTime: "12:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-25T08:00:00.000Z",
                                updatedAt: "2024-08-25T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 0
                            },
                            // More slotTimes can be added here
                        ],
                        createdAt: "2024-08-25T08:00:00.000Z",
                        updatedAt: "2024-08-25T08:00:00.000Z",
                    },
                    {
                        _id: "64e0c3e4c9d3e7000a0b8d1c",
                        date: "2024-08-30T00:00:00.000Z",
                        centerId: "64e0c3e4c9d3e7000a0b8d1a",
                        status: "active",
                        slotTimes: [
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d2a",
                                slotStartTime: "12:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-26T08:00:00.000Z",
                                updatedAt: "2024-08-26T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 19
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d2b",
                                slotStartTime: "10:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-26T08:00:00.000Z",
                                updatedAt: "2024-08-26T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 8
                            },
                            // More slotTimes can be added here
                        ],
                        createdAt: "2024-08-26T08:00:00.000Z",
                        updatedAt: "2024-08-26T08:00:00.000Z",
                    },
                    {
                        _id: "64e0c3e4c9d3e7000a0b8d1c",
                        date: "2024-09-01T00:00:00.000Z",
                        centerId: "64e0c3e4c9d3e7000a0b8d1a",
                        status: "active",
                        slotTimes: [
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d2a",
                                slotStartTime: "08:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-26T08:00:00.000Z",
                                updatedAt: "2024-08-26T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 9
                            },
                            {
                                _id: "64e0c3e4c9d3e7000a0b8d2b",
                                slotStartTime: "10:00 AM",
                                status: "active",
                                timeInterval: 60,
                                createdAt: "2024-08-26T08:00:00.000Z",
                                updatedAt: "2024-08-26T08:00:00.000Z",
                                maxUse: 50,
                                currentUse: 19
                            },
                            // More slotTimes can be added here
                        ],
                        createdAt: "2024-08-26T08:00:00.000Z",
                        updatedAt: "2024-08-26T08:00:00.000Z",
                    },]}
                    type="view"
                    selectedSlotList={selectedSlotList} setSelectedSlotList={setSelectedSlotList}
                />
                <br />
                <Pagination
                    totalRows={totalRows}
                    changePage={changePageAndRows}
                    currentRows={pageSize}
                    currentPage={pageNo}
                />
            </div>
            {editModalOpen && <Modal size="lg" isOpen={editModalOpen} toggle={() => { setEditModalOpen(false) }} className=''>
                <ModalHeader toggle={() => { setEditModalOpen(false) }} className='py-2'>
                    <h1 className="modal-main-heading">Edit Slots</h1>
                    <p className="modal-sub-heading">Make modifications in slots accordingly</p>
                </ModalHeader>
                <ModalBody className='py-2'>
                    <div className="row vertical-items-baseline">
                        <div className='col-lg-6 col-md-6 col-12'>
                            <InputMultipleSelect options={[
                                { label: "12:00 AM", value: "12:00 AM" },
                                { label: "01:00 AM", value: "01:00 AM" },
                                { label: "02:00 AM", value: "02:00 AM" },
                                { label: "03:00 AM", value: "03:00 AM" },
                                { label: "04:00 AM", value: "04:00 AM" },
                                { label: "05:00 AM", value: "05:00 AM" },
                                { label: "06:00 AM", value: "06:00 AM" },
                                { label: "07:00 AM", value: "07:00 AM" },
                                { label: "08:00 AM", value: "08:00 AM" },
                                { label: "09:00 AM", value: "09:00 AM" },
                                { label: "10:00 AM", value: "10:00 AM" },
                                { label: "11:00 AM", value: "11:00 AM" },
                                { label: "12:00 PM", value: "12:00 PM" },
                                { label: "01:00 PM", value: "01:00 PM" },
                                { label: "02:00 PM", value: "02:00 PM" },
                                { label: "03:00 PM", value: "03:00 PM" },
                                { label: "04:00 PM", value: "04:00 PM" },
                                { label: "05:00 PM", value: "05:00 PM" },
                                { label: "06:00 PM", value: "06:00 PM" },
                                { label: "07:00 PM", value: "07:00 PM" },
                                { label: "08:00 PM", value: "08:00 PM" },
                                { label: "09:00 PM", value: "09:00 PM" },
                                { label: "10:00 PM", value: "10:00 PM" },
                                { label: "11:00 PM", value: "11:00 PM" }
                            ]}
                                value={editSlotSelected}
                                setValue={setEditSlotSelected}
                                label='Select Slot to update'
                            />
                        </div>
                        <div className='col-lg-6 col-md-6 col-12'>
                            <button className="me-2 btn btn-theme secondary-outline">Remove</button>
                            <button className="me-2 btn btn-theme primary">Add</button>
                        </div>
                    </div>
                    <ViewSlots slots={toEditSlots} type="edit" setSlots={setToEditSlots} style={{ maxHeight: "60vh", overflow: "auto" }} />
                </ModalBody>
                <ModalFooter className=''>
                    <button className="me-2 btn btn-theme secondary-outline">Cancel</button>
                    <button className="me-2 btn btn-theme primary">Update</button>
                </ModalFooter>
            </Modal>}
            {confirmModalOpen && <></>}
        </div>
    );
}
