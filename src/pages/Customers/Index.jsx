import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
function Customers() {

  const [customers, setCustomers] = React.useState([]);
  const fetchCustomers = async (e) => {
      let res = await axios.get(`customer/index.php`)
      setCustomers(res.data.data);
  }
  
  React.useEffect(() => {
    fetchCustomers();
  }
, []);

  async function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this customer?")) {
    let res = await axios.delete(`customer/delete.php?id=${id}`)
    if(res.data.status){
      fetchCustomers();
    }else{
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
          <h3 className="fw-bold mb-3">Customers</h3>

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
              <a href="#">Customers</a>
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
                    Customers
                  </h4>

                  <Link to="/customers/create" className="btn btn-primary btn-round ms-auto">
                    <i className="fa fa-plus"></i>
                    &nbsp; Add Customer
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
                        placeholder="Search customer..."
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
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {customers && customers.map((customer, index) => (

                        <tr key={customer.id}>

                          <td>{index + 1}</td>

                          <td>
                            <strong>{customer.name}</strong>
                          </td>

                          <td>{customer.phone}</td>

                          <td>{customer.email}</td>

                          <td>{customer.address}</td>

                          <td>

                            <div className="form-button-action">

                              <Link to={`/customers/edit/${customer.id}`}
                                className="btn btn-link btn-primary"
                                title="Edit"
                              >
                                <i className="fa fa-edit"></i>
                              </Link>

                              <button
                                className="btn btn-link btn-danger"
                                title="Delete"
                                onClick={() => handleDelete(customer.id)}
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

export default Customers;
