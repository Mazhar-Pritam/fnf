import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function Expenses() {
  const [expenses, setExpenses] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchExpenses() {
    try {
      let res = await axios.get('expense/index.php');
      setExpenses(res.data.data || []);
    } catch (error) {
      console.error('Expense load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load expenses. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchExpenses();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      let res = await axios.delete(`expense/delete.php?id=${id}`);
      if (res.data.status) {
        fetchExpenses();
      } else {
        alert(res.data.message);
      }
    }
  }

  const text = search.toLowerCase();
  const shownExpenses = expenses.filter((expense) =>
    (expense.category || '').toLowerCase().includes(text) ||
    (expense.note || '').toLowerCase().includes(text)
  );

  const total = shownExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Expenses</h3>

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
                <a href="#">Expenses</a>
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
                      Expenses
                    </h4>

                    <Link to="/expenses/create" className="btn btn-primary btn-round ms-auto">
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Expense
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
                          placeholder="Search category or note..."
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
                          <th>Date</th>
                          <th>Category</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Note</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {shownExpenses.map((expense, index) => (

                          <tr key={expense.id}>

                            <td>{index + 1}</td>

                            <td>{expense.expense_date}</td>

                            <td>
                              <strong>{expense.category}</strong>
                            </td>

                            <td>{Number(expense.amount).toFixed(2)}</td>

                            <td>{expense.method}</td>

                            <td>{expense.note}</td>

                            <td>

                              <div className="form-button-action">

                                <Link to={`/expenses/edit/${expense.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(expense.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan="3" className="text-end">Total</th>
                          <th>{total.toFixed(2)}</th>
                          <th colSpan="3"></th>
                        </tr>
                      </tfoot>
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
export default Expenses;
