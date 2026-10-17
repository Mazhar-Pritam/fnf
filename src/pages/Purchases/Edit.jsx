import React from "react";
import { Link, useParams } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PurchaseEdit() {
  let { id } = useParams();

  const [purchase, setPurchase] = React.useState({});
  const [suppliers, setSuppliers] = React.useState([]);

  async function fetchPurchase() {
    let res = await axios.get('/purchase/single.php?id=' + id);
    setPurchase(res.data.data?.[0] || {});
  }

  async function fetchSuppliers() {
    let res = await axios.get('supplier/index.php');
    setSuppliers(res.data.data);
  }

  React.useEffect(() => {
    fetchPurchase();
    fetchSuppliers();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/purchase/update.php?id=' + id, formData);
    if (res.status == 200) {
      window.location.href = '/purchases';
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
                    <div className="form-group">
                      <label htmlFor="purchaseInvoice">Invoice No</label>
                      <input type="text" onChange={(e) => setPurchase({ ...purchase, invoice_no: e.target.value })} value={purchase.invoice_no || ''} name="invoice_no" className="form-control" id="purchaseInvoice" placeholder="Enter invoice number" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="purchaseSupplier">Supplier</label>
                      <select onChange={(e) => setPurchase({ ...purchase, supplier_id: e.target.value })} value={purchase.supplier_id || ''} name="supplier_id" className="form-select" id="purchaseSupplier" required>
                        <option value="">Select supplier</option>
                        {suppliers && suppliers.map((supplier) => (
                          <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="purchaseDate">Purchase Date</label>
                      <input type="date" onChange={(e) => setPurchase({ ...purchase, purchase_date: e.target.value })} value={purchase.purchase_date || ''} name="purchase_date" className="form-control" id="purchaseDate" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="purchaseTotal">Total Amount</label>
                      <input type="number" step="0.01" onChange={(e) => setPurchase({ ...purchase, total_amount: e.target.value })} value={purchase.total_amount || ''} name="total_amount" className="form-control" id="purchaseTotal" placeholder="Enter total amount" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="purchaseNote">Note</label>
                      <input type="text" onChange={(e) => setPurchase({ ...purchase, note: e.target.value })} value={purchase.note || ''} name="note" className="form-control" id="purchaseNote" placeholder="Enter note" />
                    </div>
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
