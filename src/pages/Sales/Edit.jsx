import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import SaleItems from './SaleItems.jsx';

function SaleEdit() {
  let { id } = useParams();

  const [sale, setSale] = React.useState({});
  const [customers, setCustomers] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [parts, setParts] = React.useState([]);
  const [originalItems, setOriginalItems] = React.useState([]);
  const [items, setItems] = React.useState([
    { category_id: '', part_id: '', quantity: 1, unit_price: '' }
  ]);
  const [errorMessage, setErrorMessage] = React.useState('');

  // Total of all item rows, and how much of it is still due.
  const total = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0),
    0
  );
  const paidNow = Number(sale.paid_amount) || 0;
  const due = Math.max(total - paidNow, 0);

  async function fetchData() {
    try {
      const [saleRes, customerRes, categoryRes, partRes] = await Promise.all([
        axios.get('/sale/single.php?id=' + id),
        axios.get('customer/index.php'),
        axios.get('category/index.php'),
        axios.get('part/index.php'),
      ]);

      const data = saleRes.data.data?.[0];
      if (data) {
        setSale(data);
        if (data.items && data.items.length > 0) {
          setItems(data.items);
          setOriginalItems(data.items);
        }
      } else {
        setErrorMessage(saleRes.data.message || 'Sale not found.');
      }
      setCustomers(customerRes.data.data || []);
      setCategories(categoryRes.data.data || []);
      setParts(partRes.data.data || []);
    } catch (error) {
      console.error('Sale load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load sale. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    const payload = {
      invoice_no: formData.get('invoice_no'),
      customer_id: formData.get('customer_id'),
      sale_date: formData.get('sale_date'),
      note: formData.get('note'),
      paid_amount: sale.paid_amount,
      items: items.map(({ part_id, quantity, unit_price }) => ({ part_id, quantity, unit_price })),
    };

    try {
      const res = await axios.post('/sale/update.php?id=' + id, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/sales';
      } else {
        setErrorMessage(res.data.message || 'Failed to update sale.');
      }
    } catch (error) {
      console.error('Sale update error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to update sale. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Sale</h3>

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
              <Link to="/sales">Sales</Link>
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
                    <label htmlFor="saleInvoice">Invoice No</label>
                    <input type="text" onChange={(e) => setSale({...sale, invoice_no: e.target.value})} value={sale.invoice_no || ''} name="invoice_no" className="form-control" id="saleInvoice" placeholder="Enter invoice number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="saleCustomer">Customer</label>
                    <select onChange={(e) => setSale({...sale, customer_id: e.target.value})} value={sale.customer_id || ''} name="customer_id" className="form-select" id="saleCustomer" required>
                      <option value="">Select customer</option>
                      {customers && customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="saleDate">Sale Date</label>
                    <input type="date" onChange={(e) => setSale({...sale, sale_date: e.target.value})} value={sale.sale_date || ''} name="sale_date" className="form-control" id="saleDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="saleNote">Note</label>
                    <input type="text" onChange={(e) => setSale({...sale, note: e.target.value})} value={sale.note || ''} name="note" className="form-control" id="saleNote" placeholder="Enter note" />
                  </div>

                  <SaleItems items={items} setItems={setItems} categories={categories} parts={parts} originalItems={originalItems} />

                  <div className="form-group">
                    <label htmlFor="salePaid">Paid Amount</label>
                    <div className="input-group">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={sale.paid_amount ?? ''}
                        onChange={(e) => setSale({...sale, paid_amount: e.target.value})}
                        className="form-control"
                        id="salePaid"
                        placeholder="0 = nothing paid yet (full due)"
                      />
                      <button type="button" className="btn btn-secondary" onClick={() => setSale({...sale, paid_amount: total.toFixed(2)})}>
                        Paid in full
                      </button>
                    </div>
                    <small className={due > 0 ? 'text-danger' : 'text-success'}>
                      Total {total.toFixed(2)} &nbsp;|&nbsp; Paid {paidNow.toFixed(2)} &nbsp;|&nbsp; Due {due.toFixed(2)}
                      {due === 0 && total > 0 ? ' (paid in full)' : ''}
                    </small>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">Update Sale</button>
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

export default SaleEdit;
