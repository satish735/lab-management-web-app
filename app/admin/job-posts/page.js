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
 
export default function Home() {
    const router = useRouter();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(10);
    const [sort, setSort] = useState({ direction: "desc", column: "createdAt" });
    const [searchValue, setSearchValue] = useState("");
    const sortAction = (c, d) => {
        JobPostsHandler({
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

    ]);

    const [selectedViewOptions, setSelectedViewOptions] = useState([
        "action",
        "name", "department", "jobType"

    ]);
    const changePageAndRows = (page, rows) => {
        JobPostsHandler({
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
        JobPostsHandler({
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

    const [JobPostsResponse, JobPostsHandler] = useAPI(
        {
            url: "/jobPosts/list",
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
                "Something went wrong while Getting Job Posts!",
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
                                router.push(`/admin/job-posts/view?id=${row?._id}&type=view`);
                            }}
                        />
                        <ActionOption
                            Icon={Pencil}
                            name="Edit"
                            onClick={() => {
                                router.push(`/admin/job-posts/view?id=${row?._id}&type=edit`);
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
            key: "name",
            label: "Job Name",
            value: (row) => {
                return row?.name;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,
        {
            key: "department",
            label: "Department",
            value: (row) => {
                return row?.department;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,
        {
            key: "jobType",
            label: "Job Type",
            value: (row) => {
                return row?.jobType;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,
        {
            key: "publishedAt",
            label: "Published At",
            value: (row) => {
                return (row?.publishedAt) ? moment(row?.publishedAt).format('DD/MM/YYYY') :''
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,
        {
            key: "closedAt",
            label: "Closed At",
            value: (row) => {
                return (row?.closedAt) ? moment(row?.closedAt).format('DD/MM/YYYY') :''

             },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,

        {
            label: "Created At",
            value: (row) => {
                return moment(row?.createdAt).format("LLL");
            },
            key: "created_at",
            sortable: true,
            hasTooltip: true,
            className: "mnw-12",
        },
        {
            label: "Updated At",
            value: (row) => {
                return moment(row?.updatedAt).format("LLL");
            },
            key: "updated_at",
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
                    { label: "Job Roles", link: "/admin/job-posts", active: true },
                ]}
            />
            <div className="admin-content-box">
                <h1 className="main-heading">Job Posts</h1>
                <p className="sub-heading">Listing page for Job Posts.</p>
                <div className="text-end my-2">
                    <button
                        className=" btn btn-outline-dark"
                        onClick={() => {
                            router.push("/admin/job-posts/create");
                        }}
                        type="button"
                    >
                        {" "}
                        Add Job Posts
                    </button>
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
                    loading={JobPostsResponse?.fetching}
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
