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

export default function HomeCollections() {
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
        "bookingId",
        "selectedCollectionDate",
        "originalCollectionDate",
        "status",
        "collectedByName",
        "collectedByContact",
        "collectionId", "action", "updatedAt", "createdAt"
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
            url: "/home-collections",
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
                "Something went wrong while Getting HomeCollections!",
                e
            ));
            return e
        }
    );

    const columns = [
        {
            label: "Action",
            value: (row) => {
                return (
                    <>
                        <ActionOption
                            Icon={Eye}
                            name="View"
                            onClick={() => {
                                router.push(`/admin/home-collections/${row?._id}`);
                            }}
                        />
                    </>
                );
            },
            key: "action",
            isDefault: true,
            isSelectRequired: true,
            className: "mnw-12",
        },
        {
            key: "collectionId",
            label: "Home Collection Id",
            value: (row) => {
                return <Link href={`/admin/home-collections/${row?._id}`}>{row?._id}</Link>
            },
            sortable: true,
            isDefault: true,
            isSelectRequired: true,
            className: "mnw-12",
        },
        {
            key: "bookingId",
            label: "Booking ID",
            value: (row) => {
                return <>
                    {row?.bookingId?.bookingId && <Link href={`/admin/bookings/${row?.bookingId?._id}`}>{row?.bookingId?.bookingId}</Link>}
                </>

            },
            sortable: true,
            isDefault: true,
            isSelectRequired: true,
            hasTooltip: true,
            notSame: true,
            tooltip: (row) => {
                return row?.bookingId?.bookingId ?? ""

            },
            className: "mnw-12",
        },
        {
            label: "Status",
            value: (row) => {
                return (
                    <Badge className="text-capitalize" color={{
                        'pending': "secondary", 'confirmed': "success", 'cancelled': "error", "picked": "secondary"
                    }[row?.collectionStatus]}>
                        {row?.collectionStatus}
                    </Badge>
                );
            },
            key: "status",
            isDefault: true,
            className: "mnw-12",
        },
        {
            label: "selectedCollectionDate",
            value: (row) => {
                return row?.selectedCollectionDate ? <span className="text-uppercase">
                    {moment(row?.selectedCollectionDate).format("DD MMMM YYYY")} {row?.selectedCollectionTime}
                </span> : ""
            },
            key: "selectedCollectionDate",
            isDefault: true,
            className: "mnw-12",
        },
        {
            label: "Payment Method",
            value: (row) => {
                return row?.selectedCollectionDate ? <span className="text-uppercase">
                    {moment(row?.originalCollectionDate).format("DD MMMM YYYY")} {row?.originalCollectionTime}
                </span> : ""
            },
            key: "originalCollectionDate",
            isDefault: true,
            className: "mnw-12",
        },
        {
            label: "Collected By",
            value: (row) => {
                return <span className="text-uppercase">{row?.collectedByName}</span>
            },
            key: "collectedByName",

            hasTooltip: false,
            className: "mnw-12",
        },
        {
            label: "Collected By Contact",
            value: (row) => {
                return row?.collectedByContact
            },
            key: "collectedByContact",

            className: "mnw-12",
            hasTooltip: true,

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
