import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Accounts() {
  const [summary, setSummary] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchSummary() {
    try {
      let res = await axios.get('accounts/summary.php');
      setSummary(res.data.data || {});
    } catch (error) {
      console.error('Accounts load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load accounts. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchSummary();
  }, []);

  function money(value) {
    return Number(value || 0).toFixed(2);
  }

  // One summary card
  function StatCard({ title, value, icon, color }) {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="card card-stats card-round">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-icon">
                <div className={`icon-big text-center ${color} bubble-shadow-small`}>
                  <i className={icon}></i>
                </div>
              </div>
              <div className="col col-stats ms-3 ms-sm-0">
                <div className="numbers">
                  <p className="card-category">{title}</p>
                  <h4 className="card-title">{money(value)}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Accounts</h3>

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
                <a href="#">Accounts</a>
              </li>
            </ul>
          </div>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Summary cards */}
          <div className="row">
            <StatCard title="Customers Owe Us" value={summary.receivable} icon="fas fa-user-clock" color="icon-info" />
            <StatCard title="We Owe Suppliers" value={summary.payable} icon="fas fa-truck" color="icon-secondary" />
            <StatCard title="Cash Balance" value={summary.cash_balance} icon="fas fa-wallet" color="icon-primary" />
            <StatCard title="Total Received" value={summary.total_received} icon="fas fa-arrow-down" color="icon-success" />
            <StatCard title="Paid to Suppliers" value={summary.total_paid} icon="fas fa-arrow-up" color="icon-secondary" />
            <StatCard title="Total Expenses" value={summary.total_expenses} icon="fas fa-receipt" color="icon-info" />
          </div>

          {/* Links */}
          <div className="card card-round">
            <div className="card-body">
              <p className="mb-3 text-muted">
                Cash Balance = money received from customers - money paid to suppliers - expenses.
              </p>
              <Link to="/payments" className="btn btn-primary btn-round me-2">
                <i className="fa fa-money-bill"></i>
                &nbsp; Payments
              </Link>
              <Link to="/expenses" className="btn btn-primary btn-round me-2">
                <i className="fa fa-receipt"></i>
                &nbsp; Expenses
              </Link>
              <Link to="/accounts/ledger" className="btn btn-secondary btn-round">
                <i className="fa fa-book"></i>
                &nbsp; Party Ledger
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
export default Accounts;
