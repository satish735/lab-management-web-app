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
import { Eye, Pencil } from "lucide-react";
import ActionOption from "@/components/ActionOption";

export default function Home() {
  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(10);
  const [sort, setSort] = useState({ direction: "desc", column: "createdAt" });
  const [searchValue, setSearchValue] = useState("");
  const sortAction = (c, d) => {
    healthbulletinHandler({
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
    "type",
  ]);
  const changePageAndRows = (page, rows) => {
    healthbulletinHandler({
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
    healthbulletinHandler({
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

  const [healthbulletinResponse, healthbulletinHandler] = useAPI(
    {
      url: "/partnerwithus/list",
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
      setlistingdata(e?.data ?? []);
      setTotalRows(e?.total);
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting health bulletin!",
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
                router.push(`/admin/partnerwithus/view?id=${row?._id}&type=view`);
              }}
            />
            <ActionOption
              Icon={Pencil}
              name="Edit"
              onClick={() => {
                router.push(`/admin/partnerwithus/view?id=${row?._id}&type=edit`);
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
      key: "type",
      label: "Type",
      value: (row) => {
        return row?.type;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
    },


  ];

  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "User", link: "/admin/create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Partner with Us Listing</h1>
        <p className="sub-heading">Listing page for Partner with Us.</p>
        <div className="text-end my-2">
          <button
            className=" btn btn-outline-dark"
            onClick={() => {
              router.push("/admin/partnerwithus/create");
            }}
            type="button"
          >
            {" "}
            Create Partner
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
          loading={healthbulletinResponse?.fetching}
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
