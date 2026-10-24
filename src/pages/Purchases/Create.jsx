import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import PurchaseItems from './PurchaseItems.jsx';

function PurchaseCreate() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [parts, setParts] = React.useState([]);
  const [items, setItems] = React.useState([
    { category_id: '', part_id: '', quantity: 1, unit_price: '', sale_price: '' }
  ]);
  const [paid, setPaid] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  // Total of all item rows, and how much of it is still due.
  const total = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0),
    0
  );
  const paidNow = Number(paid) || 0;
  const due = Math.max(total - paidNow, 0);

  async function fetchData() {
    try {
      const [supplierRes, categoryRes, partRes] = await Promise.all([
        axios.get('supplier/index.php'),
        axios.get('category/index.php'),
        axios.get('part/index.php'),
      ]);
      setSuppliers(supplierRes.data.data || []);
      setCategories(categoryRes.data.data || []);
      setParts(partRes.data.data || []);
    } catch (error) {
      console.error('Purchase form load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load suppliers, categories or parts. Please try again.'
      );
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    const payload = {
      invoice_no: formData.get('invoice_no'),
      supplier_id: formData.get('supplier_id'),
      purchase_date: formData.get('purchase_date'),
      note: formData.get('note'),
      paid_amount: paid,
      items: items.map(({ part_id, quantity, unit_price, sale_price }) => ({ part_id, quantity, unit_price, sale_price })),
    };

    try {
      const res = await axios.post('/purchase/create.php', JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/purchases';
      } else {
        setErrorMessage(res.data.message || 'Failed to create purchase.');
      }
    } catch (error) {
      console.error('Purchase create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create purchase. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Purchase</h3>

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
              <Link to="/purchases">Purchases</Link>
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
                    <label htmlFor="purchaseInvoice">Invoice No</label>
                    <input type="text" name="invoice_no" className="form-control" id="purchaseInvoice" placeholder="Enter invoice number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="purchaseSupplier">Supplier</label>
                    <select name="supplier_id" className="form-select" id="purchaseSupplier" required>
                      <option value="">Select supplier</option>
                      {suppliers && suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <input type="date" name="purchase_date" className="form-control" id="purchaseDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="purchaseNote">Note</label>
                    <input type="text" name="note" className="form-control" id="purchaseNote" placeholder="Enter note" />
                  </div>

                  <PurchaseItems items={items} setItems={setItems} categories={categories} parts={parts} />

                  <div className="form-group">
                    <label htmlFor="purchasePaid">Paid Amount</label>
                    <div className="input-group">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                        className="form-control"
                        id="purchasePaid"
                        placeholder="0 = nothing paid yet (full due)"
                      />
                      <button type="button" className="btn btn-secondary" onClick={() => setPaid(total.toFixed(2))}>
                        Paid in full
                      </button>
                    </div>
                    <small className={due > 0 ? 'text-danger' : 'text-success'}>
                      Total {total.toFixed(2)} &nbsp;|&nbsp; Paid {paidNow.toFixed(2)} &nbsp;|&nbsp; Due {due.toFixed(2)}
                      {due === 0 && total > 0 ? ' (paid in full)' : ''}
                    </small>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">Add Purchase</button>
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

export default PurchaseCreate;
