import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

// Date as 2026-10-31 (local time)
function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function PurchaseReport() {
  const now = new Date();
  const [from, setFrom] = React.useState(formatDate(new Date(now.getFullYear(), now.getMonth(), 1)));
  const [to, setTo] = React.useState(formatDate(now));
  const [rows, setRows] = React.useState([]);
  const [searched, setSearched] = React.useState({ from: '', to: '' });
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchReport() {
    setErrorMessage('');
    try {
      let res = await axios.get('report/purchases.php?from=' + from + '&to=' + to);
      if (res.data.status) {
        setRows(res.data.data || []);
        setSearched({ from: from, to: to });
      } else {
        setRows([]);
        setErrorMessage(res.data.message || 'Unable to load the report.');
      }
    } catch (error) {
      console.error('Purchase report load error:', error);
      setRows([]);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load the report. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchReport();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetchReport();
  }

  function money(value) {
    return Number(value || 0).toFixed(2);
  }

  const totalAmount = rows.reduce((sum, row) => sum + Number(row.total_amount), 0);
  const totalReturned = rows.reduce((sum, row) => sum + Number(row.returned), 0);
  const totalPaid = rows.reduce((sum, row) => sum + Number(row.paid_amount), 0);


  return (
    <Layout>
    {/* When printing, hide the menu, header and the date form. Only the report is printed. */}
    <style>{`
      @media print {
        .sidebar, .main-header, .footer, .no-print { display: none !important; }
        .main-panel { width: 100% !important; float: none !important; }
        .main-panel > .container { margin-top: 0 !important; padding: 0 !important; }
        .page-inner { padding: 0 !important; }
        .card { box-shadow: none !important; border: 0 !important; }
      }
    `}</style>

      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header no-print">
            <h3 className="fw-bold mb-3">Purchase Report</h3>

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
                <Link to="/reports/profit-loss">Reports</Link>
              </li>
              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>
              <li className="nav-item">
                <a href="#">Purchase Report</a>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">

                  {/* Date range (not printed) */}
                  <form onSubmit={handleSubmit} className="row mb-4 no-print">
                    <div className="col-md-3">
                      <label htmlFor="fromDate">From</label>
                      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="form-control" id="fromDate" required />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="toDate">To</label>
                      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="form-control" id="toDate" required />
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                      <button type="submit" className="btn btn-primary btn-round me-2">
                        <i className="fa fa-search"></i>
                        &nbsp; Show
                      </button>
                      <button type="button" className="btn btn-secondary btn-round" onClick={() => window.print()}>
                        <i className="fa fa-print"></i>
                        &nbsp; Print
                      </button>
                    </div>
                  </form>

                  {errorMessage && (
                    <div className="alert alert-danger no-print" role="alert">
                      {errorMessage}
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="fw-bold mb-1">Purchase Report</h3>
                    <p className="mb-0">From {searched.from} to {searched.to}</p>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Date</th>
                          <th>Invoice No</th>
                          <th>Supplier</th>
                          <th className="text-end">Total</th>
                          <th className="text-end">Returned</th>
                          <th className="text-end">Paid</th>
                          <th className="text-end">Net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, index) => (
                          <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>{row.doc_date}</td>
                            <td>{row.invoice_no}</td>
                            <td>{row.party_name}</td>
                            <td className="text-end">{money(row.total_amount)}</td>
                            <td className="text-end">{money(row.returned)}</td>
                            <td className="text-end">{money(row.paid_amount)}</td>
                            <td className="text-end">{money(Number(row.total_amount) - Number(row.returned))}</td>
                          </tr>
                        ))}
                        {rows.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-muted">No purchases in this period</td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan="4" className="text-end">Total</th>
                          <th className="text-end">{money(totalAmount)}</th>
                          <th className="text-end">{money(totalReturned)}</th>
                          <th className="text-end">{money(totalPaid)}</th>
                          <th className="text-end">{money(totalAmount - totalReturned)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <p className="text-muted mb-0">
                    "Returned" is the total of all returns made against that invoice. "Paid" is the money paid on the invoice itself.
                  </p>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
export default PurchaseReport;
