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
    ContactDetailsHandler({
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
    "action", "status",
    "name", "email", "phone", "forOpening"

  ]);
  const changePageAndRows = (page, rows) => {
    ContactDetailsHandler({
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
    ContactDetailsHandler({
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

  const [ContactDetailsResponse, ContactDetailsHandler] = useAPI(
    {
      url: "/jobAppliesDetails/list",
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
      console.log(e)
      setlistingdata(e.data ?? []);
      setTotalRows(e?.total);
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting contact details!",
        e
      ));
      return e
    }
  );
  const [jobRoles, setjobRoles] = useState([])

  const [getJobsResponse, getJobsHandler] = useAPI(
    {
      url: "/getJobs",
      method: "get",
      sendImmediately: true,

    },
    (e) => {
      let data = (e ?? []).map((item) => { return { label: item?.name, value: item?._id } })
      setjobRoles(data ?? [])
    },
    (e) => {

      toast.error(transformErrorDefault(
        "Something went wrong while fetching jobs!",
        e
      ));
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
                router.push(`/admin/job-applies/view?id=${row?._id}&type=view`);


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
      key: "status",
      label: "Status",
      value: (row) => {
        return (
          <Badge className="text-capitalize" color={{
            'Seen': "success", 'New': "warning"
          }[row?.status]}>
            {row?.status}
          </Badge>
        );
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
      hasTooltip: true,
      className: "mnw-12",
    }
    ,
    {
      key: "name",
      label: "Name",
      value: (row) => {
        return (row?.firstName + ' ' + row?.lastName);
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    {
      key: "forOpening",
      label: "Job Name",
      value: (row) => {

        let data = (jobRoles ?? []).find((obj) => {
          return obj?.value === row?.forOpening
        });

        return data?.label
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    ,
    {
      key: "phone",
      label: "Phone",
      value: (row) => {
        return row?.phone;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    {
      key: "email",
      label: "Email",
      value: (row) => {
        return row?.email;
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
          { label: "Job Apply Details", link: "/admin/job-applies", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Jobs Apply Details</h1>
        <p className="sub-heading">Listing page for jobs apply details.</p>
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
          loading={ContactDetailsResponse?.fetching}
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
