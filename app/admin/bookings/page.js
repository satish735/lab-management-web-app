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

export default function Home() {
  const centerId = "66d2f3a4ec819eaf2ac4bcfc"
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
        centerId
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
    "status",
    "paymentType",
    "paymentStatus",
    "collectionType",
    "slotId",
    "total",
    "action"
  ]);
  const changePageAndRows = (page, rows) => {
    bookingsHandler({
      params: {
        sortColumn: sort?.column,
        sortDirection: sort?.direction,
        pageNo: page,
        pageSize: rows,
        searchQuery: searchValue, centerId
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
        searchQuery: e, centerId
      },
    });
    setSearchValue(e);
  };

  const [getlistingdata, setlistingdata] = useState([]);

  const [bookingsResponse, bookingsHandler] = useAPI(
    {
      url: "/bookings",
      method: "get",
      sendImmediately: true,
      params: {
        sortColumn: sort?.column,
        sortDirection: sort?.direction,
        pageNo: pageNo,
        pageSize: pageSize,
        searchQuery: searchValue, centerId
      },
    },
    (e) => {
      setlistingdata(e.data ?? []);
      setTotalRows(e?.total);
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting Bookings!",
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
                router.push(`/admin/bookings/${row?.bookingId}`);
              }}
            />
            <ActionOption
              Icon={Pencil}
              name="Edit"
              onClick={() => {
                router.push(`/admin/bookings/${row?.bookingId}/edit`);
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
      key: "bookingId",
      label: "Booking Number",
      value: (row) => {
        return <Link href={`/admin/bookings/${row?.bookingId}`}>{row?.bookingId}</Link>

      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
      hasTooltip: true,
      notSame: true,
      tooltip: (row) => {
        return row?.bookingId

      },
      className: "mnw-12",
    },

    {
      label: "Status",
      value: (row) => {
        return (
          <Badge className="text-capitalize" color={{
            'upcoming': "primary", 'completed': "success", 'cancelled': "danger", 'rescheduled': "warning", 'no-show': "secondary", "created": "secondary"
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
      label: "Payment Type",
      value: (row) => {
        return <Badge className="text-capitalize" color={"secondary"}>
          {{
            'online': "Digital", 'cash': "Cash"
          }[row?.paymentType]}
        </Badge>
      },
      key: "paymentType",
      isDefault: true,
      className: "mnw-12",
    },
    {
      label: "Payment Status",
      value: (row) => {
        return <Badge className="text-capitalize" color={{
          'pending': "primary", 'completed': "success", 'failed': "danger", 'refunded': "warning"
        }[row?.paymentStatus]}>
          {row?.paymentStatus}
        </Badge>
      },
      key: "paymentStatus",
      isDefault: true,
      className: "mnw-12",
    },
    {
      label: "Collection Type",
      value: (row) => {
        return <Badge className="text-capitalize" color={{
          'lab': "primary", 'home': "info"
        }[row?.collectionType]}>
          {row?.collectionType}
        </Badge>
      },
      key: "collectionType",
      isDefault: true,
      className: "mnw-12",
    },
    {
      label: "Slot",
      value: (row) => {
        console.log(row?.slotId)
        return (row?.slotId?.slotDate?.date || "") + " " + (row?.slotId?.slotStartTime || "")
      },
      key: "slotId",
      isDefault: true,
      className: "mnw-12",
    },
    {
      label: "Patient",
      value: (row) => {

        return (row?.teamMemberId?.name || "")
      },
      key: "teamMemberId",
      isDefault: true,
      className: "mnw-12",
    },
    {
      label: "Total Amount",
      value: (row) => {
        console.log(row)
        return "Rs " + (row?.total || "")

      },
      key: "total",
      isDefault: true,
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
          { label: "Bookings", link: "/admin/bookings", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Bookings</h1>
        <p className="sub-heading">Listing page for bookings.</p>
        <div className="text-end my-2">
          {/* <button
            className=" btn btn-outline-dark"
            onClick={() => {
              router.push("/admin/bookings/create");
            }}
            type="button"
          >
            {" "}
            Create Booking
          </button> */}
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
