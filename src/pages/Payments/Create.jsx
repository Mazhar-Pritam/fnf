import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PaymentCreate() {
  const [customers, setCustomers] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [type, setType] = React.useState('receipt');
  const [partyId, setPartyId] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const [customerRes, supplierRes] = await Promise.all([
        axios.get('customer/index.php'),
        axios.get('supplier/index.php'),
      ]);
      setCustomers(customerRes.data.data || []);
      setSuppliers(supplierRes.data.data || []);
    } catch (error) {
      console.error('Payment form load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load customers or suppliers. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  // A receipt is money from a customer, a payment is money to a supplier.
  const parties = type === 'receipt' ? customers : suppliers;

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    const payload = {
      payment_no: formData.get('payment_no'),
      type: type,
      party_id: partyId,
      amount: formData.get('amount'),
      method: formData.get('method'),
      payment_date: formData.get('payment_date'),
      note: formData.get('note'),
    };

    try {
      const res = await axios.post('/payment/create.php', JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/payments';
      } else {
        setErrorMessage(res.data.message || 'Failed to create payment.');
      }
    } catch (error) {
      console.error('Payment create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create payment. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Payment</h3>

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
                    <label htmlFor="paymentNo">Payment No</label>
                    <input type="text" name="payment_no" className="form-control" id="paymentNo" placeholder="Enter payment number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentType">Type</label>
                    <select value={type} onChange={(e) => { setType(e.target.value); setPartyId(''); }} className="form-select" id="paymentType" required>
                      <option value="receipt">Received from a customer</option>
                      <option value="payment">Paid to a supplier</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentParty">{type === 'receipt' ? 'Customer' : 'Supplier'}</label>
                    <select value={partyId} onChange={(e) => setPartyId(e.target.value)} className="form-select" id="paymentParty" required>
                      <option value="">Select {type === 'receipt' ? 'customer' : 'supplier'}</option>
                      {parties.map((party) => (
                        <option key={party.id} value={party.id}>{party.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentAmount">Amount</label>
                    <input type="number" min="0.01" step="0.01" name="amount" className="form-control" id="paymentAmount" placeholder="Enter amount" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Method</label>
                    <select name="method" className="form-select" id="paymentMethod" required>
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="Mobile Banking">Mobile Banking</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentDate">Date</label>
                    <input type="date" name="payment_date" className="form-control" id="paymentDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentNote">Note</label>
                    <input type="text" name="note" className="form-control" id="paymentNote" placeholder="Enter note" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Payment</button>
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

export default PaymentCreate;
