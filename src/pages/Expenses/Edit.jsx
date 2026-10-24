import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function ExpenseEdit() {
  let { id } = useParams();

  const [expense, setExpense] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchExpense() {
    try {
      let res = await axios.get('/expense/single.php?id=' + id);
      setExpense(res.data.data?.[0] || {});
    } catch (error) {
      console.error('Expense load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load expense. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchExpense();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage('');

    const payload = {
      expense_date: expense.expense_date,
      category: expense.category,
      amount: expense.amount,
      method: expense.method,
      note: expense.note,
    };

    try {
      const res = await axios.post('/expense/update.php?id=' + id, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/expenses';
      } else {
        setErrorMessage(res.data.message || 'Failed to update expense.');
      }
    } catch (error) {
      console.error('Expense update error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to update expense. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Expense</h3>

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
              <a href="#">Edit</a>
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
                    <input type="date" onChange={(e) => setExpense({...expense, expense_date: e.target.value})} value={expense.expense_date || ''} className="form-control" id="expenseDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseCategory">Category</label>
                    <select onChange={(e) => setExpense({...expense, category: e.target.value})} value={expense.category || ''} className="form-select" id="expenseCategory" required>
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
                    <input type="number" min="0.01" step="0.01" onChange={(e) => setExpense({...expense, amount: e.target.value})} value={expense.amount || ''} className="form-control" id="expenseAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseMethod">Method</label>
                    <select onChange={(e) => setExpense({...expense, method: e.target.value})} value={expense.method || 'Cash'} className="form-select" id="expenseMethod" required>
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="Mobile Banking">Mobile Banking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="expenseNote">Note</label>
                    <input type="text" onChange={(e) => setExpense({...expense, note: e.target.value})} value={expense.note || ''} className="form-control" id="expenseNote" placeholder="Enter note" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Update Expense</button>
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

export default ExpenseEdit;
