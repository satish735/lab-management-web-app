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
        MemberShipHandler({
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
        "name",
        'validity', 'price', 'discount', 'termsAndConditions', 'description', 'type'

    ]);
    const changePageAndRows = (page, rows) => {
        MemberShipHandler({
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
        MemberShipHandler({
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

    const [MemberShipResponse, MemberShipHandler] = useAPI(
        {
            url: "/membership/lists",
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
                "Something went wrong while Getting memberships!",
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
                                router.push(`/admin/membership/view?id=${row?._id}&type=view`);
                            }}
                        />
                        <ActionOption
                            Icon={Pencil}
                            name="Edit"
                            onClick={() => {
                                router.push(`/admin/membership/view?id=${row?._id}&type=edit`);
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
            label: "Name",
            value: (row) => {
                return row?.name;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        },
        {
            key: "validity",
            label: "Validity",
            value: (row) => {
                return row?.validity;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }

        ,
        {
            key: "price",
            label: "Price",
            value: (row) => {
                return row?.price;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }

        ,
        {
            key: "discount",
            label: "Discount",
            value: (row) => {
                return row?.discount;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }

        ,
        {
            key: "discountOnPackagePercentage",
            label: "Discount On Package %",
            value: (row) => {
                return row?.discountOnPackagePercentage;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }

        ,
        {
            key: "termsAndConditions",
            label: "Terms And Conditions",
            value: (row) => {
                return row?.termsAndConditions;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }

        ,
        {
            key: "description",
            label: "Description",
            value: (row) => {
                return row?.description;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,
        {
            key: "type",
            label: "Type",
            value: (row) => {
                return row?.type;
            },
            sortable: true,
            isDefault: true,
            // isSelectRequired: true,
            hasTooltip: true,
            className: "mnw-12",
        }
        ,
        {
            key: "is_delete",
            label: "Is Delete",
            value: (row) => {
                return row?.is_delete;
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
                    { label: "Memberships", link: "/admin/memberships", active: true },
                ]}
            />
            <div className="admin-content-box">
                <h1 className="main-heading">MemberShips</h1>
                <p className="sub-heading">Listing page for memberships.</p>
                <div className="text-end my-2">
                    <button
                        className=" btn btn-outline-dark"
                        onClick={() => {
                            router.push("/admin/membership/create");
                        }}
                        type="button"
                    >
                        {" "}
                        Create Membership
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
                    loading={MemberShipResponse?.fetching}
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
