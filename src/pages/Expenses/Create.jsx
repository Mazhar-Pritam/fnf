import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function ExpenseCreate() {
  const [errorMessage, setErrorMessage] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    const payload = {
      expense_date: formData.get('expense_date'),
      category: formData.get('category'),
      amount: formData.get('amount'),
      method: formData.get('method'),
      note: formData.get('note'),
    };

    try {
      const res = await axios.post('/expense/create.php', JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/expenses';
      } else {
        setErrorMessage(res.data.message || 'Failed to create expense.');
      }
    } catch (error) {
      console.error('Expense create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create expense. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Expense</h3>

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
              <Link to="/expenses">Expenses</Link>
            </li>
            <li className="separator">
              <i className="icon-arrow-right"></i>
            </li>
            <li className="nav-item">
              <a href="#">Add New</a>
            </li>
          </ul>
        </div>

        {/* Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="form-group">
                    <label htmlFor="expenseDate">Date</label>
                    <input type="date" name="expense_date" className="form-control" id="expenseDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseCategory">Category</label>
                    <select name="category" className="form-select" id="expenseCategory" required>
                      <option value="">Select category</option>
                      <option value="Rent">Rent</option>
                      <option value="Salary">Salary</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Transport">Transport</option>
                      <option value="Internet">Internet</option>
                      <option value="Repair">Repair</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseAmount">Amount</label>
                    <input type="number" min="0.01" step="0.01" name="amount" className="form-control" id="expenseAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseMethod">Method</label>
                    <select name="method" className="form-select" id="expenseMethod" required>
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="Mobile Banking">Mobile Banking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseNote">Note</label>
                    <input type="text" name="note" className="form-control" id="expenseNote" placeholder="Enter note" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Expense</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </Layout>
  );
}

export default ExpenseCreate;
