"use client";

import CustomFilter from "@/components/table/CustomFilter";
import CustomTable from "@/components/table/CustomTable";
import Pagination from "@/components/table/Pagination";
import PreviewFilters from "@/components/table/PreviewFilters";
import { useState, useEffect } from "react";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";
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
    coupenHandler({
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
    "action",
    "name"
    
  ]);
  const changePageAndRows = (page, rows) => {
    // coupenHandler({
    //   params: {
    //     sortColumn: sort?.column,
    //     sortDirection: sort?.direction,
    //     pageNo: page,
    //     pageSize: rows,
    //     searchQuery: searchValue,
    //   },
    // });
    setPageNo(page);
    setPageSize(rows);
  };
  const changeSearchValue = (e) => {
    coupenHandler({
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

  const [coupenResponse, coupenHandler] = useAPI(
    {
      url: "/coupen/list",
      method: "get",
      // sendImmediately: true,
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
      toast.error( transformErrorDefault(
        "Something went wrong while Getting coupens!",
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
                router.push(`/admin/coupen/view?id=${row?._id}&type=view`);
                 

              }}
            />
            <ActionOption
              Icon={Pencil}
              name="Edit"
              onClick={() => {
                router.push(`/admin/coupen/view?id=${row?._id}&type=edit`);
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
      isSelectRequired: true,
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
          { label: "Coupen", link: "/admin/coupen", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Discount Coupen</h1>
        <p className="sub-heading">Listing page for coupen.</p>
        <div className="text-end my-2">
          <button
            className=" btn btn-outline-dark"
            onClick={() => {
              router.push("/admin/coupens/create");
            }}
            type="button"
          >
            {" "}
            Create Coupen
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
          loading={coupenResponse?.fetching}
          columns={columns}
          data={getlistingdata ?? [1,2]}
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
