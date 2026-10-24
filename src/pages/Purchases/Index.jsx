import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Purchases() {
  const [purchases, setPurchases] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);

  async function fetchPurchases() {
    let res = await axios.get('purchase/index.php');
    setPurchases(res.data.data);
  }

  async function fetchSuppliers() {
    let res = await axios.get('supplier/index.php');
    setSuppliers(res.data.data);
  }

  React.useEffect(() => {
    fetchPurchases();
    fetchSuppliers();
  }, []);

  function supplierName(id) {
    const supplier = suppliers && suppliers.find((s) => s.id == id);
    return supplier ? supplier.name : '';
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      let res = await axios.delete(`purchase/delete.php?id=${id}`);
      if (res.data.status) {
        fetchPurchases();
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
            <h3 className="fw-bold mb-3">Purchases</h3>

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
                <a href="#">Purchases</a>
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
                      Purchases
                    </h4>

                    <Link to="/purchases/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Purchase
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
                          placeholder="Search purchase..."
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
                          <th>Invoice No</th>
                          <th>Supplier</th>
                          <th>Purchase Date</th>
                          <th>Total Amount</th>
                          <th>Note</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {purchases && purchases.map((purchase, index) => (

                          <tr key={purchase.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{purchase.invoice_no}</strong>
                            </td>

                            <td>{supplierName(purchase.supplier_id)}</td>

                            <td>{purchase.purchase_date}</td>

                            <td>{purchase.total_amount}</td>

                            <td>{purchase.note}</td>

                            <td>

                              <div className="form-button-action">
                                   <Link to={`/purchases/view/${purchase.id}`} className="btn btn-link btn-info" title="View / Print">
                                      <i className="fa fa-print"></i>
                                    </Link>

                                <Link to={`/purchases/edit/${purchase.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(purchase.id)}
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
export default Purchases;
