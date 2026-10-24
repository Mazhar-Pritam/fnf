import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PurchaseReturns() {
  const [returns, setReturns] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchReturns() {
    try {
      let res = await axios.get('purchase_return/index.php');
      setReturns(res.data.data || []);
    } catch (error) {
      console.error('Purchase return load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load purchase returns. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchReturns();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Delete this return? The returned quantities will be added back to stock.")) {
      let res = await axios.delete(`purchase_return/delete.php?id=${id}`);
      if (res.data.status) {
        fetchReturns();
      } else {
        alert(res.data.message);
      }
    }
  }

  const text = search.toLowerCase();
  const shownReturns = returns.filter((item) =>
    (item.return_no || '').toLowerCase().includes(text) ||
    (item.invoice_no || '').toLowerCase().includes(text) ||
    (item.party_name || '').toLowerCase().includes(text)
  );


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Purchase Returns</h3>

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
                <a href="#">Purchase Returns</a>
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
                      Purchase Returns
                    </h4>

                    <Link to="/purchase-returns/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Purchase Return
                    </Link>

                  </div>
                </div>

                <div className="card-body">

                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  {/* Search */}
                  <div className="row mb-3">
                    <div className="col-md-4">

                      <div className="input-icon">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search return, invoice or supplier..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
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
                          <th>Return No</th>
                          <th>Purchase Invoice</th>
                          <th>Supplier</th>
                          <th>Return Date</th>
                          <th>Total Amount</th>
                          <th>Note</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {shownReturns.map((item, index) => (

                          <tr key={item.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{item.return_no}</strong>
                            </td>

                            <td>{item.invoice_no}</td>

                            <td>{item.party_name}</td>

                            <td>{item.return_date}</td>

                            <td>{Number(item.total_amount).toFixed(2)}</td>

                            <td>{item.note}</td>

                            <td>

                              <div className="form-button-action">

                                <Link to={`/purchase-returns/view/${item.id}`}
                                  className="btn btn-link btn-info"
                                  title="View / Print"
                                >
                                  <i className="fa fa-print"></i>
                                </Link>

                                <Link to={`/purchase-returns/edit/${item.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(item.id)}
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
export default PurchaseReturns;
