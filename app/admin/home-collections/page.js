"use client";

import CustomFilter from "@/components/table/CustomFilter";
import CustomTable from "@/components/table/CustomTable";
import Pagination from "@/components/table/Pagination";
import PreviewFilters from "@/components/table/PreviewFilters";
import { useState, useEffect } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import transformErrorDefault from "@/utils/transformErrorDefault";
import { Badge } from "reactstrap";
import { Eye, Pencil } from "lucide-react";
import moment from "moment";
import ActionOption from "@/components/ActionOption";
import Link from "next/link";

export default function Transations() {
    const router = useRouter();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(10);
    const [sort, setSort] = useState({ direction: "desc", column: "createdAt" });
    const [searchValue, setSearchValue] = useState("");
    const sortAction = (c, d) => {
        bookingsHandler({
            params: {
                sortColumn: c,
                sortDirection: d,
                pageNo: pageNo,
                pageSize: pageSize,
                searchQuery: searchValue,

            },
        });
        setSort({ column: c, direction: d });
    };
    const [selectedFilters, setSelectedFilterOptions] = useState([
        // { key: "name", type: "$is", value: 1, label: "Anil Puri" },
        // { key: "name", type: "$i", value: 1, label: "Anil Puri" },
        // { key: "name", type: "$is", value: 1, label: "Anil Puri" },
        // { key: "name", type: "$is", value: 1, label: "Anil Puri" },
    ]);
    const [selectedViewOptions, setSelectedViewOptions] = useState([
        "transactionId",
        "amount",
        "currency",
        "transactionType",
        "status",
        "paymentMethod",
        "transactionDate",
        "referenceTransactionId",
        "bookingId"
    ]);
    const changePageAndRows = (page, rows) => {
        bookingsHandler({
            params: {
                sortColumn: sort?.column,
                sortDirection: sort?.direction,
                pageNo: page,
                pageSize: rows,
                searchQuery: searchValue
            },
        });
        setPageNo(page);
        setPageSize(rows);
    };
    const changeSearchValue = (e) => {
        bookingsHandler({
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

    const [getlistingdata, setlistingdata] = useState([]);

    const [bookingsResponse, bookingsHandler] = useAPI(
        {
            url: "/transactions",
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
            setlistingdata(e.data ?? []);
            setTotalRows(e?.total);
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting Transactions!",
                e
            ));
            return e
        }
    );

    const columns = [
        // {
        //     label: "Action",
        //     value: (row) => {
        //         return (
        //             <>
        //                 <ActionOption
        //                     Icon={Eye}
        //                     name="View"
        //                     onClick={() => {
        //                         router.push(`/admin/bookings/${row?.bookingId}`);
        //                     }}
        //                 />
        //                 <ActionOption
        //                     Icon={Pencil}
        //                     name="Edit"
        //                     onClick={() => {
        //                         router.push(`/admin/bookings/${row?.bookingId}/edit`);
        //                     }}
        //                 />
        //             </>
        //         );
        //     },
        //     key: "action",
        //     isDefault: true,
        //     isSelectRequired: true,
        //     className: "mnw-12",
        // },
        {
            key: "transactionId",
            label: "Transaction Number",
            value: (row) => {
                return row?.transactionId

            },
            sortable: true,
            isDefault: true,
            isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        },
        {
            key: "bookingId",
            label: "Bookings",
            value: (row) => {
                return <>
                    {Array.isArray(row?.bookingId) && row?.bookingId.map((bookingItem, index) => <Link key={index} href={`/admin/bookings/${bookingItem?.bookingId}`}>{bookingItem?.bookingId}</Link>)}
                </>

            },
            sortable: true,
            isDefault: true,
            isSelectRequired: true,
            hasTooltip: true,
            notSame: true,
            tooltip: (row) => {
                return Array.isArray(row?.bookingId) ? row?.bookingId.map((bookingItem) => bookingItem?.bookingId).join(", ") : ""

            },
            className: "mnw-12",
        },

        {
            label: "Status",
            value: (row) => {
                return (
                    <Badge className="text-capitalize" color={{
                        'pending': "secondary", 'completed': "success", 'failed': "error"
                    }[row?.status]}>
                        {row?.status}
                    </Badge>
                );
            },
            key: "status",
            isDefault: true,
            className: "mnw-12",
        },
        {
            label: "TransactionType",
            value: (row) => {
                return <span className="text-uppercase">
                    {row?.transactionType}
                </span>
            },
            key: "transaction Type",
            isDefault: true,

            className: "mnw-12",
        },
        {
            label: "Payment Method",
            value: (row) => {
                return <span className="text-uppercase">
                    {row?.paymentMethod}
                </span>
            },
            key: "paymentMethod",
            isDefault: true,

            className: "mnw-12",
        },
        {
            label: "Amount",
            value: (row) => {
                return "Rs " + row?.amount

            },
            key: "amount",
            isDefault: true,
            hasTooltip: true,
            className: "mnw-12",
        },
        {
            label: "Reference Transaction Id",
            value: (row) => {

                return row?.referenceTransactionId
            },
            key: "referenceTransactionId",
            isDefault: true,
            className: "mnw-12",

            hasTooltip: true,

        },
        {
            label: "Description",
            value: (row) => {

                return row?.description

            },
            hasTooltip: true,
            key: "description",
            isDefault: true,
            className: "mnw-12",
        },
        {
            label: "Transaction Date",
            value: (row) => {
                return moment(row?.transactionDate).format("LLL");
            },
            key: "transactionDate",
            sortable: true,
            hasTooltip: true,
            className: "mnw-12",
        },
        {
            label: "Created At",
            value: (row) => {
                return moment(row?.createdAt).format("LLL");
            },
            key: "createdAt",
            sortable: true,
            hasTooltip: true,
            className: "mnw-12",
        },
        {
            label: "Updated At",
            value: (row) => {
                return moment(row?.updatedAt).format("LLL");
            },
            key: "updatedAt",
            sortable: true,
            hasTooltip: true,
            className: "mnw-12",
        },
    ];

    return (
        <div>
            <BreadcrumbDiv
                options={[
                    { label: "Home", link: "/admin" },
                    { label: "Home Collections", link: "/admin/home-collections", active: true },
                ]}
            />
            <div className="admin-content-box">
                <h1 className="main-heading">Home Collections</h1>
                <p className="sub-heading">Listing page for Home Collections.</p>
                <div className="text-end my-2">

                </div>

                <CustomFilter
                    hasSearch={true}
                    changeSearchValue={changeSearchValue}
                    viewColumnOptions={columns}
                    viewColumnOptionsSelected={selectedViewOptions}
                    changeViewColumnOptions={setSelectedViewOptions}
                />
                <PreviewFilters
                    selected={selectedFilters}
                    remove={setSelectedFilterOptions}
                />

                <br />
                <CustomTable
                    loading={bookingsResponse?.fetching}
                    columns={columns}
                    data={getlistingdata ?? []}
                    sort={sort}
                    sortAction={sortAction}
                    selectedColumns={selectedViewOptions}
                    searchTerm={searchValue}
                />
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
