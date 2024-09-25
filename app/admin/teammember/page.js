"use client";

import CustomFilter from "@/components/table/CustomFilter";
import CustomTable from "@/components/table/CustomTable";
import Pagination from "@/components/table/Pagination";
import PreviewFilters from "@/components/table/PreviewFilters";
import { useState, useEffect } from "react";
import useAPI from "@/hooks/useAPI";
import InputTextArea from "@/components/formInput/InputTextArea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, Pencil } from "lucide-react";
import ActionOption from "@/components/ActionOption";
import transformErrorDefault from "@/utils/transformErrorDefault";


export default function Home() {

  const [selectedViewOptions, setSelectedViewOptions] = useState([
    "action",
    "name",
    "gender",
    "email",
    "phone",
    "qualification",


  ]);





  const router = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(10);
  const [sort, setSort] = useState({ direction: "desc", column: "createdAt" });
  const [searchValue, setSearchValue] = useState("");
  const sortAction = (c, d) => {
    teammemberHandler({
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

  const changePageAndRows = (page, rows) => {
    teammemberHandler({
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
    teammemberHandler({
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

  const [teammemberResponse, teammemberHandler] = useAPI(
    {
      url: "/teammember/list",
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
        "Something went wrong while Getting team member!",
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
                router.push(`/admin/teammember/view?id=${row?._id}&type=view`);
              }}
            />
            <ActionOption
              Icon={Pencil}
              name="Edit"
              onClick={() => {
                router.push(`/admin/teammember/view?id=${row?._id}&type=edit`);
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
      label: "Name",

      value: (row) => {
        return row?.name;
      },
      key: "name",
      sortable: false,
      isDefault: true,
      isSelectRequired: true,
    },

    {
      label: "Gender",
      value: (row) => {
        return row?.gender;
      },
      key: "gender",
      sortable: false,
      isDefault: true,
    },

    {
      label: "Email",
      value: (row) => {
        return row?.email;
      },
      key: "email",
      sortable: false,
      isDefault: true,
    },
    {
      label: "Phone",
      value: (row) => {
        return row?.phone;
      },
      key: "phone",
      sortable: false,
      isDefault: false,
    },
    {
      label: "Type",
      value: (row) => {
        return row?.type;
      },
      key: "type",
      sortable: false,
      isDefault: false,
    },
    {
      label: "Post",
      value: (row) => {
        return row?.post;
      },
      key: "post",
      sortable: false,
      isDefault: false,
    },

    {
      label: "Qualification",
      value: (row) => {
        return row?.qualification;
      },
      key: "qualification",
      sortable: false,
      isDefault: false,
    },
    {
      label: "Qualification Description",
      value: (row) => {
        return row?.qualificationDescription;
      },
      key: "qualificationDescription",
      sortable: false,
      isDefault: false,
    },
    {
      label: "Experience",
      value: (row) => {
        return row?.experience;
      },
      key: "experience",
      sortable: false,
      isDefault: false,
    },
  ];




  return (
    <div className="bg-white p-3" >
      <div className="text-end my-2">
        <button
          className=" btn btn-outline-dark"
          onClick={() => {
            router.push("/admin/teammember/create");
          }}
          type="button"
        >
          {" "}
          Add Team Member{" "}
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
  );
}
