import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import SaleItems from './SaleItems.jsx';

function SaleCreate() {
  const [customers, setCustomers] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [parts, setParts] = React.useState([]);
  const [items, setItems] = React.useState([
    { category_id: '', part_id: '', quantity: 1, unit_price: '' }
  ]);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const [customerRes, categoryRes, partRes] = await Promise.all([
        axios.get('customer/index.php'),
        axios.get('category/index.php'),
        axios.get('part/index.php'),
      ]);
      setCustomers(customerRes.data.data || []);
      setCategories(categoryRes.data.data || []);
      setParts(partRes.data.data || []);
    } catch (error) {
      console.error('Sale form load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load customers, categories or parts. Please try again.'
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
      customer_id: formData.get('customer_id'),
      sale_date: formData.get('sale_date'),
      note: formData.get('note'),
      items: items.map(({ part_id, quantity, unit_price }) => ({ part_id, quantity, unit_price })),
    };

    try {
      const res = await axios.post('/sale/create.php', JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/sales';
      } else {
        setErrorMessage(res.data.message || 'Failed to create sale.');
      }
    } catch (error) {
      console.error('Sale create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create sale. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Sale</h3>

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
                    <label htmlFor="saleInvoice">Invoice No</label>
                    <input type="text" name="invoice_no" className="form-control" id="saleInvoice" placeholder="Enter invoice number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="saleCustomer">Customer</label>
                    <select name="customer_id" className="form-select" id="saleCustomer" required>
                      <option value="">Select customer</option>
                      {customers && customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="saleDate">Sale Date</label>
                    <input type="date" name="sale_date" className="form-control" id="saleDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="saleNote">Note</label>
                    <input type="text" name="note" className="form-control" id="saleNote" placeholder="Enter note" />
                  </div>

                  <SaleItems items={items} setItems={setItems} categories={categories} parts={parts} />

                  <button type="submit" className="btn btn-primary mt-3">Add Sale</button>
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

export default SaleCreate;
