import React from "react";
import { Link, useParams } from "react-router";
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function CustomerEdit() {
  let { id } = useParams();

  const [customer, setCustomer] = React.useState({});

  async function fetchCustomer() {
    let res = await axios.get('/customer/single.php?id=' + id);
    setCustomer(res.data.data?.[0] || {});
  }

  React.useEffect(() => {
    fetchCustomer();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let res = await axios.post('/customer/update.php?id=' + id, formData);
    if (res.status == 200) {
      window.location.href = '/customers';
    }
  }


  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Edit Customer</h3>

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
                <Link to="/customers">Customers</Link>
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
                      <label htmlFor="customerName">Customer Name</label>
                      <input type="text" onChange={(e) => setCustomer({ ...customer, name: e.target.value })} value={customer.name || ''} name="name" className="form-control" id="customerName" placeholder="Enter customer name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerPhone">Phone</label>
                      <input type="text" onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} value={customer.phone || ''} name="phone" className="form-control" id="customerPhone" placeholder="Enter phone number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerEmail">Email</label>
                      <input type="email" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} value={customer.email || ''} name="email" className="form-control" id="customerEmail" placeholder="Enter email address" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="customerAddress">Address</label>
                      <input type="text" onChange={(e) => setCustomer({ ...customer, address: e.target.value })} value={customer.address || ''} name="address" className="form-control" id="customerAddress" placeholder="Enter address" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Update Customer</button>
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
export default CustomerEdit;
