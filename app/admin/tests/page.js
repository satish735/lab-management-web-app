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
    testsHandler({
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
    "name",
    'rate',
    'testType',
    'gender', 'fromAge', 'toAge', 'reportGenerationHours','discountPercentage',"preparation","homeCollection", "sampleCollection"

  ]);
  const changePageAndRows = (page, rows) => {
    testsHandler({
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
    testsHandler({
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

  const [testsResponse, testsHandler] = useAPI(
    {
      url: "/test/lists",
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
        "Something went wrong while Getting tests!",
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
                router.push(`/admin/tests/view?id=${row?._id}&type=view`);
              }}
            />


            <ActionOption
              Icon={Pencil}
              name="Edit"
              onClick={() => {
                router.push(`/admin/tests/view?id=${row?._id}&type=edit`);
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
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "rate",
      label: "Price",
      value: (row) => {
        return row?.rate;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "testType",
      label: "Type",
      value: (row) => {
        return row?.testType;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "gender",
      label: "Gender",
      value: (row) => {
        return row?.gender;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "fromAge",
      label: "From Age",
      value: (row) => {
        return row?.fromAge;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,
    {
      key: "toAge",
      label: "To Age",
      value: (row) => {
        return row?.toAge;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "reportGenerationHours",
      label: "Report Generation Hours",
      value: (row) => {
        return row?.reportGenerationHours;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "discountPercentage",
      label: "Discount Percentage",
      value: (row) => {
        return row?.discountPercentage;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }
   

    ,

    {
      key: "preparation",
      label: "Preparations",
      value: (row) => {
        return row?.preparation;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }
    ,

    {
      key: "homeCollection",
      label: "Home Collection",
      value: (row) => {
        return row?.homeCollection ?'Yes':'No';
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: false,
      hasTooltip: true,
      className: "mnw-12",
    }

    ,

    {
      key: "sampleCollection",
      label: "Sample Collection",
      value: (row) => {
        return row?.sampleCollection;
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
          { label: "Tests", link: "/admin/tests", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Tests</h1>
        <p className="sub-heading">Listing page for tests.</p>
        <div className="text-end my-2">
          <button
            className=" btn btn-outline-dark"
            onClick={() => {
              router.push("/admin/tests/create");
            }}
            type="button"
          >
            {" "}
            Create Tests
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
          loading={testsResponse?.fetching}
          columns={columns}
          data={getlistingdata ?? [1, 2]}
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
