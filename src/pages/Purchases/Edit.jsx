import React from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';
import PurchaseItems from './PurchaseItems.jsx';

function PurchaseEdit() {
  let { id } = useParams();

  const [purchase, setPurchase] = React.useState({});
  const [suppliers, setSuppliers] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [parts, setParts] = React.useState([]);
  const [originalItems, setOriginalItems] = React.useState([]);
  const [items, setItems] = React.useState([
    { category_id: '', part_id: '', quantity: 1, unit_price: '' }
  ]);
  const [errorMessage, setErrorMessage] = React.useState('');

  async function fetchData() {
    try {
      const [purchaseRes, supplierRes, categoryRes, partRes] = await Promise.all([
        axios.get('/purchase/single.php?id=' + id),
        axios.get('supplier/index.php'),
        axios.get('category/index.php'),
        axios.get('part/index.php'),
      ]);

      const data = purchaseRes.data.data?.[0];
      if (data) {
        setPurchase(data);
        if (data.items && data.items.length > 0) {
          setItems(data.items);
          setOriginalItems(data.items);
        }
      } else {
        setErrorMessage(purchaseRes.data.message || 'Purchase not found.');
      }
      setSuppliers(supplierRes.data.data || []);
      setCategories(categoryRes.data.data || []);
      setParts(partRes.data.data || []);
    } catch (error) {
      console.error('Purchase load error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to load purchase. Please try again.'
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
      supplier_id: formData.get('supplier_id'),
      purchase_date: formData.get('purchase_date'),
      note: formData.get('note'),
      items: items.map(({ part_id, quantity, unit_price }) => ({ part_id, quantity, unit_price })),
    };

    try {
      const res = await axios.post('/purchase/update.php?id=' + id, JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.status) {
        window.location.href = '/purchases';
      } else {
        setErrorMessage(res.data.message || 'Failed to update purchase.');
      }
    } catch (error) {
      console.error('Purchase update error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to update purchase. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Edit Purchase</h3>

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
                    <label htmlFor="purchaseInvoice">Invoice No</label>
                    <input type="text" onChange={(e) => setPurchase({...purchase, invoice_no: e.target.value})} value={purchase.invoice_no || ''} name="invoice_no" className="form-control" id="purchaseInvoice" placeholder="Enter invoice number" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="purchaseSupplier">Supplier</label>
                    <select onChange={(e) => setPurchase({...purchase, supplier_id: e.target.value})} value={purchase.supplier_id || ''} name="supplier_id" className="form-select" id="purchaseSupplier" required>
                      <option value="">Select supplier</option>
                      {suppliers && suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <input type="date" onChange={(e) => setPurchase({...purchase, purchase_date: e.target.value})} value={purchase.purchase_date || ''} name="purchase_date" className="form-control" id="purchaseDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="purchaseNote">Note</label>
                    <input type="text" onChange={(e) => setPurchase({...purchase, note: e.target.value})} value={purchase.note || ''} name="note" className="form-control" id="purchaseNote" placeholder="Enter note" />
                  </div>

                  <PurchaseItems items={items} setItems={setItems} categories={categories} parts={parts} originalItems={originalItems} />

                  <button type="submit" className="btn btn-primary mt-3">Update Purchase</button>
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

export default PurchaseEdit;
