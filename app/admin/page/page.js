"use client";

import CustomFilter from "@/components/table/CustomFilter";
import CustomTable from "@/components/table/CustomTable";
import Pagination from "@/components/table/Pagination";
import PreviewFilters from "@/components/table/PreviewFilters";
import { useState } from "react";

export default function Home() {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(100);
  const [sort, setSort] = useState({ direction: "asc", column: "id" });
  const [searchValue,setSearchValue]=useState("")
  const sortAction = (c, d) => {
    setSort({ column: c, direction: d });
  };
  const [selectedFilters, setSelectedFilterOptions] = useState([
    { key: "name", type: "$is", value: 1, label: "Anil Puri" },
    { key: "name", type: "$i", value: 1, label: "Anil Puri" },
    { key: "name", type: "$is", value: 1, label: "Anil Puri" },
    { key: "name", type: "$is", value: 1, label: "Anil Puri" },
  ]);
  const [selectedViewOptions, setSelectedViewOptions] = useState([
    "id",
    "name",
    "gender",
    "email",
    "role",
    "phone",
    "address",
    "age",
  ]);
  const changePageAndRows = (page, rows) => {
    setPageNo(page);
    setPageSize(rows);
  };
  const changeSearchValue = (e) => {
   setSearchValue(e)
  };
  const columns = [
    {
      key: "id",
      label: "Id",
      value: (row) => {
        return row?.id;
      },
      sortable: true,
      isDefault: true,
      isSelectRequired: true,
    },
    {
      key: "name",
      label: "Name",
      value: (row) => {
        return row?.name;
      },
      sortable: true,
      isDefault: true,
    },
    {
      label: "Email",
      value: (row) => {
        return row?.email;
      },
      key: "email",
      sortable: true,
      isDefault: true,
    },
    {
      label: "Role",
      value: (row) => {
        return row?.role;
      },
      key: "role",
      sortable: true,
      isDefault: true,
    },
    {
      label: "Phone",
      value: (row) => {
        return row?.phone;
      },
      key: "phone",
      sortable: true,
      isDefault: true,
    },
    {
      label: "Address",
      value: (row) => {
        return row?.address;
      },
      key: "address",
      sortable: true,
      isDefault: true,
    },
    {
      label: "Age",
      value: (row) => {
        return row?.age;
      },
      key: "age",
      sortable: true,
      isDefault: true,
    },
    {
      label: "Gender",
      value: (row) => {
        return row?.gender;
      },
      key: "gender",
      sortable: true,
      isDefault: true,
    },
  ];
  return (
    <div>
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
        data={data}
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

const data = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "admin",
    phone: "123-456-7890",
    address: "123 Main St, Springfield",
    age: 30,
    gender: "female",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "user",
    phone: "234-567-8901",
    address: "456 Elm St, Springfield",
    age: 25,
    gender: "male",
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol.williams@example.com",
    role: "user",
    phone: "345-678-9012",
    address: "789 Oak St, Springfield",
    age: 28,
    gender: "female",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "user",
    phone: "456-789-0123",
    address: "101 Pine St, Springfield",
    age: 35,
    gender: "male",
  },
  {
    id: 5,
    name: "Eva Green",
    email: "eva.green@example.com",
    role: "admin",
    phone: "567-890-1234",
    address: "202 Maple St, Springfield",
    age: 32,
    gender: "female",
  },
  {
    id: 6,
    name: "Frank White",
    email: "frank.white@example.com",
    role: "user",
    phone: "678-901-2345",
    address: "303 Cedar St, Springfield",
    age: 29,
    gender: "male",
  },
  {
    id: 7,
    name: "Grace Black",
    email: "grace.black@example.com",
    role: "user",
    phone: "789-012-3456",
    address: "404 Birch St, Springfield",
    age: 27,
    gender: "female",
  },
  {
    id: 8,
    name: "Henry Lee",
    email: "henry.lee@example.com",
    role: "user",
    phone: "890-123-4567",
    address: "505 Redwood St, Springfield",
    age: 31,
    gender: "male",
  },
  {
    id: 9,
    name: "Isla Clark",
    email: "isla.clark@example.com",
    role: "admin",
    phone: "901-234-5678",
    address: "606 Spruce St, Springfield",
    age: 26,
    gender: "female",
  },
  {
    id: 10,
    name: "Jack Harris",
    email: "jack.harris@example.com",
    role: "user",
    phone: "012-345-6789",
    address: "707 Aspen St, Springfield",
    age: 34,
    gender: "male",
  },
];
