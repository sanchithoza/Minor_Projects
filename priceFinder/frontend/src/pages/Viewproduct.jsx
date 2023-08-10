import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";

function Viewproduct(props) {
  const navigate = useNavigate();

  let [records, setRecords] = useState("");
  let [filteredRecords, setFilteredRecords] = useState("");
  let [searchStr, setSearchStr] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Product Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Product Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Retail Price",
      selector: (row) => row.retail,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          //onClick={() => deleteProduct(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          // onClick={() => updateProduct(row._id)}
        >
          Update
        </button>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);
  let loadData = () => {
    axios.get("http://localhost:7000/getproduct").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let handleSearch = async (event) => {
    setSearchStr(event.target.value.toLowerCase().trim());
    setRecords(records);
    setFilteredRecords(records);
    let result = [];
    await filteredRecords.filter((obj) => {
      if (
        obj.name.toLowerCase().includes(searchStr) ||
        obj.company.toLowerCase().includes(searchStr) ||
        obj.category.toLowerCase().includes(searchStr)
      ) {
        result.push(obj);
      }
    });
    console.log(result);
    setRecords(result);
  };

  return (
    <div className="container">
      <div className="row" style={{ backgroundColor: "#193F3D" }}>
        <div className="col-12 p-3">
          <h1 className="text-center text-white display-5">
            Product Details And Its Price
          </h1>
        </div>
      </div>
      <div className="row p-3" style={{ backgroundColor: "#2F5250" }}>
        <div className="col-3"></div>
        <div className="col-6">
          <h6 className="display-6 text-center text-white">
            Enter Search String Here
          </h6>
          <input
            type="text"
            onKeyDown={handleSearch}
            className="form-control"
          />
        </div>
      </div>
      <div className="row" style={{ backgroundColor: "#a3b2b1" }}>
        <div className="col-12">
          <DataTable columns={columns} data={records} striped pagination />
        </div>
      </div>
    </div>
  );
}
export default Viewproduct;
