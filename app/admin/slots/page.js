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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import InputMultipleSelect from "@/components/formInput/select/InputMultipleSelect";

export default function Home() {
    const centerId = "66d0bfdc53c49c313401480e"

    const router = useRouter();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalRows, setTotalRows] = useState(20);
    const [sort, setSort] = useState({ direction: "desc", column: "createdAt" });
    const [searchValue, setSearchValue] = useState("");
    const sortAction = (c, d) => {
        getSlotsHandler({
            params: {
                sortColumn: c,
                sortDirection: d,
                pageNo: pageNo,
                pageSize: pageSize,
                searchQuery: searchValue,
                centerId: centerId
            },
        });
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
                centerId: centerId
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
                centerId: centerId
            },
        });
        setSearchValue(e);
    };
    const [getSlotsResponse, getSlotsHandler] = useAPI(
        {
            url: "/slots",
            method: "get",
            sendImmediately: true,
            params: {
                sortColumn: sort?.column,
                sortDirection: sort?.direction,
                pageNo: pageNo,
                pageSize: pageSize,
                searchQuery: searchValue,
                centerId: centerId
            },
        },
        (e) => {
            setTotalRows(e?.total);
            return e.data ?? []
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Fetching slots!", e)
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



    const [enableDisableSlotsResponse, enableDisableSlotsHandler] = useAPI(
        {
            url: "/slots/enable-disable",
            method: "post",
        },
        (e) => {
            toast.success("Slots updated Successfully.")
            setConfirmType("enable")
            getSlotsHandler()
        },
        (e) => {
            toast.error(
                transformErrorDefault("Something went wrong while Updating slots!", e)
            );
            return e;
        }
    );
    const enableDisableConfirmHandler = async () => {
        var submitBody = {
            slots: selectedSlotList.map(({ _id, rest }) => { return { _id } }),
            status: confirmType == "enable" ? "active" : "disabled"
        };
        await enableDisableSlotsHandler({ body: submitBody })
        setConfirmModalOpen(false)
    }
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
                                style={{ minWidth: "120px" }}
                            >
                                {enableDisableSlotsResponse?.fetching && confirmType == "enable" ? <Spinner size={"sm"} /> :
                                    "Enable Slots"}
                            </button>
                            <button
                                className=" btn btn-theme secondary-outline me-2"
                                onClick={() => {
                                    setConfirmType("disable")
                                    setConfirmModalOpen(true)
                                }}
                                style={{ minWidth: "120px" }}
                                type="button"
                            >
                                {enableDisableSlotsResponse?.fetching && confirmType == "disabled" ? <Spinner size={"sm"} /> :
                                    "Disable Slots"}
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
                <ViewSlots slots={getSlotsResponse?.data ?? []}
                    loading={getSlotsResponse?.fetching}
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
                        <div className='col-lg-6 col-md-6 col-12  vertical-align-end'>
                            <label
                                className={'w-100 '}
                                style={{ fontSize: "12px" }}                            >
                                {"  "}
                            </label>
                            {(editSlotSelected ?? []).length > 0 && <div> <button className="me-2 btn btn-theme secondary-outline">Remove</button>
                                <button className="me-2 btn btn-theme primary ">Add</button></div>}
                        </div>
                    </div>
                    <ViewSlots slots={toEditSlots} type="edit" setSlots={setToEditSlots} style={{ maxHeight: "60vh", overflow: "auto" }} />
                </ModalBody>
                <ModalFooter className=''>
                    <button className="me-2 btn btn-theme secondary-outline" onClick={() => { setEditModalOpen(false) }}>Cancel</button>
                    <button className="me-2 btn btn-theme primary">Update</button>
                </ModalFooter>
            </Modal>}
            {confirmModalOpen && <Modal size="md" isOpen={confirmModalOpen} toggle={() => { setConfirmModalOpen(false) }} className=''>
                <ModalHeader toggle={() => { setConfirmModalOpen(false) }} className='py-2'>
                    <h1 className="modal-main-heading">Edit Slots</h1>
                    <p className="modal-sub-heading">{confirmType == "enable" ? "Enable" : "Disable"} all selected slots</p>
                </ModalHeader>
                <ModalBody className='py-2'>
                    <p>Are you sure you want to {confirmType == "enable" ? "Enable" : "Disable"} all selected Slots!!!</p>
                </ModalBody>
                <ModalFooter className=''>
                    <button className="me-2 btn btn-theme secondary-outline" onClick={() => { setConfirmModalOpen(false) }}>Cancel</button>
                    <button className="me-2 btn btn-theme primary" onClick={enableDisableConfirmHandler}>Confirm</button>
                </ModalFooter>
            </Modal>}
        </div>
    );
}
