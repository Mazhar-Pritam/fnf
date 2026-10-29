import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Dashboard() {
  const [data, setData] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchDashboard() {
    try {
      let res = await axios.get('dashboard/summary.php');
      setData(res.data.data || {});
    } catch (error) {
      console.error('Dashboard load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load the dashboard. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchDashboard();
  }, []);

  function money(value) {
    return Number(value || 0).toFixed(2);
  }

  // One summary card
  function StatCard({ title, value, icon, color, text }) {
    return (
      <div className="col-sm-6 col-md-3">
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
                  <h4 className={`card-title ${text || ''}`}>{value}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <Layout>
        <div className="container">
          <div className="page-inner">
            <div className="alert alert-danger">{errorMessage}</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="container">
          <div className="page-inner">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Height of the bars in the 7 day chart
  const maxDay = Math.max(...data.last7.map((d) => d.total), 1);

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
            <div>
              <h3 className="fw-bold mb-3">Dashboard</h3>
              <h6 className="op-7 mb-2">Car Spare Parts Inventory &amp; Sales</h6>
            </div>
            <div className="ms-md-auto py-2 py-md-0">
              <Link to="/sales/create" className="btn btn-primary btn-round me-2">
                <i className="fa fa-plus"></i>
                &nbsp; New Sale
              </Link>
              <Link to="/purchases/create" className="btn btn-secondary btn-round">
                <i className="fa fa-plus"></i>
                &nbsp; New Purchase
              </Link>
            </div>
          </div>

          {/* Sales and profit */}
          <div className="row">
            <StatCard title={`Today's Sales (${data.today_count})`} value={money(data.today_sales)} icon="fas fa-shopping-cart" color="icon-primary" />
            <StatCard title="This Month Sales" value={money(data.month_sales)} icon="fas fa-chart-line" color="icon-info" />
            <StatCard
              title="This Month Net Profit"
              value={money(data.month_profit)}
              icon="fas fa-coins"
              color="icon-success"
              text={data.month_profit < 0 ? 'text-danger' : ''}
            />
            <StatCard title="Cash Balance" value={money(data.cash_balance)} icon="fas fa-wallet" color="icon-secondary" />
          </div>

          {/* Stock and dues */}
          <div className="row">
            <StatCard title="Customers Owe Us" value={money(data.receivable)} icon="fas fa-user-clock" color="icon-warning" />
            <StatCard title="We Owe Suppliers" value={money(data.payable)} icon="fas fa-truck" color="icon-danger" />
            <StatCard title="Spare Parts" value={data.parts_count} icon="fas fa-cogs" color="icon-primary" />
            <StatCard title="Stock Value (at cost)" value={money(data.stock_value)} icon="fas fa-boxes" color="icon-info" />
          </div>

          <div className="row">
            {/* Last 7 days */}
            <div className="col-md-7">
              <div className="card card-round">
                <div className="card-header">
                  <div className="card-title">Sales - Last 7 Days</div>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-end justify-content-between" style={{ height: 180 }}>
                    {data.last7.map((day) => (
                      <div key={day.date} className="text-center flex-fill px-1">
                        <small className="d-block text-muted">{day.total > 0 ? money(day.total) : ''}</small>
                        <div
                          className="bg-primary rounded-top mx-auto"
                          style={{ height: Math.max((day.total / maxDay) * 130, day.total > 0 ? 4 : 1), width: '70%' }}
                          title={`${day.date}: ${money(day.total)}`}
                        ></div>
                        <small>{day.label}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Low stock */}
            <div className="col-md-5">
              <div className="card card-round">
                <div className="card-header">
                  <div className="card-title">
                    Low Stock
                    {data.low_stock_count > 0 && (
                      <span className="badge bg-danger ms-2">{data.low_stock_count}</span>
                    )}
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Part</th>
                        <th className="text-end">Stock</th>
                        <th className="text-end">Min</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.low_stock.length === 0 ? (
                        <tr><td colSpan="3" className="text-center text-muted">All parts have enough stock</td></tr>
                      ) : (
                        data.low_stock.map((part) => (
                          <tr key={part.id}>
                            <td>{part.name}</td>
                            <td className="text-end">
                              <span className={`badge ${Number(part.stock_quantity) === 0 ? 'bg-danger' : 'bg-warning'}`}>
                                {part.stock_quantity}
                              </span>
                            </td>
                            <td className="text-end">{part.minimum_stock}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Recent sales */}
            <div className="col-md-7">
              <div className="card card-round">
                <div className="card-header d-flex">
                  <div className="card-title">Recent Sales</div>
                  <Link to="/sales" className="ms-auto btn btn-sm btn-label-primary">View all</Link>
                </div>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Invoice</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th className="text-end">Total</th>
                        <th className="text-end">Due</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recent_sales.length === 0 ? (
                        <tr><td colSpan="5" className="text-center text-muted">No sales yet</td></tr>
                      ) : (
                        data.recent_sales.map((sale) => (
                          <tr key={sale.id}>
                            <td><Link to={`/sales/view/${sale.id}`}>{sale.invoice_no}</Link></td>
                            <td>{sale.customer_name}</td>
                            <td>{sale.sale_date}</td>
                            <td className="text-end">{money(sale.total_amount)}</td>
                            <td className="text-end">
                              {Number(sale.total_amount) - Number(sale.paid_amount) > 0
                                ? <span className="text-danger">{money(Number(sale.total_amount) - Number(sale.paid_amount))}</span>
                                : <span className="badge bg-success">Paid</span>}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Best sellers */}
            <div className="col-md-5">
              <div className="card card-round">
                <div className="card-header">
                  <div className="card-title">Best Selling Parts (This Month)</div>
                </div>
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Part</th>
                        <th className="text-end">Qty</th>
                        <th className="text-end">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.top_parts.length === 0 ? (
                        <tr><td colSpan="3" className="text-center text-muted">No sales this month</td></tr>
                      ) : (
                        data.top_parts.map((part, index) => (
                          <tr key={index}>
                            <td>{part.name}</td>
                            <td className="text-end">{part.qty}</td>
                            <td className="text-end">{money(part.revenue)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
export default Dashboard;
