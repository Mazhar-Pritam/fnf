import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Payments() {
  const [payments, setPayments] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchPayments() {
    try {
      let res = await axios.get('payment/index.php');
      setPayments(res.data.data || []);
    } catch (error) {
      console.error('Payment load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load payments. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchPayments();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      let res = await axios.delete(`payment/delete.php?id=${id}`);
      if (res.data.status) {
        fetchPayments();
      } else {
        alert(res.data.message);
      }
    }
  }

  const text = search.toLowerCase();
  const shownPayments = payments.filter((payment) =>
    (payment.payment_no || '').toLowerCase().includes(text) ||
    (payment.party_name || '').toLowerCase().includes(text)
  );


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Payments</h3>

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
                <a href="#">Payments</a>
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
                      Payments
                    </h4>

                    <Link to="/payments/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Payment
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
                          placeholder="Search payment no or name..."
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
                          <th>Payment No</th>
                          <th>Type</th>
                          <th>Customer / Supplier</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Note</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {shownPayments.map((payment, index) => (

                          <tr key={payment.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{payment.payment_no}</strong>
                            </td>

                            <td>
                              {payment.type === 'receipt'
                                ? <span className="badge badge-success">Received</span>
                                : <span className="badge badge-warning">Paid</span>}
                            </td>

                            <td>{payment.party_name}</td>

                            <td>{payment.payment_date}</td>

                            <td>{Number(payment.amount).toFixed(2)}</td>

                            <td>{payment.method}</td>

                            <td>{payment.note}</td>

                            <td>

                              <div className="form-button-action">

                                <Link to={`/payments/edit/${payment.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(payment.id)}
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
export default Payments;
