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
                    <button
                        className=" btn btn-outline-dark"
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
                    },]} />
                <br />
                <Pagination
                    totalRows={totalRows}
                    changePage={changePageAndRows}
                    currentRows={pageSize}
                    currentPage={pageNo}
                />
            </div>
        </div>
    );
}
