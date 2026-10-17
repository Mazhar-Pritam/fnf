import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Suppliers() {
  const [suppliers, setSuppliers] = React.useState([]);

  async function fetchSuppliers() {
    let res = await axios.get('supplier/index.php');
    setSuppliers(res.data.data);
  }

  React.useEffect(() => {
    fetchSuppliers();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      let res = await axios.delete(`supplier/delete.php?id=${id}`);
      if (res.data.status) {
        fetchSuppliers();
      } else {
        alert(res.data.message);
      }
    }
  }


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Suppliers</h3>

            <ul className="breadcrumbs mb-3">
              <li className="nav-home">
                <a href="#">
                  <i className="icon-home"></i>
                </a>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <a href="#">Suppliers</a>
              </li>
            </ul>
          </div>

          {/* Table Card */}
          <div className="row">
            <div className="col-md-12">

              <div className="card card-round">

                <div className="card-header">
                  <div className="d-flex align-items-center">

                    <h4 className="card-title">
                      Suppliers
                    </h4>

                    <Link to="/suppliers/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Supplier
                    </Link>

                  </div>
                </div>

                <div className="card-body">

                  {/* Search */}
                  <div className="row mb-3">
                    <div className="col-md-4">

                      <div className="input-icon">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search supplier..."
                        />

                        <span className="input-icon-addon">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Table */}
                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Supplier Name</th>
                          <th>Contact Person</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {suppliers && suppliers.map((supplier, index) => (

                          <tr key={supplier.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{supplier.name}</strong>
                            </td>

                            <td>{supplier.contact_person}</td>

                            <td>{supplier.phone}</td>

                            <td>{supplier.email}</td>

                            <td>{supplier.address}</td>

                            <td>

                              <div className="form-button-action">

                                <Link to={`/suppliers/edit/${supplier.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(supplier.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Suppliers;
