import React from "react";
import { Link } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function PurchaseCreate() {
  const [suppliers, setSuppliers] = React.useState([]);

  async function fetchSuppliers() {
    let res = await axios.get('supplier/index.php');
    setSuppliers(res.data.data);
  }

  React.useEffect(() => {
    fetchSuppliers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/purchase/create.php', formData);
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
                      <label htmlFor="purchaseTotal">Total Amount</label>
                      <input type="number" step="0.01" name="total_amount" className="form-control" id="purchaseTotal" placeholder="Enter total amount" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="purchaseNote">Note</label>
                      <input type="text" name="note" className="form-control" id="purchaseNote" placeholder="Enter note" />
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
