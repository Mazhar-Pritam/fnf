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

function ProfitLoss() {
  const now = new Date();
  const [from, setFrom] = React.useState(formatDate(new Date(now.getFullYear(), now.getMonth(), 1)));
  const [to, setTo] = React.useState(formatDate(now));
  const [report, setReport] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchReport() {
    setErrorMessage('');
    try {
      const [reportResponse, expensesResponse] = await Promise.all([
        axios.get('report/profit_loss.php', { params: { from, to } }),
        axios.get('expense/index.php'),
      ]);

      if (!reportResponse.data.status) {
        setReport(null);
        setErrorMessage(reportResponse.data.message || 'Unable to load the report.');
        return;
      }

      if (expensesResponse.data.status === false || !Array.isArray(expensesResponse.data.data)) {
        throw new Error(expensesResponse.data.message || 'Invalid expenses response.');
      }

      const expensesByCategory = new Map();
      for (const expense of expensesResponse.data.data) {
        const expenseDate = String(expense.expense_date || '').slice(0, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(expenseDate)) {
          throw new Error('An expense has an invalid transaction date.');
        }
        if (expenseDate < from || expenseDate > to) continue;

        const category = String(expense.category || '').trim();
        const amount = Number(expense.amount);
        if (!category || !Number.isFinite(amount)) {
          throw new Error('An expense has a missing category or invalid amount.');
        }

        expensesByCategory.set(
          category,
          (expensesByCategory.get(category) || 0) + amount
        );
      }

      const expenses = [...expensesByCategory].map(([category, total]) => ({
        category,
        total,
      }));
      const grossProfit = Number(reportResponse.data.data.gross_profit);
      if (!Number.isFinite(grossProfit)) {
        throw new Error('The report contains an invalid gross profit.');
      }

      const totalExpenses = expenses.reduce((total, expense) => total + expense.total, 0);
      setReport({
        ...reportResponse.data.data,
        expenses,
        total_expenses: totalExpenses,
        net_profit: grossProfit - totalExpenses,
      });
    } catch (error) {
      console.error('Profit and loss load error:', error);
      setReport(null);
      setErrorMessage(
        error.response?.data?.message || error.message || 'Unable to load the report. Please try again.'
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

  const netProfit = report ? Number(report.net_profit) : 0;


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
            <h3 className="fw-bold mb-3">Profit &amp; Loss</h3>

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
                <a href="#">Profit &amp; Loss</a>
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

                  {report && (
                    <div>
                      <div className="text-center mb-4">
                        <h3 className="fw-bold mb-1">Profit &amp; Loss Statement</h3>
                        <p className="mb-0">From {report.from} to {report.to}</p>
                      </div>

                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>Sales</td>
                            <td className="text-end">{money(report.sales)}</td>
                          </tr>
                          <tr>
                            <td>Less: Sale Returns</td>
                            <td className="text-end">{money(report.sale_returns)}</td>
                          </tr>
                          <tr>
                            <th>Net Sales</th>
                            <th className="text-end">{money(report.revenue)}</th>
                          </tr>
                          <tr>
                            <td>Less: Cost of Goods Sold</td>
                            <td className="text-end">{money(report.cogs)}</td>
                          </tr>
                          <tr className="table-active">
                            <th>Gross Profit</th>
                            <th className="text-end">{money(report.gross_profit)}</th>
                          </tr>

                          <tr>
                            <th colSpan="2">Expenses</th>
                          </tr>
                          {report.expenses.map((expense) => (
                            <tr key={expense.category}>
                              <td>&nbsp;&nbsp;&nbsp;{expense.category}</td>
                              <td className="text-end">{money(expense.total)}</td>
                            </tr>
                          ))}
                          {report.expenses.length === 0 && (
                            <tr>
                              <td colSpan="2" className="text-muted">&nbsp;&nbsp;&nbsp;No expenses in this period</td>
                            </tr>
                          )}
                          <tr>
                            <th>Total Expenses</th>
                            <th className="text-end">{money(report.total_expenses)}</th>
                          </tr>

                          <tr className="table-active">
                            <th>{netProfit >= 0 ? 'Net Profit' : 'Net Loss'}</th>
                            <th className={netProfit >= 0 ? 'text-end text-success' : 'text-end text-danger'}>
                              {money(report.net_profit)}
                            </th>
                          </tr>
                        </tbody>
                      </table>

                      <h5 className="mt-4">Profit of Every Product</h5>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Part</th>
                              <th className="text-end">Sold</th>
                              <th className="text-end">Returned</th>
                              <th className="text-end">Net Sales</th>
                              <th className="text-end">Cost</th>
                              <th className="text-end">Profit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.products.map((product, index) => (
                              <tr key={product.part_id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td className="text-end">{product.sold_qty}</td>
                                <td className="text-end">{product.returned_qty}</td>
                                <td className="text-end">{money(product.revenue)}</td>
                                <td className="text-end">{money(product.cost)}</td>
                                <td className={Number(product.profit) >= 0 ? 'text-end' : 'text-end text-danger'}>
                                  {money(product.profit)}
                                </td>
                              </tr>
                            ))}
                            {report.products.length === 0 && (
                              <tr>
                                <td colSpan="7" className="text-muted">No sales in this period</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <p className="text-muted mb-0">
                        Cost of goods sold = what the sold parts cost when they were sold.
                        Purchases are not an expense here, they become stock until the part is sold.
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
export default ProfitLoss;
