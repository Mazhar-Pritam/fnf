import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Sales() {
  const [sales, setSales] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchSales() {
    try {
      let res = await axios.get('sale/index.php');
      setSales(res.data.data || []);
    } catch (error) {
      console.error('Sale load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load sales. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchSales();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Delete this sale? The sold quantities will go back into stock.")) {
      let res = await axios.delete(`sale/delete.php?id=${id}`);
      if (res.data.status) {
        fetchSales();
      } else {
        alert(res.data.message);
      }
    }
  }

  const text = search.toLowerCase();
  const shownSales = sales.filter((sale) =>
    (sale.invoice_no || '').toLowerCase().includes(text) ||
    (sale.customer_name || '').toLowerCase().includes(text)
  );


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Sales</h3>

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
                <a href="#">Sales</a>
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
                      Sales
                    </h4>

                    <Link to="/sales/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Sale
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
                          placeholder="Search invoice or customer..."
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
                          <th>Invoice No</th>
                          <th>Customer</th>
                          <th>Sale Date</th>
                          <th>Total Amount</th>
                          <th>Note</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {shownSales.map((sale, index) => (

                          <tr key={sale.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{sale.invoice_no}</strong>
                            </td>

                            <td>{sale.customer_name}</td>

                            <td>{sale.sale_date}</td>

                            <td>{Number(sale.total_amount).toFixed(2)}</td>

                            <td>{sale.note}</td>

                            <td>

                              <div className="form-button-action">

                                <Link to={`/sales/edit/${sale.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(sale.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                                   <Link to={`/sales/view/${sale.id}`} className="btn btn-link btn-info" title="View / Print">
     <i className="fa fa-print"></i>
   </Link>
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
export default Sales;
