import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PaymentEdit() {
  let { id } = useParams();

  const [payment, setPayment] = React.useState({});
  const [customers, setCustomers] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const [paymentRes, customerRes, supplierRes] = await Promise.all([
        axios.get('/payment/single.php?id=' + id),
        axios.get('customer/index.php'),
        axios.get('supplier/index.php'),
      ]);
      setPayment(paymentRes.data.data?.[0] || {});
      setCustomers(customerRes.data.data || []);
      setSuppliers(supplierRes.data.data || []);
    } catch (error) {
      console.error('Payment load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load payment. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [id]);

  // A receipt is money from a customer, a payment is money to a supplier.
  const parties = payment.type === 'receipt' ? customers : suppliers;

  async function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage('');

    const payload = {
      payment_no: payment.payment_no,
      type: payment.type,
      party_id: payment.party_id,
      amount: payment.amount,
      method: payment.method,
      payment_date: payment.payment_date,
      note: payment.note,
    };

    try {
      const res = await axios.post('/payment/update.php?id=' + id, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/payments';
      } else {
        setErrorMessage(res.data.message || 'Failed to update payment.');
      }
    } catch (error) {
      console.error('Payment update error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to update payment. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Payment</h3>

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
              <Link to="/payments">Payments</Link>
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
                    <label htmlFor="paymentNo">Payment No</label>
                    <input type="text" onChange={(e) => setPayment({...payment, payment_no: e.target.value})} value={payment.payment_no || ''} className="form-control" id="paymentNo" placeholder="Enter payment number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentType">Type</label>
                    <select onChange={(e) => setPayment({...payment, type: e.target.value, party_id: ''})} value={payment.type || ''} className="form-select" id="paymentType" required>
                      <option value="receipt">Received from a customer</option>
                      <option value="payment">Paid to a supplier</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentParty">{payment.type === 'receipt' ? 'Customer' : 'Supplier'}</label>
                    <select onChange={(e) => setPayment({...payment, party_id: e.target.value})} value={payment.party_id || ''} className="form-select" id="paymentParty" required>
                      <option value="">Select {payment.type === 'receipt' ? 'customer' : 'supplier'}</option>
                      {parties.map((party) => (
                        <option key={party.id} value={party.id}>{party.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentAmount">Amount</label>
                    <input type="number" min="0.01" step="0.01" onChange={(e) => setPayment({...payment, amount: e.target.value})} value={payment.amount || ''} className="form-control" id="paymentAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Method</label>
                    <select onChange={(e) => setPayment({...payment, method: e.target.value})} value={payment.method || 'Cash'} className="form-select" id="paymentMethod" required>
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="Mobile Banking">Mobile Banking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentDate">Date</label>
                    <input type="date" onChange={(e) => setPayment({...payment, payment_date: e.target.value})} value={payment.payment_date || ''} className="form-control" id="paymentDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentNote">Note</label>
                    <input type="text" onChange={(e) => setPayment({...payment, note: e.target.value})} value={payment.note || ''} className="form-control" id="paymentNote" placeholder="Enter note" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Update Payment</button>
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

export default PaymentEdit;
