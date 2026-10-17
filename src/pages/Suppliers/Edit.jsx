import React from "react";
import { Link, useParams } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function SupplierEdit() {
  let { id } = useParams();

  const [supplier, setSupplier] = React.useState({});

  async function fetchSupplier() {
    let res = await axios.get('/supplier/single.php?id=' + id);
    setSupplier(res.data.data?.[0] || {});
  }

  React.useEffect(() => {
    fetchSupplier();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/supplier/update.php?id=' + id, formData);
    if (res.status == 200) {
      window.location.href = '/suppliers';
    }
  }


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Edit Supplier</h3>

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
                <Link to="/suppliers">Suppliers</Link>
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
                      <label htmlFor="supplierName">Supplier Name</label>
                      <input type="text" onChange={(e) => setSupplier({ ...supplier, name: e.target.value })} value={supplier.name || ''} name="name" className="form-control" id="supplierName" placeholder="Enter supplier name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierContact">Contact Person</label>
                      <input type="text" onChange={(e) => setSupplier({ ...supplier, contact_person: e.target.value })} value={supplier.contact_person || ''} name="contact_person" className="form-control" id="supplierContact" placeholder="Enter contact person" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierPhone">Phone</label>
                      <input type="text" onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })} value={supplier.phone || ''} name="phone" className="form-control" id="supplierPhone" placeholder="Enter phone number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierEmail">Email</label>
                      <input type="email" onChange={(e) => setSupplier({ ...supplier, email: e.target.value })} value={supplier.email || ''} name="email" className="form-control" id="supplierEmail" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="supplierAddress">Address</label>
                      <input type="text" onChange={(e) => setSupplier({ ...supplier, address: e.target.value })} value={supplier.address || ''} name="address" className="form-control" id="supplierAddress" placeholder="Enter address" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Update Supplier</button>
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
export default SupplierEdit;
