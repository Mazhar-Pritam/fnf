import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Ledger() {
  const [type, setType] = React.useState('customer');
  const [balances, setBalances] = React.useState([]);
  const [statement, setStatement] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchBalances() {
    try {
      let res = await axios.get('accounts/balances.php?type=' + type);
      setBalances(res.data.data || []);
    } catch (error) {
      console.error('Balance load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load balances. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    setStatement(null);
    setErrorMessage('');
    fetchBalances();
  }, [type]);

  async function showStatement(partyId) {
    setErrorMessage('');
    try {
      let res = await axios.get('accounts/statement.php?type=' + type + '&party_id=' + partyId);
      if (res.data.status) {
        setStatement(res.data.data);
      } else {
        setErrorMessage(res.data.message || 'Unable to load the statement.');
      }
    } catch (error) {
      console.error('Statement load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load the statement. Please try again.'
      );
    }
  }

  function money(value) {
    return Number(value || 0).toFixed(2);
  }

  const partyWord = type === 'customer' ? 'Customer' : 'Supplier';
  const balanceWord = type === 'customer' ? 'Customer owes us' : 'We owe the supplier';
  const chargeWord = type === 'customer' ? 'Sale' : 'Purchase';


  return (
    <Layout>
    {/* When printing, hide the menu, header and the balance list. Only the statement is printed. */}
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
            <h3 className="fw-bold mb-3">Party Ledger</h3>

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
                <Link to="/accounts">Accounts</Link>
              </li>
              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>
              <li className="nav-item">
                <a href="#">Party Ledger</a>
              </li>
            </ul>
          </div>

          {errorMessage && (
            <div className="alert alert-danger no-print" role="alert">
              {errorMessage}
            </div>
          )}

          {/* Balances */}
          <div className="row no-print">
            <div className="col-md-12">
              <div className="card card-round">

                <div className="card-header">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title">
                      {type === 'customer' ? 'Customer Balances' : 'Supplier Balances'}
                    </h4>

                    <div className="ms-auto">
                      <button
                        type="button"
                        className={type === 'customer' ? 'btn btn-primary btn-round me-2' : 'btn btn-border btn-round me-2'}
                        onClick={() => setType('customer')}
                      >
                        Customers
                      </button>
                      <button
                        type="button"
                        className={type === 'supplier' ? 'btn btn-primary btn-round' : 'btn btn-border btn-round'}
                        onClick={() => setType('supplier')}
                      >
                        Suppliers
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{partyWord}</th>
                          <th>Phone</th>
                          <th>{type === 'customer' ? 'Sales' : 'Purchases'}</th>
                          <th>Returns</th>
                          <th>{type === 'customer' ? 'Received' : 'Paid'}</th>
                          <th>Balance</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {balances.map((party, index) => (

                          <tr key={party.id}>

                            <td>{index + 1}</td>

                            <td>
                              <strong>{party.name}</strong>
                            </td>

                            <td>{party.phone}</td>

                            <td>{money(party.billed)}</td>

                            <td>{money(party.returned)}</td>

                            <td>{money(party.paid)}</td>

                            <td>
                              <strong className={Number(party.balance) > 0 ? 'text-danger' : ''}>
                                {money(party.balance)}
                              </strong>
                            </td>

                            <td>
                              <button
                                className="btn btn-link btn-primary"
                                title="View statement"
                                onClick={() => showStatement(party.id)}
                              >
                                <i className="fa fa-book"></i>
                                &nbsp; Statement
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted mb-0">
                    Balance = {type === 'customer' ? 'Sales - Returns - Received' : 'Purchases - Returns - Paid'}.
                    A red number means money is still due.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statement */}
          {statement && (
            <div className="row">
              <div className="col-md-12">
                <div className="card card-round">
                  <div className="card-body">

                    <div className="d-flex justify-content-end mb-3 no-print">
                      <button type="button" className="btn btn-primary btn-round" onClick={() => window.print()}>
                        <i className="fa fa-print"></i>
                        &nbsp; Print
                      </button>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="fw-bold mb-1">{partyWord} Statement</h3>
                      <h4 className="mb-1">{statement.party.name}</h4>
                      {statement.party.phone && <p className="mb-0">Phone: {statement.party.phone}</p>}
                      {statement.party.address && <p className="mb-0">Address: {statement.party.address}</p>}
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Reference</th>
                            <th className="text-end">{chargeWord}</th>
                            <th className="text-end">Return / Payment</th>
                            <th className="text-end">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statement.rows.map((row, index) => (
                            <tr key={index}>
                              <td>{row.d}</td>
                              <td>{row.kind}</td>
                              <td>{row.ref}</td>
                              <td className="text-end">{Number(row.charge) > 0 ? money(row.charge) : ''}</td>
                              <td className="text-end">{Number(row.credit) > 0 ? money(row.credit) : ''}</td>
                              <td className="text-end">{money(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colSpan="3" className="text-end">Total</th>
                            <th className="text-end">{money(statement.total_charge)}</th>
                            <th className="text-end">{money(statement.total_credit)}</th>
                            <th className="text-end">{money(statement.balance)}</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <h5 className="mt-3">
                      {balanceWord}: <strong>{money(statement.balance)}</strong>
                    </h5>

                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
export default Ledger;
