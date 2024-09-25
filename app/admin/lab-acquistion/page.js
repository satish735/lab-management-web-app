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
    getPartnersDetailsHandler({
      params: {
        sortColumn: c,
        sortDirection: d,
        pageNo: pageNo,
        pageSize: pageSize,
        searchQuery: searchValue,
        type: 'lab_acquistion'
      },
    });
    setSort({ column: c, direction: d });
  };
  const [selectedFilters, setSelectedFilterOptions] = useState([

  ]);
  const [selectedViewOptions, setSelectedViewOptions] = useState([
    "action", "status",
    "name","labName", "emailAddress", "number"

  ]);
  const changePageAndRows = (page, rows) => {
    getPartnersDetailsHandler({
      params: {
        sortColumn: sort?.column,
        sortDirection: sort?.direction,
        pageNo: page,
        pageSize: rows,
        searchQuery: searchValue,
        type: 'lab_acquistion'
      },
    });
    setPageNo(page);
    setPageSize(rows);
  };
  const changeSearchValue = (e) => {
    getPartnersDetailsHandler({
      params: {
        sortColumn: sort?.column,
        sortDirection: sort?.direction,
        pageNo: pageNo,
        pageSize: pageSize,
        searchQuery: e,
        type: 'lab_acquistion'
      },
    });
    setSearchValue(e);
  };

  const [getlistingdata, setlistingdata] = useState([]);
 
  const [getPartnersDetailsResponse, getPartnersDetailsHandler] = useAPI(
    {
      url: "/getPartnersDetails/list",
      method: "get",
      sendImmediately: true,
      params: {
        sortColumn: sort?.column,
        sortDirection: sort?.direction,
        pageNo: pageNo,
        pageSize: pageSize,
        searchQuery: searchValue,
        type: 'lab_acquistion'
      },
    },
    (e) => {
      setlistingdata(e.data ?? []);
      setTotalRows(e?.total);
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting details!",
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
                router.push(`/admin/lab-acquistion/view?id=${row?._id}&type=view`);


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
      key: "Current Lab Name",
      label: "labName",
      value: (row) => {
        return row?.emailAddress;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    {
      key: "emailAddress",
      label: "Email",
      value: (row) => {
        return row?.emailAddress;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    
    ,
    {
      key: "number",
      label: "Phone Number",
      value: (row) => {
        return row?.number;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }


    ,
    {
      key: "age",
      label: "Age",
      value: (row) => {
        return row?.age;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    {
      key: "city",
      label: "City",
      value: (row) => {
        return row?.city;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    {
      key: "state",
      label: "State",
      value: (row) => {
        return row?.state;
      },
      sortable: true,
       isDefault: true,
      isSelectRequired: false,
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
          { label: "Lab Acquistion", link: "/admin/lab-acquistion", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Lab Acquistion Details</h1>
        <p className="sub-heading">Listing page for lab acquistion details.</p>
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
          loading={getPartnersDetailsResponse?.fetching}
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
