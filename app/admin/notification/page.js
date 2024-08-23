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
    NotificationHandler({
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
    "notificationHeader",
    "notificationDescription",

  ]);
  const changePageAndRows = (page, rows) => {
    NotificationHandler({
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
    NotificationHandler({
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

  const [NotificationResponse, NotificationHandler] = useAPI(
    {
      url: "/Notification/list",
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
        "Something went wrong while Getting Notification!",
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
                router.push(`/admin/notification/${row?.slug}`);
              }}
            />
            <ActionOption
              Icon={Pencil}
              name="Edit"
              onClick={() => {
                router.push(`/admin/notification/${row?.slug}/edit`);
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
      key: "notificationHeader",
      label: "Title",
      value: (row) => {
        return row?.notificationHeader;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
      hasTooltip: true,
      className: "mnw-12",
    },


    {
      label: "Description",
      value: (row) => {
        return row?.notificationDescription;
      },
      key: "notificationDescription",

      isDefault: true,
      className: "mnw-12",
    },


  ];

  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Notification", link: "/admin/Notification", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Notification</h1>
        <p className="sub-heading">Listing page for Notification.</p>
        <div className="text-end my-2">
          <button
            className=" btn btn-outline-dark"
            onClick={() => {
              router.push("/admin/notification/create");
            }}
            type="button"
          >
            {" "}
            Create Notification
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
          loading={NotificationResponse?.fetching}
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
