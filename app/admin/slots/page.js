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
                <ViewSlots />
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
