import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";
import axios from '../../Lib/axios.js';

function CustomerCreate() {
  const [errorMessage, setErrorMessage] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setErrorMessage('');

    try {
      const res = await axios.post('/customer/create.php', formData);
      if (res.data.status) {
        window.location.href = '/customers';
      } else {
        setErrorMessage(res.data.message || 'Failed to create customer.');
      }
    } catch (error) {
      console.error('Customer create error:', error);
      setErrorMessage(
        error.response?.data?.message || 'Unable to create customer. Please try again.'
      );
    }
  }


  return (
    <Layout>
    <div className="container">
      <div className="page-inner">

        {/* Page Header */}
        <div className="page-header">
          <h3 className="fw-bold mb-3">Add New Customer</h3>

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
                    <label htmlFor="customerName">Customer Name</label>
                    <input type="text" name="name" className="form-control" id="customerName" placeholder="Enter customer name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customerPhone">Phone</label>
                    <input type="text" name="phone" className="form-control" id="customerPhone" placeholder="Enter phone number" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customerEmail">Email</label>
                    <input type="email" name="email" className="form-control" id="customerEmail" placeholder="Enter email address" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customerAddress">Address</label>
                    <input type="text" name="address" className="form-control" id="customerAddress" placeholder="Enter address" />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Add Customer</button>
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

export default CustomerCreate;
